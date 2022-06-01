const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;

  // Personality traits
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array
    // If personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    console.log(personalityTraitsArray);

    // loop through each trait in personalityTraitsArray
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Initially a copy of the animalsArray,
      // now updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait.
      // End result is an array of animals that has every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }

  // diet/species/name
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

// accept POST routes' req.body, add data to animalsArray
function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);

  fs.writeFileSync(
    //write file to /data
    path.join(__dirname, "../data/animals.json"),
    //save array data as json
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  return animal;
}

// take new animal data from req.body and validate
function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== "string") {
    return false;
  }

  if (!animal.species || typeof animal.species !== "string") {
    return false;
  }

  if (!animal.diet || typeof animal.diet !== "string") {
    return false;
  }

  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }

  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
};
