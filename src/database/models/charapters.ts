import { connection as conn } from "../connection.js";
import { CharapterI } from "../../types.ts";

const queries = {
  createTable() {
    return `CREATE TABLE charapters(id SERIAL PRIMARY KEY,name TEXT NOT NULL,data JSONB NOT NULL);`;
  },
  deleteTable() {
    return `DROP TABLE IF EXISTS charapters;`;
  },
  addOne(char: CharapterI) {
    return `INSERT INTO charapters (name, data) VALUES ( E'${char.name.replaceAll(
      "'",
      "\\'",
    )}' , E'${JSON.stringify(char).replaceAll("'", "\\'")}') RETURNING *;`;
  },
};

export const CharaptersSubModel = class {
  constructor() {
    conn.connect((err: unknown) => {
      if (err) throw err;
    });

    conn.query(queries.deleteTable());
    conn.query(queries.createTable());
  }
  addOne(char: CharapterI) {
    conn.query(queries.addOne(char));
  }
};
