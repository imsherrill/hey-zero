import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaFilePath = path.join(__dirname, "../zero/schema.ts");
const permissionsImport = `import { buildPermissions } from "./permissions";`;
const permissionsExport = `export const permissions = buildPermissions(schema);`;

fs.readFile(schemaFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let updatedData = data.replace(
    "export const permissions = definePermissions(schema, () => ({}));",
    permissionsExport
  );

  if (!data.includes(permissionsImport)) {
    updatedData = permissionsImport + updatedData;
  }

  fs.writeFile(schemaFilePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Permissions updated successfully.");
  });
});
