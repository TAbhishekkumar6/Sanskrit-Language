import { Lexer } from './lexer/lexer';
import { Parser } from './parser/parser';
import { Transpiler } from './transpiler/transpiler';

export class SamskritCompiler {
  private lexer: Lexer = new Lexer('');
  private parser: Parser = new Parser([]);
  private transpiler: Transpiler = new Transpiler();

  compile(sourceCode: string): string {
    try {
      // Step 1: Lexical Analysis
      this.lexer = new Lexer(sourceCode);
      const tokens = this.lexer.scanTokens();

      // Step 2: Parsing
      this.parser = new Parser(tokens);
      const ast = this.parser.parse();

      // Step 3: Transpilation
      return this.transpiler.transpile(ast);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Compilation error: ${error.message}`);
      }
      throw new Error('An unknown error occurred during compilation');
    }
  }
}

// Example of Sanskrit programming language usage
const sampleCode = `
// Data structure example (Stack implementation)
varga KriyaVinyasa {
  nijee soochi items;  // private array items
  
  karya nirmata() {    // constructor
    items = [];
  }
  
  sarvajanik karya dhakk(vastu) {  // public push method
    items.yojay(vastu);
  }
  
  sarvajanik karya nikaal() {      // public pop method
    yadi (this.rikt()) {
      pratifel shunya;
    }
    pratifel items.nikaal();
  }
  
  sarvajanik karya rikt() {        // public isEmpty method
    pratifel items.length == 0;
  }
}

// Algorithm example (Sorting)
varga Kramarachana {
  sarvajanik karya budbudKram(soochi arr) {  // public bubble sort
    sankhya n = arr.length;
    
    aavrit (sankhya i = 0; i < n - 1; i++) {
      aavrit (sankhya j = 0; j < n - i - 1; j++) {
        yadi (arr[j] > arr[j + 1]) {
          // Swap elements
          sankhya temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    
    pratifel arr;
  }
}

// Usage example
karya prayog() {
  // Create a stack
  KriyaVinyasa stack = KriyaVinyasa();
  
  // Push elements
  stack.dhakk(5);
  stack.dhakk(10);
  stack.dhakk(15);
  
  // Pop elements
  yadi (!stack.rikt()) {
    sankhya item = stack.nikaal();
  }
  
  // Sort array
  Kramarachana kram = Kramarachana();
  soochi arr = [64, 34, 25, 12, 22, 11, 90];
  kram.budbudKram(arr);
}
`;

try {
  const compiler = new SamskritCompiler();
  const jsCode = compiler.compile(sampleCode);
  console.log('Transpiled JavaScript:');
  console.log(jsCode);
} catch (error) {
  if (error instanceof Error) {
    console.error('Compilation error:', error.message);
  } else {
    console.error('An unknown error occurred');
  }
}