import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractOverviews(descriptionDirs) {
  const overviews = {};

  async function searchDirectory(dir) {
    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          await searchDirectory(fullPath);
        } else if (file.endsWith(".mdx")) {
          const content = await fs.readFile(fullPath, "utf8");

          if (content) {
            // Extract frontmatter between --- and ---
            const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);

            if (frontmatterMatch) {
              const frontmatter = frontmatterMatch[1];
              const metaTitleMatch = frontmatter.match(/metaTitle:\s*(.*)/);
              const metaDescriptionMatch = frontmatter.match(
                /metaDescription:\s*(.*)/,
              );

              const componentName = metaTitleMatch
                ? metaTitleMatch[1].trim()
                : path.basename(file, ".mdx");
              const description = metaDescriptionMatch
                ? metaDescriptionMatch[1].trim()
                : "No description available";

              const relativePath = path.relative("./components", dir);
              const componentPath = path.join(relativePath, componentName);

              overviews[componentPath] = {
                name: componentName,
                description: description,
              };
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }

  // Process all directories
  for (const dir of descriptionDirs) {
    await searchDirectory(dir);
  }

  // Generate markdown summary
  let summary = "# List of the available components\n";

  for (const [_, { name, description }] of Object.entries(overviews)) {
    summary += `${name}: ${description}\n`;
  }

  // Save the summary
  await fs.writeFile("./ai/docs/components-overview.mdx", summary);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log("Generated overview at components-overview.mdx");

  return overviews;
}

// Define multiple directories to scan
const DESCRIPTION_DIRS = [
  path.resolve(__dirname, "../../../../packages/ui/src/components"),
  path.resolve(__dirname, "../../../../packages/ui/src/editors"),
  path.resolve(__dirname, "../../../../packages/ui/src/field-elements"),
];

// Run the extractor with array of directories
extractOverviews(DESCRIPTION_DIRS)
  .then((overviews) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(
      `Extracted overviews for ${Object.keys(overviews).length} components`,
    );
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
