import { Pokemon } from "./decorators/pokemon-clase";

const charmander = new Pokemon("Charmander");

// (Pokemon.prototype as any).customeName = "Pikachu";

console.log(charmander.savePokemonsToDB(3));

charmander.publicApi="www.google.com"

console.log(charmander);