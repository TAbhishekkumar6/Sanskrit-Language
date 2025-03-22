import { ASTNode, TokenType } from '../types';

export class Transpiler {
  transpile(ast: ASTNode[]): string {
    return ast.map(node => this.transpileNode(node)).join('\n');
  }

  private transpileNode(node: ASTNode): string {
    switch (node.type) {
      case 'class':
        return this.transpileClass(node);
      case 'function':
        return this.transpileFunction(node);
      case 'if':
        return this.transpileIf(node);
      case 'loop':
        return this.transpileLoop(node);
      case 'try':
        return this.transpileTry(node);
      case 'block':
        return this.transpileBlock(node);
      case 'expression':
        if (!node.expression) throw new Error("Expression node missing expression");
        return this.transpileExpression(node.expression) + ';';
      case 'return':
        return this.transpileReturn(node);
      case 'binary':
        return this.transpileBinary(node);
      case 'array':
        return this.transpileArray(node);
      case 'object':
        return this.transpileObject(node);
      case 'literal':
        return this.transpileLiteral(node);
      case 'variable':
        if (!node.name) throw new Error("Variable node missing name");
        return node.name;
      case 'grouping':
        if (!node.expression) throw new Error("Grouping node missing expression");
        return `(${this.transpileExpression(node.expression)})`;
      case 'function_call':
        if (!node.callee) throw new Error("Function call missing callee");
        return this.transpileFunctionCall(node);
      case 'logical':
        return this.transpileLogical(node);
      case 'bitwise':
        return this.transpileBitwise(node);
      case 'assignment':
        return this.transpileAssignment(node);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  private transpileClass(node: ASTNode): string {
    const accessModifier = node.accessModifier || '';
    const methods = node.methods?.map((method: ASTNode) => this.transpileNode(method)).join('\n\n') || '';
    return `${accessModifier} class ${node.name} {\n${this.indent(methods)}\n}`;
  }

  private transpileFunction(node: ASTNode): string {
    const accessModifier = node.accessModifier || '';
    const params = node.parameters?.join(', ') || '';
    const body = this.transpileNode(node.body as ASTNode);
    return `${accessModifier} function ${node.name}(${params}) ${body}`;
  }

  private transpileIf(node: ASTNode): string {
    const condition = this.transpileExpression(node.condition as ASTNode);
    const thenBranch = this.transpileNode(node.thenBranch as ASTNode);
    const elseBranch = node.elseBranch ? ` else ${this.transpileNode(node.elseBranch)}` : '';
    return `if (${condition}) ${thenBranch}${elseBranch}`;
  }

  private transpileLoop(node: ASTNode): string {
    const condition = this.transpileExpression(node.condition as ASTNode);
    const body = this.transpileNode(node.body as ASTNode);
    return `while (${condition}) ${body}`;
  }

  private transpileTry(node: ASTNode): string {
    const tryBlock = this.transpileNode(node.tryBlock as ASTNode);
    const catchBlock = node.catchBlock ? 
      ` catch (${node.errorVar || 'error'}) ${this.transpileNode(node.catchBlock)}` : '';
    const finallyBlock = node.finallyBlock ? 
      ` finally ${this.transpileNode(node.finallyBlock)}` : '';
    return `try ${tryBlock}${catchBlock}${finallyBlock}`;
  }

  private transpileBlock(node: ASTNode): string {
    const statements = node.statements?.map((stmt: ASTNode) => this.transpileNode(stmt)).join('\n') || '';
    return `{\n${this.indent(statements)}\n}`;
  }

  private transpileBinary(node: ASTNode): string {
    const left = this.transpileExpression(node.left as ASTNode);
    const right = this.transpileExpression(node.right as ASTNode);
    const operator = this.translateOperator(node.operator as TokenType);
    return `${left} ${operator} ${right}`;
  }

  private transpileReturn(node: ASTNode): string {
    const value = node.value ? this.transpileExpression(node.value) : '';
    return `return ${value};`;
  }

  private transpileArray(node: ASTNode): string {
    const elements = node.elements?.map((elem: ASTNode) => this.transpileExpression(elem)).join(', ') || '';
    return `[${elements}]`;
  }

  private transpileObject(node: ASTNode): string {
    const properties = Object.entries(node.properties || {})
      .map(([key, value]) => `${key}: ${this.transpileExpression(value as ASTNode)}`)
      .join(',\n');
    return `{\n${this.indent(properties)}\n}`;
  }

  private transpileLiteral(node: ASTNode): string {
    if (typeof node.value === 'string') {
      return `"${node.value}"`;
    }
    return String(node.value);
  }

  private transpileExpression(node: ASTNode): string {
    return this.transpileNode(node);
  }

  private transpileFunctionCall(node: ASTNode): string {
    if (!node.callee) throw new Error("Function call missing callee");
    const callee = this.transpileExpression(node.callee);
    const args = node.arguments?.map(arg => this.transpileExpression(arg)).join(', ') || '';
    return `${callee}(${args})`;
  }

  private transpileLogical(node: ASTNode): string {
    const left = this.transpileExpression(node.left as ASTNode);
    const right = this.transpileExpression(node.right as ASTNode);
    const operator = this.translateOperator(node.operator as TokenType);
    return `${left} ${operator} ${right}`;
  }

  private transpileBitwise(node: ASTNode): string {
    const left = this.transpileExpression(node.left as ASTNode);
    const right = this.transpileExpression(node.right as ASTNode);
    const operator = this.translateOperator(node.operator as TokenType);
    return `${left} ${operator} ${right}`;
  }

  private transpileAssignment(node: ASTNode): string {
    const name = node.name;
    const value = this.transpileExpression(node.value);
    const operator = this.translateOperator(node.operator as TokenType);
    return `${name} ${operator} ${value}`;
  }

  private translateOperator(operator: TokenType): string {
    switch (operator) {
      case TokenType.YOGA: return '+';
      case TokenType.VIYOGA: return '-';
      case TokenType.GUNA: return '*';
      case TokenType.BHAGA: return '/';
      case TokenType.SHESH: return '%';
      case TokenType.SAMAAN: return '==';
      case TokenType.ASAMAAN: return '!=';
      case TokenType.ADHIK: return '>';
      case TokenType.NYOON: return '<';
      case TokenType.EQUALS: return '=';
      case TokenType.AUR: return '&&';
      case TokenType.YA: return '||';
      case TokenType.NA: return '!';
      case TokenType.BIT_YOGA: return '&';
      case TokenType.BIT_VIYOGA: return '|';
      case TokenType.BIT_XOR: return '^';
      case TokenType.BIT_VAM: return '<<';
      case TokenType.BIT_DAKSHIN: return '>>';
      case TokenType.SAMAAN_YOGA: return '+=';
      case TokenType.SAMAAN_VIYOGA: return '-=';
      case TokenType.SAMAAN_GUNA: return '*=';
      case TokenType.SAMAAN_BHAGA: return '/=';
      case TokenType.SAMAAN_SHESH: return '%=';
      default: return operator;
    }
  }

  private indent(code: string): string {
    return code.split('\n').map(line => `  ${line}`).join('\n');
  }
}