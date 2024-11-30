# Firecrawl Results to Markdown

A CLI tool that converts scraped [Firecrawl API JSON results file](https://www.firecrawl.dev) into clean markdown files.

## Description

This tool processes JSON files containing scraped content from Firecrawl's scraped results and converts them into properly formatted markdown files. It:

- Takes input JSON files containing documentation content and metadata
- Processes each documentation section into a separate markdown file
- Cleans up and formats the markdown content
- Preserves the original document structure and hierarchy
- Maintains metadata like titles and descriptions

## Installation

1. Clone this repository
2. Ensure you have Node.js installed

## Usage

1. Place your input JSON file(s) in the `input` directory (usually results.json)
2. Run the tool:

```bash
node index.js
```

The tool will:

1. Create an `output` directory if it doesn't exist
2. Clear any existing files in the output directory
3. Process each JSON entry into a separate markdown file
4. Name each file based on the document title
5. Save the formatted markdown files to the output directory

## Input Format

The input JSON file should be in the `input` directory, containing an array of objects with the following structure:

```json
[
  {
    "markdown": "Content in markdown format",
    "metadata": {
      "title": "Document title",
      "description": "Document description",
      "url": "Original source URL"
      // ... other metadata
    }
  }
]
```

## Output

The tool will generate markdown files in the `output` directory, with:

- Clean markdown formatting
- Preserved document structure
- Original metadata as frontmatter
- Filenames derived from document titles

## Error Handling

The tool includes error handling for:

- Missing input files
- Invalid JSON format
- File system operations
- Directory creation/clearing

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT](LICENSE)
