class Person {
    constructor(id, name, friends) {
        this.id = id;
        this.name = name;
        this.friends = friends;
    }
}

class PathNode {

    constructor(person, previous) {
        this.person = person;
        this.previous = previous;
    }

    collapse(startsWithRoot) {
        let path = [];
        let node = this;
        while (node != null) {
            if (startsWithRoot) {
                path.push(node.person);
            } else {
                path.unshift(node.person);
            }

            node = node.previous;
        }

        return path;
    }
}

class BFSData {
    toVisit = [];
    visited = {};

    constructor(root) {
        this.root = root;
        let sourcePath = new PathNode(root, null);
        this.toVisit.push(sourcePath);
        this.visited[root.id] = sourcePath;
    }

    isFinished() {
        return this.toVisit.length == 0;
    }
}

// main function that finds path between 2 persons in a graph
// param people: the set of persons in the graph, key represents ?
// param source: the id of person where path will source
// param target: the id of person where path will target
function findPathBiBFS(server, source, target) {

    // create BFS data for source
    let sourceData = new BFSData(server.getPerson(source));

    // create BFS data for target
    let targetData = new BFSData(server.getPerson(target));

    // iterate while both source and target bfs data has nodes to visit
    while (!sourceData.isFinished() && !targetData.isFinished()) {

        // search out from source
        let collission = searchLevel(server, sourceData, targetData);
        if (collission != null) {
            return mergePaths(sourceData, targetData, collission.id);
        }

        // search from destination
        collission = searchLevel(server, targetData, sourceData);
        if (collission != null) {
            return mergePaths(sourceData, targetData, collission.id);
        }
    }

    return null;
}

// search one level down from current node and return collission, if any
// param people: the set of persons in the graph
// param primary: the bfs data for where the search is sourced
// param secondary: the best data for when the search is targetted
function searchLevel(server, primary, secondary) {

    // count how many nodes are in the current primary node
    const count = primary.toVisit.length;

    // loop over the nodes to visit
    for (let i = 0; i < count; i++) {

        // get the first node
        let pathNode = primary.toVisit.pop();

        // get person id of the first node
        let personId = pathNode.person.id;

        // check if current node has been visited by seconary path
        // this means there was a collission and path is found
        if (secondary.visited[personId]) {
            return pathNode.person;
        }

        // if no collission found, add friends to queue
        let person = pathNode.person;
        let friendIds = person.friends;

        friendIds.forEach(friendId => {
            if (!primary.visited[friendId]) {
                let friend = server.getPerson(friendId);
                let next = new PathNode(friend, pathNode);
                primary.visited[friendId] = next;
                primary.toVisit.push(next);
            }
        });

    }

    return null;
}

class Server {
    // machine map
    machines = {}

    // person to machine map
    personToMachineMap = {}

    getPerson(personId) {
        const machineId = this.personToMachineMap[personId];
        if (!machineId) return null;

        const machine = this.machines[machineId];
        if (!machine) return null;

        return machine.people[personId];
    }
}

class Machine {
    
    constructor(id, people) {
        this.id = id;
        this.people = people;
    }
}

// merge paths where searches met at connection
// param bfs1: primary bfs data
// param bfs2: secondary bfs data
// param connection: intersection
function mergePaths(bfs1, bfs2, connection) {
    let end1 = bfs1.visited[connection];
    let end2 = bfs2.visited[connection];

    // build path from collission -> source
    let path1 = end1.collapse(false);

    // build path from collission -> target
    let path2 = end2.collapse(true);

    // remove collission on path2 as it already exist in path1
    path2.shift();
    path1 = [...path1, ...path2];

    return path1;
}

let server = new Server();

let p1 = new Person(1, "Richard", []);
let p2 = new Person(2, "Chezka", []);
let p3 = new Person(3, "Paula", []);
let p4 = new Person(4, "Joseph", []);

p1.friends = [p2.id];
p2.friends = [p1.id, p3.id, p4.id];
p3.friends = [p2.id];
p4.friends = [p2.id];

let people1 = {
    1: p1,
    2: p2,
}
let machine1 = new Machine(1, people1);

let people2 = {
    3: p3,
    4: p4,
}
let machine2 = new Machine(2, people2);

server.machines = {
    1: machine1,
    2: machine2
}

server.personToMachineMap = {
    1: machine1.id,
    2: machine1.id,
    3: machine2.id,
    4: machine2.id,
}

const result = findPathBiBFS(server, 4, 1);

let path = ''
result.forEach(p => {
    path += `${p.name} -> `;
})

console.log('path: ', path);