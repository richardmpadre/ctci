let book = "José Protasio Rizal Mercado y Alonso Realonda[7] (Spanish: [xoˈse riˈsal, -ˈθal], Tagalog: [hoˈse ɾiˈsal]; June 19, 1861 – December 30, 1896) was a Filipino nationalist, writer and polymath active at the end of the Spanish colonial period of the Philippines. He is considered the national hero (pambansang bayani) of the Philippines.[8][9] An ophthalmologist by profession, Rizal became a writer and a key member of the Filipino Propaganda Movement, which advocated political reforms for the colony under Spain.He was executed by the Spanish colonial government for the crime of rebellion after the Philippine Revolution broke out; it was inspired by his writings. Though he was not actively involved in its planning or conduct, he ultimately approved of its goals which eventually resulted in Philippine independence.Rizal is widely considered one of the greatest heroes of the Philippines and has been recommended to be so honored by an officially empaneled National Heroes Committee. However, no law, executive order or proclamation has been enacted or issued officially proclaiming any Filipino historical figure as a national hero.[9] He wrote the novels Noli Me Tángere (1887) and El filibusterismo (1891), which together are taken as a national epic, in addition to numerous poems and essays.[10][11]";
let map = process(book);

console.log('Rizal', getOccurenceCount(map, 'Rizal'));

function process(book) {
    let words = book.split(' ');
    let wordMap = {};

    for (let x = 0; x < words.length; x++) {
        let word = words[x];
        if (!wordMap[word]) {
            wordMap[word] = 0;
        }

        wordMap[word]++;        
    }
    
    return wordMap;
}



function getOccurenceCount(map, word) {
    if (!map[word]) return -1;

    return map[word];
}