import dbConn from "../connection.ts";
import { CharacterI } from "../../types.ts";

const queries = {
  createTable() {
    return `CREATE TABLE characters(id SERIAL PRIMARY KEY,name TEXT NOT NULL,data JSONB NOT NULL);`;
  },
  deleteTable() {
    return `DROP TABLE IF EXISTS characters;`;
  },
  addOne(char: CharacterI) {
    return `INSERT INTO characters (name, data) VALUES ( E'${char.name.replaceAll(
      "'",
      "\\'"
    )}' , E'${JSON.stringify(char).replaceAll("'", "\\'")}') RETURNING *;`;
  },
  getAll(conditionStr?: string) {
    return `SELECT * FROM characters${
      conditionStr ? " WHERE " + conditionStr : ""
    } LIMIT 100;`;
  },
};

class CharactersSubModel {
  constructor() {
    dbConn.connect((err: unknown) => {
      if (err) throw err;
    });

    dbConn.query(queries.deleteTable());
    dbConn.query(queries.createTable());
  }
  addOne(char: CharacterI) {
    return dbConn.query(queries.addOne(char));
  }
  getAll(conditionStr?: string) {
    return dbConn.query(queries.getAll(conditionStr));
  }
}

export default new CharactersSubModel();
