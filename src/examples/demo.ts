import { व्याकरणविश्लेषक } from '../parser/parser';
import { compile } from '../compiler/compiler';
import { tokenize } from '../parser/tokenizer';
import * as fs from 'fs';
import * as path from 'path';

/**
 * A simple demo script to showcase the improved Sanskrit syntax features
 */

// Helper function to read example code
function readExampleCode(filename: string): string {
    try {
        const filePath = path.join(__dirname, '..', 'examples', filename);
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Failed to read example file ${filename}: ${error}`);
        return '';
    }
}

// Example 1: Parse and compile a function with default parameters
const defaultParamsExample = `
कार्य गणना(अ: पूर्णांक = 10, ब: पूर्णांक = 20) -> पूर्णांक {
    प्रतिदा अ + ब;
}
`;

console.log("Example 1: Function with default parameters");
console.log("--------------------------------------------");
console.log("Source code:");
console.log(defaultParamsExample);

// Tokenize and parse
const tokens1 = tokenize(defaultParamsExample);
const parser1 = new व्याकरणविश्लेषक(tokens1);
const result1 = parser1.parse();

console.log("\nParsed AST:");
console.log(JSON.stringify(result1.ast, null, 2));

if (result1.errors.length > 0) {
    console.log("\nErrors:");
    result1.errors.forEach(error => console.log(`- ${error}`));
} else {
    const compiledJS = compile(result1.ast);
    console.log("\nCompiled JavaScript:");
    console.log(compiledJS);
}

// Example 2: String interpolation with template literals
const templateLiteralExample = `
कार्य अभिवादन(नाम: पाठ्य) -> पाठ्य {
    प्रतिदा \`नमस्ते \${नाम}, कैसे हो आप?\`;
}
`;

console.log("\n\nExample 2: String interpolation with template literals");
console.log("-----------------------------------------------------");
console.log("Source code:");
console.log(templateLiteralExample);

// Tokenize and parse
const tokens2 = tokenize(templateLiteralExample);
const parser2 = new व्याकरणविश्लेषक(tokens2);
const result2 = parser2.parse();

console.log("\nParsed AST:");
console.log(JSON.stringify(result2.ast, null, 2));

if (result2.errors.length > 0) {
    console.log("\nErrors:");
    result2.errors.forEach(error => console.log(`- ${error}`));
} else {
    const compiledJS = compile(result2.ast);
    console.log("\nCompiled JavaScript:");
    console.log(compiledJS);
}

// Example 3: Pattern matching
const patternMatchingExample = `
कार्य वर्णन(वस्तु: कोई) -> पाठ्य {
    प्रतिदा मिलान(वस्तु) {
        प्रतिरूप पूर्णांक: प्रतिदा "यह एक पूर्णांक है";
        प्रतिरूप पाठ्य: प्रतिदा "यह एक पाठ्य है";
        प्रतिरूप _: प्रतिदा "यह कुछ और है";
    };
}
`;

console.log("\n\nExample 3: Pattern matching");
console.log("--------------------------");
console.log("Source code:");
console.log(patternMatchingExample);

// Tokenize and parse
const tokens3 = tokenize(patternMatchingExample);
const parser3 = new व्याकरणविश्लेषक(tokens3);
const result3 = parser3.parse();

console.log("\nParsed AST:");
console.log(JSON.stringify(result3.ast, null, 2));

if (result3.errors.length > 0) {
    console.log("\nErrors:");
    result3.errors.forEach(error => console.log(`- ${error}`));
} else {
    const compiledJS = compile(result3.ast);
    console.log("\nCompiled JavaScript:");
    console.log(compiledJS);
}

// Example 4: Romanized syntax
const romanizedExample = `
karya sum(a: purnanank = 5, b: purnanank = 10) -> purnanank {
    pratida a + b;
}
`;

console.log("\n\nExample 4: Romanized syntax");
console.log("---------------------------");
console.log("Source code:");
console.log(romanizedExample);

// Tokenize and parse
const tokens4 = tokenize(romanizedExample);
const parser4 = new व्याकरणविश्लेषक(tokens4);
const result4 = parser4.parse();

console.log("\nParsed AST:");
console.log(JSON.stringify(result4.ast, null, 2));

if (result4.errors.length > 0) {
    console.log("\nErrors:");
    result4.errors.forEach(error => console.log(`- ${error}`));
} else {
    const compiledJS = compile(result4.ast);
    console.log("\nCompiled JavaScript:");
    console.log(compiledJS);
}

console.log("\n\nAll examples processed!"); 