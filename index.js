const fs = require('fs').promises;
const path = require('path');

async function clearDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      await fs.unlink(path.join(directory, file));
      console.log(`Deleted: ${file}`);
    }
    console.log('Output directory cleared');
  } catch (error) {
    // If directory doesn't exist, that's fine
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function main() {
  try {
    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'output');
    await fs.mkdir(outputDir, { recursive: true });

    // Clear existing files
    console.log('\nClearing output directory...');
    await clearDirectory(outputDir);

    // Read and parse the JSON file
    const jsonContent = await fs.readFile(path.join(process.cwd(), 'input', 'results.json'), 'utf8');
    const items = JSON.parse(jsonContent);

    console.log(`\nProcessing ${items.length} items...`);

    // Process each item
    for (const item of items) {
      if (item.metadata && item.metadata.title && item.markdown) {
        // Create filename from title, replacing | with - and removing special characters
        const filename = item.metadata.title
          .replace(/\|/g, '-') // Replace | with -
          .replace(/[^a-zA-Z0-9-\s]/g, '') // Remove special chars except - and spaces
          .toLowerCase() + '.md';

        // Write markdown content to file
        await fs.writeFile(
          path.join(outputDir, filename),
          item.markdown,
          'utf8'
        );

        console.log(`Created: ${filename}`);
      }
    }

    console.log('\nProcessing complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
