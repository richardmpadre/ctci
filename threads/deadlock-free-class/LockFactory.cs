using System.Runtime.CompilerServices;

public class LockFactory
{
    private static LockFactory _instance;
    private int numberOfLocks = 5; // default
    private LockNode[] locks;

    // maps from a proces or owner to the order that the owner claimed it would call the locks in 
    private Dictionary<int, LinkedList<LockNode>> lockOrder = new Dictionary<int, LinkedList<LockNode>>();
    private LockFactory(int count) 
    { 
        locks = new LockNode[count];
        for (int i = 0; i < count; i++)
        {
            locks[i] = new LockNode(i, count-1);
        }
    }


    public static LockFactory GetInstance() => _instance;

    [MethodImpl(MethodImplOptions.Synchronized)]
    public static LockFactory Initialize(int count)
    {
        if (_instance == null) _instance = new LockFactory(count);
        return _instance;
    }

    // checks for a cycle
    public bool HasCycle(Dictionary<int, bool> touchedNodes, int[] resourceInOrder)
    {
        // loop through the required resources in order
        foreach (var resourceId in resourceInOrder)
        {

            if (touchedNodes[resourceId] == false)
            {
                var lockNode = locks[resourceId];
                if (lockNode.HasCycle(touchedNodes))
                {
                    return true;
                }
            }
        }

        return false;
    }

    // to prevent deadlocks, force the processes to declare upfront what order they will need the locks in
    // Verify that this order does not create a deadlock (a cycle in a directed graph)
    public bool Declare(int ownerId, int[] resourcesInOrder) {
        // list of nodes that the current process wil touch
        var touchedNodes = new Dictionary<int, bool>();

        // add nodes to graph
        int index = 1;

        // put the initial resource in the the touchedNodes variable
        touchedNodes.Add(resourcesInOrder[0], false);

        // loop through the rest of the resources required by the current node
        for (index = 1; index < resourcesInOrder.Length; index++)
        {
            // get the lock of the previous resource
            LockNode prev = locks[resourcesInOrder[index - 1]];

            // get the lock for the current resource
            LockNode curr = locks[resourcesInOrder[index]];

            // add current lock to previous lock's children
            prev.JoinTo(curr);

            // add the current node to process touched nodes
            touchedNodes.Add(resourcesInOrder[index], false);
        }

        // determine if there is a cycle with the declaration of required resources
        if (HasCycle(touchedNodes, resourcesInOrder))
        {
            // if true, destroy the resource list and return false

        }

        // no cycle was detected, save order that was declared
        var list = new LinkedList<LockNode>();
        for (int i = 0; i < resourcesInOrder.Length; i++)
        {
            LockNode lockNode = locks[resourcesInOrder[i]];
            list.AddLast(lockNode);
        }

        lockOrder.Add(ownerId, list);
        return true;
    }

}