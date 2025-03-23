import { ASTNode, Parameter, TokenType } from '../types';

export class रूपांतरक {
  private स्रोत = '';
  private स्तर = 0;

  रूपांतर(ast: ASTNode[]): string {
    this.स्रोत = '';
    for (const कथन of ast) {
      this.कथनरूपांतर(कथन);
    }
    return this.स्रोत;
  }

  private कथनरूपांतर(कथन: ASTNode): void {
    switch (कथन.प्रकार) {
      case 'वर्ग':
        this.वर्गरूपांतर(कथन);
        break;
      case 'कार्य':
        this.कार्यरूपांतर(कथन);
        break;
      case 'यदि':
        this.यदिरूपांतर(कथन);
        break;
      case 'प्रयत्न':
        this.प्रयत्नरूपांतर(कथन);
        break;
      case 'प्रतिफल':
        this.प्रतिफलरूपांतर(कथन);
        break;
      case 'खंड':
        this.खंडरूपांतर(कथन);
        break;
      case 'अभिव्यक्ति':
        this.अभिव्यक्तिरूपांतर(कथन.अभिव्यक्ति);
        this.स्रोत += ';\n';
        break;
      case 'चर':
        this.चरघोषणारूपांतर(कथन);
        break;
      default:
        throw new Error(`अज्ञात कथन प्रकार: ${कथन.प्रकार}`);
    }
  }

  private वर्गरूपांतर(कथन: ASTNode): void {
    this.स्रोत += `class ${कथन.नाम} {\n`;
    this.स्तर++;
    
    for (const विधि of कथन.विधियाँ) {
      this.स्तरजोड़ें();
      this.कार्यरूपांतर(विधि);
    }
    
    this.स्तर--;
    this.स्तरजोड़ें();
    this.स्रोत += '}\n\n';
  }

  private कार्यरूपांतर(कथन: ASTNode): void {
    const async = कथन.isAsync ? 'async ' : '';
    this.स्रोत += `${async}function ${कथन.नाम}(`;
    
    // Parameters
    this.स्रोत += कथन.मापदंड
      .map((param: Parameter) => `${param.name}: ${param.type}`)
      .join(', ');
    
    this.स्रोत += `) {\n`;
    this.स्तर++;
    
    // Function body
    this.कथनरूपांतर(कथन.शरीर);
    
    this.स्तर--;
    this.स्तरजोड़ें();
    this.स्रोत += '}\n';
  }

  private यदिरूपांतर(कथन: ASTNode): void {
    this.स्रोत += 'if (';
    this.अभिव्यक्तिरूपांतर(कथन.शर्त);
    this.स्रोत += ') {\n';
    
    this.स्तर++;
    this.कथनरूपांतर(कथन.तबशाखा);
    this.स्तर--;
    
    this.स्तरजोड़ें();
    this.स्रोत += '}';
    
    if (कथन.अन्यथाशाखा) {
      this.स्रोत += ' else {\n';
      this.स्तर++;
      this.कथनरूपांतर(कथन.अन्यथाशाखा);
      this.स्तर--;
      this.स्तरजोड़ें();
      this.स्रोत += '}';
    }
    
    this.स्रोत += '\n';
  }

  private प्रयत्नरूपांतर(कथन: ASTNode): void {
    this.स्रोत += 'try {\n';
    this.स्तर++;
    if (कथन.tryBlock) {
      this.कथनरूपांतर(कथन.tryBlock);
    }
    this.स्तर--;
    this.स्तरजोड़ें();
    this.स्रोत += '}';

    if (कथन.catchBlock) {
      this.स्रोत += ' catch (error) {\n';
      this.स्तर++;
      this.कथनरूपांतर(कथन.catchBlock);
      this.स्तर--;
      this.स्तरजोड़ें();
      this.स्रोत += '}';
    }

    if (कथन.finallyBlock) {
      this.स्रोत += ' finally {\n';
      this.स्तर++;
      this.कथनरूपांतर(कथन.finallyBlock);
      this.स्तर--;
      this.स्तरजोड़ें();
      this.स्रोत += '}';
    }

    this.स्रोत += '\n';
  }

