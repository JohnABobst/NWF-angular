var fs = require("fs")

var nouns = fs.readFileSync("./server/controllers/words/nouns.txt");
var adverbs = fs.readFileSync("./server/controllers/words/adverbs.txt");
var verbs = fs.readFileSync("./server/controllers/words/verbs.txt");
var adjectives = fs.readFileSync("./server/controllers/words/adjectives.txt");
var names = fs.readFileSync("./server/controllers/words/names.txt");
let nounsList = nouns.toString().split("\n")
let namesList = names.toString().split("\n");
let adverbsList = adverbs.toString().split("\n");
let adjectivesList = adjectives.toString().split("\n");
let verbsList = verbs.toString().split("\n");

function makeNoun(){
    return nounsList[Math.floor(Math.random() * nounsList.length)];
}

module.exports = {
    title: function(){
        let name = namesList[Math.floor(Math.random() * namesList.length)];
        let noun = nounsList[Math.floor(Math.random() * nounsList.length)];
        let verb = verbsList[Math.floor(Math.random() * verbsList.length)];
        let adjective =
          adjectivesList[Math.floor(Math.random() * adjectivesList.length)];
        let adverb =
          adverbsList[Math.floor(Math.random() * adverbsList.length)];
        name = name[0] + name.slice(1).toLowerCase();
        let formats = [
          "The " +noun[0].toUpperCase() + noun.slice(1) + " of " + name,
          noun[0].toUpperCase() + noun.slice(1) + " " + makeNoun(),
          verb[0].toUpperCase() + verb.slice(1) + " " + noun,
          adjective[0].toUpperCase() + adjective.slice(1) + " " + noun,
          
        ];
        let movie_format = Math.floor(Math.random()*4)
        return formats[movie_format]
    }
}
