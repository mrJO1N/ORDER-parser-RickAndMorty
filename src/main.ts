import characters from "./database/models/characters.js";
import { getCharsData } from "./parser.js";

for (let page = 1; page <= 42; page++) {
  const chars = await getCharsData(page);

  for (const char of chars) {
    characters.addOne(char);

    const dbChar = (await characters.getAll(`id = ${char.id}`)).rows[0];
    if (char.id != dbChar.id) {
      throw new Error("character.id and database/character.id is different");
    }
  }
}

console.log(
  `complete. the database contains ${
    (await characters.getAll()).rows.length
  } rows`
);
