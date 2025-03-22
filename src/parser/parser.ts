import { Token, TokenType, ASTNode } from '../types';

export class Parser {
  private tokens: Token[] = [];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): ASTNode[] {
    const statements: ASTNode[] = [];
    while (!this.isAtEnd()) {
      statements.push(this.declaration());
    }
    return statements;
  }

  private declaration(): ASTNode {
    try {
      if (this.match(TokenType.VARGA)) return this.classDeclaration();
      if (this.match(TokenType.KARYA)) return this.function();
      return this.statement();
    } catch (error) {
      this.synchronize();
      return { type: 'error', error };
    }
  }

  private classDeclaration(): ASTNode {
    const name = this.consume(TokenType.IDENTIFIER, "Expected class name.");
    this.consume(TokenType.LEFT_BRACE, "Expected '{' before class body.");

    const methods: ASTNode[] = [];
    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      methods.push(this.function());
    }

    this.consume(TokenType.RIGHT_BRACE, "Expected '}' after class body.");

    return {
      type: 'class',
      name: name.lexeme,
      methods
    };
  }

  private function(): ASTNode {
    const name = this.consume(TokenType.IDENTIFIER, "Expected function name.");
    this.consume(TokenType.LEFT_PAREN, "Expected '(' after function name.");
    
    const parameters: Token[] = [];
    if (!this.check(TokenType.RIGHT_PAREN)) {
      do {
        parameters.push(
          this.consume(TokenType.IDENTIFIER, "Expected parameter name.")
        );
      } while (this.match(TokenType.COMMA));
    }
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after parameters.");
    
    this.consume(TokenType.LEFT_BRACE, "Expected '{' before function body.");
    const body = this.block();
    
    return {
      type: 'function',
      name: name.lexeme,
      parameters: parameters.map(param => param.lexeme),
      body
    };
  }

  private statement(): ASTNode {
    if (this.match(TokenType.YADI)) return this.ifStatement();
    if (this.match(TokenType.LEFT_BRACE)) return this.block();
    return this.expressionStatement();
  }

  private ifStatement(): ASTNode {
    this.consume(TokenType.LEFT_PAREN, "Expected '(' after 'yadi'.");
    const condition = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expected ')' after if condition.");

    const thenBranch = this.statement();
    let elseBranch = null;

    if (this.match(TokenType.ANYATHA)) {
      elseBranch = this.statement();
    }

    return {
      type: 'if',
      condition,
      thenBranch,
      elseBranch
    };
  }

  private block(): ASTNode {
    const statements: ASTNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      statements.push(this.declaration());
    }

    this.consume(TokenType.RIGHT_BRACE, "Expected '}' after block.");
    return { type: 'block', statements };
  }

  private expressionStatement(): ASTNode {
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON, "Expected ';' after expression.");
    return { type: 'expression', expression: expr };
  }

  private expression(): ASTNode {
    return this.assignment();
  }

  private assignment(): ASTNode {
    let expr = this.logicalOr();

    if (this.match(
      TokenType.EQUALS,
      TokenType.SAMAAN_YOGA,
      TokenType.SAMAAN_VIYOGA,
      TokenType.SAMAAN_GUNA,
      TokenType.SAMAAN_BHAGA,
      TokenType.SAMAAN_SHESH
    )) {
      const operator = this.previous();
      const value = this.assignment();

      if (expr.type === 'variable') {
        return {
          type: 'assignment',
          name: expr.name,
          operator: operator.type,
          value
        };
      }

      throw this.error(operator, "Invalid assignment target.");
    }

    return expr;
  }

  private logicalOr(): ASTNode {
    let expr = this.logicalAnd();

    while (this.match(TokenType.YA)) {
      const operator = this.previous();
      const right = this.logicalAnd();
      expr = {
        type: 'logical',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private logicalAnd(): ASTNode {
    let expr = this.bitwiseOr();

    while (this.match(TokenType.AUR)) {
      const operator = this.previous();
      const right = this.bitwiseOr();
      expr = {
        type: 'logical',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private bitwiseOr(): ASTNode {
    let expr = this.bitwiseXor();

    while (this.match(TokenType.BIT_VIYOGA)) {
      const operator = this.previous();
      const right = this.bitwiseXor();
      expr = {
        type: 'bitwise',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private bitwiseXor(): ASTNode {
    let expr = this.bitwiseAnd();

    while (this.match(TokenType.BIT_XOR)) {
      const operator = this.previous();
      const right = this.bitwiseAnd();
      expr = {
        type: 'bitwise',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private bitwiseAnd(): ASTNode {
    let expr = this.bitShift();

    while (this.match(TokenType.BIT_YOGA)) {
      const operator = this.previous();
      const right = this.bitShift();
      expr = {
        type: 'bitwise',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private bitShift(): ASTNode {
    let expr = this.equality();

    while (this.match(TokenType.BIT_VAM, TokenType.BIT_DAKSHIN)) {
      const operator = this.previous();
      const right = this.equality();
      expr = {
        type: 'bitwise',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private equality(): ASTNode {
    let expr = this.comparison();

    while (this.match(TokenType.EQUALS)) {
      const operator = this.previous();
      const right = this.comparison();
      expr = {
        type: 'binary',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private comparison(): ASTNode {
    let expr = this.term();

    while (this.match(TokenType.YOGA, TokenType.VIYOGA)) {
      const operator = this.previous();
      const right = this.term();
      expr = {
        type: 'binary',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private term(): ASTNode {
    let expr = this.factor();

    while (this.match(TokenType.GUNA, TokenType.BHAGA)) {
      const operator = this.previous();
      const right = this.factor();
      expr = {
        type: 'binary',
        left: expr,
        operator: operator.type,
        right
      };
    }

    return expr;
  }

  private factor(): ASTNode {
    if (this.match(TokenType.NA)) {
      const operator = this.previous();
      const right = this.factor();
      return {
        type: 'unary',
        operator: operator.type,
        right
      };
    }

    if (this.match(TokenType.NUMBER, TokenType.STRING, TokenType.SATYA, TokenType.ASATYA)) {
      return { type: 'literal', value: this.previous().literal };
    }

    if (this.match(TokenType.IDENTIFIER)) {
      let expr: ASTNode = { type: 'variable', name: this.previous().lexeme };

      // Check for function call
      if (this.match(TokenType.LEFT_PAREN)) {
        expr = this.finishCall(expr);
      }

      return expr;
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expected ')' after expression.");
      return { type: 'grouping', expression: expr };
    }

    throw this.error(this.peek(), "Expected expression.");
  }

  private finishCall(callee: ASTNode): ASTNode {
    const args: ASTNode[] = [];
    if (!this.check(TokenType.RIGHT_PAREN)) {
      do {
        args.push(this.expression());
      } while (this.match(TokenType.COMMA));
    }

    const paren = this.consume(TokenType.RIGHT_PAREN, "Expected ')' after arguments.");

    return {
      type: 'function_call',
      callee,
      arguments: args,
      line: paren.line
    };
  }

  private primary(): ASTNode {
    if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return { type: 'literal', value: this.previous().literal };
    }

    if (this.match(TokenType.IDENTIFIER)) {
      let expr: ASTNode = { type: 'variable', name: this.previous().lexeme };

      // Check for function call
      if (this.match(TokenType.LEFT_PAREN)) {
        expr = this.finishCall(expr);
      }

      return expr;
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expected ')' after expression.");
      return { type: 'grouping', expression: expr };
    }

    throw this.error(this.peek(), "Expected expression.");
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(this.peek(), message);
  }

  private error(token: Token, message: string): Error {
    return new Error(`Error at line ${token.line}: ${message}`);
  }

  private synchronize(): void {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) return;

      switch (this.peek().type) {
        case TokenType.VARGA:
        case TokenType.KARYA:
        case TokenType.YADI:
        case TokenType.ANYATHA:
          return;
      }

      this.advance();
    }
  }
}