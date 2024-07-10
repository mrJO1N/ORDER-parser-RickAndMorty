import { CharaptersSubModel } from "./database/models/charapters.ts";
import {getCharsData} from "./parser.ts";

const charapters = new CharaptersSubModel();

async function main() {
  for (let page = 1; page <= 42; page++) {
    const chars = await getCharsData(page)
    
    for (const char of chars) {
      charapters.addOne(char)
    }
  }
}

main()