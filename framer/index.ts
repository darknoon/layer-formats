// open the file from ./example.ts
import fs from "fs";
import path from "path";

// read command line argument for the file name
const filename = process.argv[2] ?? "/example.html";
// result will be same name but json
const resultname = filename.replace(".html", ".json");

// read the file data
const absPath = path.join(__dirname, filename);
console.log("Loading file: ", absPath);
const fileData = fs.readFileSync(absPath, "utf8");

// extract BLAH from <meta charset='utf-8'><p xmlns="http://www.w3.org/1999/xhtml"><span data-framer-pasteboard="BLAH" data-framer-pasteboard-type="application/x-framer-layers"></span></p>
function extractLayers(str: string) {
  // Parse HTML string
  const match = str.match(
    /data-framer-pasteboard="(.*)" data-framer-pasteboard-type/
  );
  if (match) {
    // return decodeURIComponent(match[1]);
    // replace &quot; with "
    const m = match[1].replace(/&quot;/g, '"');
    return JSON.parse(m);
  }
}

const layerData = extractLayers(fileData);
// console.log(JSON.stringify(layerData, null, 2));

fs.writeFileSync(resultname, JSON.stringify(layerData, null, 2));
