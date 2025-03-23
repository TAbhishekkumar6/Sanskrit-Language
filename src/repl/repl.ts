import { Lexer } from '../lexer/lexer';
import { Parser } from '../parser/parser';
import { Transpiler } from '../transpiler/transpiler';

function processInput(input: string): string {
    const lexer = new Lexer(input);
    const tokens = lexer.शब्दविश्लेषण();
    
    const parser = new Parser(tokens);
    const ast = parser.विश्लेषण();
    
    const transpiler = new Transpiler();
    const result = transpiler.रूपांतर(ast);
    
    return result;
}

export default processInput;