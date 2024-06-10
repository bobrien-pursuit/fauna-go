//give console.log an alias
// When providing user feedback use 'inform'
// When developing/debugging use 'console.log'

const { readJSONFile, writeJSONFile } = require("./src/helpers.js");
const { create, destroy, show, edit } = require('./src/animalsController.js');

const inform = console.log;

function run() {
    let writeToFile = false;
    let updatedAnimals = [];
    let animals = readJSONFile("./data", "animals.json"); 

    const action = process.argv[2];
    const animal = process.argv[3];

    switch (action) {
        case "index":
           // const animalsView = index(animals);
            inform(action, animals);
            break;
        case "create":
            updatedAnimals = create(animals, animal);
            writeToFile = true;
            break;
        case "show":
            const animalById = show(animals, animal);
            inform(animalById);
            break;
        case "update":
            updatedAnimals = edit(animals, animal, process.argv[4]);
            writeToFile = true;
            break;
        case "destroy":
            updatedAnimals = destroy(animals, animal);
            writeToFile = true;
            break;
        case "score":
            const score = animals.reduce((acc, current) => acc + current.points, 0);
            inform("Current score", score);
            break;
        default:
            inform("there was an error.");
    }

    if (writeToFile) {
        writeJSONFile("./data", "animals.json", updatedAnimals);
    }
}

run();