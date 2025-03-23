import * as readline from 'readline';
import chalk from 'chalk';
import { Lexer } from './lexer/lexer';
import { Parser } from './parser/parser';
import { Transpiler } from './transpiler/transpiler';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function प्रारंभ() {
    console.log(chalk.blue('संस्कृत प्रोग्रामिंग भाषा REPL'));
    console.log(chalk.gray('बाहर निकलने के लिए .बाहर या Ctrl+C दबाएं\n'));

    while (true) {
        try {
            const कोड = await new Promise<string>((resolve) => {
                rl.question(chalk.green('>>> '), resolve);
            });

            if (कोड.trim() === '.बाहर') {
                break;
            }

            if (कोड.trim() === '') {
                continue;
            }

            // Handle special commands
            if (कोड.startsWith('.')) {
                await विशेषआदेश(कोड);
                continue;
            }

            // Regular code execution
            const lexer = new Lexer(कोड);
            const tokens = lexer.शब्दविश्लेषण();
            const parser = new Parser(tokens);
            const ast = parser.विश्लेषण();
            const transpiler = new Transpiler();
            const result = transpiler.रूपांतर(ast);
            
            // Execute the transpiled code
            const output = eval(result);
            if (output !== undefined) {
                console.log(chalk.yellow(output));
            }
        } catch (error) {
            console.error(chalk.red('Error:'), (error as Error).message);
        }
    }

    rl.close();
}

async function विशेषआदेश(आदेश: string): Promise<void> {
    switch (आदेश) {
        case '.सहायता':
            console.log(chalk.cyan(`
उपलब्ध आदेश:
.सहायता  - यह सहायता संदेश दिखाएं
.बाहर    - REPL से बाहर निकलें
.साफ     - स्क्रीन साफ करें
.टोकन   - अंतिम आदेश के टोकन दिखाएं
.ast     - अंतिम आदेश का AST दिखाएं
`));
            break;
        case '.साफ':
            console.clear();
            break;
        default:
            console.log(chalk.red('अज्ञात आदेश।'));
            break;
    }
}

प्रारंभ().catch(console.error);