  private प्रतिफलरूपांतर(कथन: ASTNode): void {
    this.स्तरजोड़ें();
    this.स्रोत += 'return ';
    this.अभिव्यक्तिरूपांतर(कथन.value);
    this.स्रोत += ';\n';
  }

  private खंडरूपांतर(कथन: ASTNode): void {
    for (const stmt of कथन.कथन) {
      this.स्तरजोड़ें();
      this.कथनरूपांतर(stmt);
    }
  }

  private अभिव्यक्तिरूपांतर(कथन: ASTNode): void {
    if (कथन.प्रकार === 'द्विआधारी') {
      this.स्रोत += '(';
      if (कथन.left) {
        this.अभिव्यक्तिरूपांतर(कथन.left);
      }
      
      const संचालक = this.संचालकमानचित्रण(कथन.operator ?? 'YOGA');
      this.स्रोत += ` ${संचालक} `;
      
      if (कथन.right) {
        this.अभिव्यक्तिरूपांतर(कथन.right);
      }
      this.स्रोत += ')';
    } else {
      switch (कथन.प्रकार) {
        case 'शाब्दिक':
          if (typeof कथन.value === 'string') {
            this.स्रोत += `"${कथन.value}"`;
          } else {
            this.स्रोत += कथन.value;
          }
          break;
        case 'चर':
          this.स्रोत += कथन.नाम;
          break;
        case 'कार्य_कॉल':
          this.कार्यकॉलरूपांतर(कथन);
          break;
        case 'एकात्मक':
          this.स्रोत += this.संचालकमानचित्रण(कथन.संचालक ?? 'NA');
          if (कथन.right) {
            this.अभिव्यक्तिरूपांतर(कथन.right);
          }
          break;
        case 'समूह':
          this.स्रोत += '(';
          this.अभिव्यक्तिरूपांतर(कथन.अभिव्यक्ति);
          this.स्रोत += ')';
          break;
        default:
          throw new Error(`अज्ञात अभिव्यक्ति प्रकार: ${कथन.प्रकार}`);
      }
    }
  }

  private कार्यकॉलरूपांतर(कथन: ASTNode): void {
    if (कथन.callee) {
      this.अभिव्यक्तिरूपांतर(कथन.callee);
    }
    
    this.स्रोत += '(';
    
    if (कथन.arguments && कथन.arguments.length > 0) {
      for (let i = 0; i < कथन.arguments.length; i++) {
        if (i > 0) {
          this.स्रोत += ', ';
        }
        this.अभिव्यक्तिरूपांतर(कथन.arguments[i]);
      }
    }
    
    this.स्रोत += ')';
  }

  private चरघोषणारूपांतर(कथन: ASTNode): void {
    this.स्तरजोड़ें();
    this.स्रोत += कथन.isConstant ? 'const ' : 'let ';
    this.स्रोत += कथन.नाम;
    
    if (कथन.initializer) {
      this.स्रोत += ' = ';
      this.अभिव्यक्तिरूपांतर(कथन.initializer);
    }
    
    this.स्रोत += ';\n';
  }

  private स्तरजोड़ें(): void {
    this.स्रोत += '  '.repeat(this.स्तर);
  }

  private संचालकमानचित्रण(संचालक: TokenType | string): string {
    const मानचित्र: { [key: string]: string } = {
      'YOGA': '+',
      'VIYOGA': '-',
      'GUNA': '*',
      'BHAGA': '/',
      'SHESH': '%',
      'SAMAAN': '===',
      'ASAMAAN': '!==',
      'ADHIK': '>',
      'NYOON': '<',
      'AUR': '&&',
      'YA': '||',
      'NA': '!',
      'BIT_YOGA': '&',
      'BIT_VIYOGA': '|',
      'BIT_XOR': '^',
      'BIT_VAM': '<<',
      'BIT_DAKSHIN': '>>'
    };
    return मानचित्र[संचालक] || संचालक;
  }
}

// Export the Sanskrit class name as Transpiler for external use
export const Transpiler = रूपांतरक;