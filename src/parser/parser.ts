import { Token, TokenType, Parameter, FunctionParameter, PatternMatchNode, PatternCaseNode } from '../types';

export interface ASTNode {
    type: string;
    प्रकार?: string;  // Make this optional to accommodate test AST nodes
    [key: string]: any;
}

export class व्याकरणविश्लेषक {
  private टोकन: Token[] = [];
  private वर्तमान = 0;
  private errors: Error[] = [];

  constructor(टोकन: Token[] = []) {
    this.टोकन = टोकन;
  }

  parse(source?: string): { ast: ASTNode[], errors: Error[] } {
    if (source) {
      // This would typically call the tokenizer to convert source to tokens
      // For this implementation, we'll assume tokens are already set
      // this.टोकन = tokenize(source);
    }
    
    const ast = this.विश्लेषण();
    return { ast, errors: this.errors };
  }

  विश्लेषण(): ASTNode[] {
    const कथन: ASTNode[] = [];
    while (!this.समाप्त()) {
      try {
        कथन.push(this.घोषणा());
      } catch (error) {
        this.errors.push(error as Error);
        this.समन्वय();
      }
    }
    return कथन;
  }

  private घोषणा(): ASTNode {
    try {
      if (this.मिलान(TokenType.VARGA)) return this.वर्गघोषणा();
      if (this.मिलान(TokenType.KARYA)) return this.कार्यघोषणा();
      if (this.मिलान(TokenType.NIYATA, TokenType.MANA)) return this.चरघोषणा();
      return this.कथन();
    } catch (त्रुटि) {
      this.समन्वय();
      return this.createErrorNode(त्रुटि);
    }
  }

  private कार्यघोषणा(): ASTNode {
    const नाम = this.उपभोग(TokenType.IDENTIFIER, "कार्य नाम अपेक्षित।");
    
    // Parameter list
    this.उपभोग(TokenType.LEFT_PAREN, "कार्य नाम के बाद '(' अपेक्षित।");
    const मापदंड: FunctionParameter[] = [];
    
    if (!this.जाँच(TokenType.RIGHT_PAREN)) {
      do {
        const paramName = this.उपभोग(TokenType.IDENTIFIER, "मापदंड नाम अपेक्षित।").lexeme;
        let paramType = 'any';
        let defaultValue = null;
        
        if (this.मिलान(TokenType.COLON)) {
          paramType = this.उपभोग(TokenType.IDENTIFIER, "मापदंड प्रकार अपेक्षित।").lexeme;
        }
        
        // Handle default parameter values
        if (this.मिलान(TokenType.EQUALS)) {
          defaultValue = this.अभिव्यक्ति();
        }
        
        मापदंड.push({ name: paramName, type: paramType, defaultValue });
      } while (this.मिलान(TokenType.COMMA));
    }
    
    this.उपभोग(TokenType.RIGHT_PAREN, "मापदंडों के बाद ')' अपेक्षित।");

    // Return type annotation
    let returnType = 'shunya';
    if (this.मिलान(TokenType.ARROW)) {
      returnType = this.उपभोग(TokenType.IDENTIFIER, "प्रतिफल प्रकार अपेक्षित।").lexeme;
    }
    
    // Function body
    this.उपभोग(TokenType.LEFT_BRACE, "कार्य शरीर से पहले '{' अपेक्षित।");
    const शरीर = this.खंड();
    
    return this.createFunctionNode(नाम.lexeme, मापदंड, returnType, शरीर);
  }

  private वर्गघोषणा(): ASTNode {
    const नाम = this.उपभोग(TokenType.IDENTIFIER, "वर्ग नाम अपेक्षित।");
    this.उपभोग(TokenType.LEFT_BRACE, "वर्ग नाम के बाद '{' अपेक्षित।");

    const विधियाँ: ASTNode[] = [];
    while (!this.जाँच(TokenType.EOF) && !this.जाँच(TokenType.RIGHT_BRACE)) {
      विधियाँ.push(this.कार्यघोषणा());
    }

    this.उपभोग(TokenType.RIGHT_BRACE, "वर्ग घोषणा के अंत में '}' अपेक्षित।");
    return this.createClassNode(नाम.lexeme, विधियाँ);
  }

  private कथन(): ASTNode {
    if (this.मिलान(TokenType.YADI)) return this.यदिकथन();
    if (this.मिलान(TokenType.PRAYATNA)) return this.प्रयत्नकथन();
    if (this.मिलान(TokenType.ASINKRON)) return this.अकालिककथन();
    if (this.मिलान(TokenType.PHALA, TokenType.PRATIFEL)) return this.प्रतिफलकथन();
    if (this.मिलान(TokenType.MATCH)) return this.मिलानकथन();
    return this.अभिव्यक्तिकथन();
  }

  private यदिकथन(): ASTNode {
    const शर्त = this.अभिव्यक्ति();
    this.उपभोग(TokenType.TABA, "शर्त के बाद 'taba' अपेक्षित।");
    this.उपभोग(TokenType.LEFT_BRACE, "'taba' के बाद '{' अपेक्षित।");
    
    const तबशाखा = this.खंड();
    let अन्यथाशाखा = null;

    if (this.मिलान(TokenType.ANYATHA)) {
      this.उपभोग(TokenType.LEFT_BRACE, "'anyatha' के बाद '{' अपेक्षित।");
      अन्यथाशाखा = this.खंड();
    }

    return this.createIfNode(शर्त, तबशाखा, अन्यथाशाखा);
  }

  private प्रयत्नकथन(): ASTNode {
    this.उपभोग(TokenType.LEFT_BRACE, "'prayatna' के बाद '{' अपेक्षित।");
    const tryBlock = this.खंड();
    
    let catchBlock: ASTNode | undefined = undefined;
    let finallyBlock: ASTNode | undefined = undefined;

    if (this.मिलान(TokenType.DOSHA) || this.मिलान(TokenType.DOSH)) {
      this.उपभोग(TokenType.LEFT_BRACE, "'dosha' के बाद '{' अपेक्षित।");
      catchBlock = this.खंड();
    }

    if (this.मिलान(TokenType.ANTIMA) || this.मिलान(TokenType.ANTIM)) {
      this.उपभोग(TokenType.LEFT_BRACE, "'antima' के बाद '{' अपेक्षित।");
      finallyBlock = this.खंड();
    }

    return this.createTryNode(tryBlock, catchBlock, finallyBlock);
  }

  private अकालिककथन(): ASTNode {
    const func = this.कार्यघोषणा();
    func.isAsync = true;
    return func;
  }

  private प्रतिफलकथन(): ASTNode {
    const value = this.अभिव्यक्ति();
    this.उपभोग(TokenType.SEMICOLON, "प्रतिफल कथन के बाद ';' अपेक्षित।");
    return this.createReturnNode(value);
  }

  private मिलानकथन(): ASTNode {
    const value = this.अभिव्यक्ति();
    this.उपभोग(TokenType.LEFT_BRACE, "मिलान के बाद '{' अपेक्षित।");
    
    const patterns: PatternCaseNode[] = [];
    
    while (!this.जाँच(TokenType.RIGHT_BRACE) && !this.समाप्त()) {
      if (this.मिलान(TokenType.CASE) || (this.टोकन[this.वर्तमान].lexeme === "केस")) {
        const pattern = this.अभिव्यक्ति();
        this.उपभोग(TokenType.ARROW, "केस के बाद '=>' अपेक्षित।");
        const body = this.कथन();
        patterns.push({ pattern, body });
      } else if (this.मिलान(TokenType.DEFAULT) || (this.टोकन[this.वर्तमान].lexeme === "डिफॉल्ट")) {
        this.उपभोग(TokenType.ARROW, "डिफॉल्ट के बाद '=>' अपेक्षित।");
        const body = this.कथन();
        patterns.push({ isDefault: true, body });
      } else {
        throw this.त्रुटि(this.शिखर(), "केस या डिफॉल्ट अपेक्षित।");
      }
    }
    
    this.उपभोग(TokenType.RIGHT_BRACE, "मिलान के अंत में '}' अपेक्षित।");
    
    return this.createPatternMatchNode(value, patterns);
  }

  private खंड(): ASTNode {
    const कथन: ASTNode[] = [];

    while (!this.जाँच(TokenType.RIGHT_BRACE) && !this.समाप्त()) {
      कथन.push(this.घोषणा());
    }

    this.उपभोग(TokenType.RIGHT_BRACE, "खंड के बाद '}' अपेक्षित।");
    return this.createBlockNode(कथन);
  }

  private अभिव्यक्तिकथन(): ASTNode {
    const expr = this.अभिव्यक्ति();
    this.उपभोग(TokenType.SEMICOLON, "अभिव्यक्ति के बाद ';' अपेक्षित।");
    return this.createExpressionStatementNode(expr);
  }

  private अभिव्यक्ति(): ASTNode {
    // Check for template literals
    if (this.जाँच(TokenType.STRING) && this.शिखर().lexeme.startsWith('`')) {
      return this.टेम्पलेटअभिव्यक्ति();
    }
    
    return this.नियुक्ति();
  }

  private टेम्पलेटअभिव्यक्ति(): ASTNode {
    const token = this.अग्रसर();
    const templateString = token.lexeme;
    
    // Parse out the template parts and expressions
    const parts: (string | ASTNode)[] = [];
    let currentPart = '';
    let i = 0;
    
    while (i < templateString.length) {
      if (templateString[i] === '$' && templateString[i+1] === '{') {
        // End the current text part
        if (currentPart) {
          parts.push(currentPart);
          currentPart = '';
        }
        
        // Extract the expression inside ${}
        i += 2; // Skip the ${
        let braceCount = 1;
        let expressionStr = '';
        
        while (braceCount > 0 && i < templateString.length) {
          if (templateString[i] === '{') braceCount++;
          else if (templateString[i] === '}') braceCount--;
          
          if (braceCount > 0) {
            expressionStr += templateString[i];
          }
          i++;
        }
        
        // Parse the expression string
        // In a real implementation, we would properly parse this expression
        // For now, we'll create a variable reference node
        parts.push(this.createVariableNode(expressionStr.trim()));
      } else {
        currentPart += templateString[i];
        i++;
      }
    }
    
    // Add any remaining text
    if (currentPart) {
      parts.push(currentPart);
    }
    
    return this.createTemplateLiteralNode(parts);
  }

  private नियुक्ति(): ASTNode {
    let expr = this.तार्किकया();

    if (this.मिलान(
      TokenType.EQUALS,
      TokenType.SAMAAN_YOGA,
      TokenType.SAMAAN_VIYOGA,
      TokenType.SAMAAN_GUNA,
      TokenType.SAMAAN_BHAGA,
      TokenType.SAMAAN_SHESH
    )) {
      const संचालक = this.पूर्व();
      const value = this.नियुक्ति();

      if (expr.प्रकार === 'चर') {
        return this.createAssignmentNode(expr.नाम, संचालक.type, value);
      }

      throw this.त्रुटि(संचालक, "अमान्य नियुक्ति लक्ष्य।");
    }

    return expr;
  }

  private तार्किकया(): ASTNode {
    let expr = this.तार्किकऔर();

    while (this.मिलान(TokenType.YA)) {
      const संचालक = this.पूर्व();
      const right = this.तार्किकऔर();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private तार्किकऔर(): ASTNode {
    let expr = this.बिटवाइजया();

    while (this.मिलान(TokenType.AUR)) {
      const संचालक = this.पूर्व();
      const right = this.बिटवाइजया();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private बिटवाइजया(): ASTNode {
    let expr = this.बिटवाइजएक्सोर();

    while (this.मिलान(TokenType.BIT_VIYOGA)) {
      const संचालक = this.पूर्व();
      const right = this.बिटवाइजएक्सोर();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private बिटवाइजएक्सोर(): ASTNode {
    let expr = this.बिटवाइजऔर();

    while (this.मिलान(TokenType.BIT_XOR)) {
      const संचालक = this.पूर्व();
      const right = this.बिटवाइजऔर();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private बिटवाइजऔर(): ASTNode {
    let expr = this.बिटशिफ्ट();

    while (this.मिलान(TokenType.BIT_YOGA)) {
      const संचालक = this.पूर्व();
      const right = this.बिटशिफ्ट();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private बिटशिफ्ट(): ASTNode {
    let expr = this.समानता();

    while (this.मिलान(TokenType.BIT_VAM, TokenType.BIT_DAKSHIN)) {
      const संचालक = this.पूर्व();
      const right = this.समानता();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private समानता(): ASTNode {
    let expr = this.तुलना();

    while (this.मिलान(TokenType.EQUALS)) {
      const संचालक = this.पूर्व();
      const right = this.तुलना();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private तुलना(): ASTNode {
    let expr = this.अवधि();

    while (this.मिलान(TokenType.YOGA, TokenType.VIYOGA)) {
      const संचालक = this.पूर्व();
      const right = this.अवधि();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private अवधि(): ASTNode {
    let expr = this.घटक();

    while (this.मिलान(TokenType.GUNA, TokenType.BHAGA)) {
      const संचालक = this.पूर्व();
      const right = this.घटक();
      expr = this.createBinaryNode(expr, संचालक.type, right);
    }

    return expr;
  }

  private घटक(): ASTNode {
    if (this.मिलान(TokenType.NA)) {
      const संचालक = this.पूर्व();
      const right = this.घटक();
      return this.createUnaryNode(संचालक.type, right);
    }

    if (this.मिलान(TokenType.NUMBER, TokenType.STRING, TokenType.SATYA, TokenType.ASATYA)) {
      return this.createLiteralNode(this.पूर्व().literal);
    }

    if (this.मिलान(TokenType.IDENTIFIER)) {
      let expr: ASTNode = this.createVariableNode(this.पूर्व().lexeme);

      // Check for function call
      if (this.मिलान(TokenType.LEFT_PAREN)) {
        expr = this.समाप्तकॉल(expr);
      }

      return expr;
    }

    if (this.मिलान(TokenType.LEFT_PAREN)) {
      const expr = this.अभिव्यक्ति();
      this.उपभोग(TokenType.RIGHT_PAREN, "अभिव्यक्ति के बाद ')' अपेक्षित।");
      return this.createGroupingNode(expr);
    }

    throw this.त्रुटि(this.शिखर(), "अभिव्यक्ति अपेक्षित।");
  }

  private समाप्तकॉल(callee: ASTNode): ASTNode {
    const args: ASTNode[] = [];
    if (!this.जाँच(TokenType.RIGHT_PAREN)) {
      do {
        args.push(this.अभिव्यक्ति());
      } while (this.मिलान(TokenType.COMMA));
    }

    const paren = this.उपभोग(TokenType.RIGHT_PAREN, "तर्कों के बाद ')' अपेक्षित।");

    return this.createCallNode(callee, args, paren.line);
  }

  private चरघोषणा(): ASTNode {
    const isConstant = this.पूर्व().type === TokenType.NIYATA;
    const नाम = this.उपभोग(TokenType.IDENTIFIER, "चर नाम अपेक्षित।");
    
    let initializer: ASTNode | undefined = undefined;
    if (this.मिलान(TokenType.EQUALS)) {
      initializer = this.अभिव्यक्ति();
    }
    
    this.उपभोग(TokenType.SEMICOLON, "चर घोषणा के बाद ';' अपेक्षित।");
    
    return this.createVariableDeclarationNode(नाम.lexeme, initializer, isConstant);
  }

  private मिलान(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.जाँच(type)) {
        this.अग्रसर();
        return true;
      }
    }
    return false;
  }

  private जाँच(type: TokenType): boolean {
    if (this.समाप्त()) return false;
    return this.शिखर().type === type;
  }

  private अग्रसर(): Token {
    if (!this.समाप्त()) this.वर्तमान++;
    return this.पूर्व();
  }

  private समाप्त(): boolean {
    return this.शिखर().type === TokenType.EOF;
  }

  private शिखर(): Token {
    return this.टोकन[this.वर्तमान];
  }

  private पूर्व(): Token {
    return this.टोकन[this.वर्तमान - 1];
  }

  private उपभोग(type: TokenType, message: string): Token {
    if (this.जाँच(type)) return this.अग्रसर();
    throw this.त्रुटि(this.शिखर(), message);
  }

  private त्रुटि(token: Token, message: string): Error {
    const error = new Error(`पंक्ति ${token.line} पर त्रुटि: ${message}`);
    this.errors.push(error);
    return error;
  }

  private समन्वय(): void {
    this.अग्रसर();

    while (!this.समाप्त()) {
      if (this.पूर्व().type === TokenType.SEMICOLON) return;

      switch (this.शिखर().type) {
        case TokenType.VARGA:
        case TokenType.KARYA:
        case TokenType.MANA:
        case TokenType.YADI:
        case TokenType.PRAYATNA:
        case TokenType.ASINKRON:
          return;
      }

      this.अग्रसर();
    }
  }

  private createErrorNode(error: unknown): ASTNode {
    return {
        type: 'error',
        प्रकार: 'त्रुटि',
        त्रुटि: error
    };
  }

  private createFunctionNode(name: string, params: FunctionParameter[], returnType: string, body: ASTNode, isAsync: boolean = false): ASTNode {
    return {
        type: 'function',
        प्रकार: 'कार्य',
        नाम: name,
        मापदंड: params,
        returnType,
        शरीर: body,
        isAsync
    };
  }

  private createClassNode(name: string, methods: ASTNode[]): ASTNode {
    return {
        type: 'class',
        प्रकार: 'वर्ग',
        नाम: name,
        विधियाँ: methods
    };
  }

  private createIfNode(condition: ASTNode, thenBranch: ASTNode, elseBranch: ASTNode | null): ASTNode {
    return {
        type: 'if',
        प्रकार: 'यदि',
        शर्त: condition,
        तबशाखा: thenBranch,
        अन्यथाशाखा: elseBranch
    };
  }

  private createTryNode(tryBlock: ASTNode, catchBlock?: ASTNode, finallyBlock?: ASTNode): ASTNode {
    return {
        type: 'try',
        प्रकार: 'प्रयत्न',
        tryBlock,
        catchBlock,
        finallyBlock
    };
  }

  private createReturnNode(value: ASTNode): ASTNode {
    return {
        type: 'return',
        प्रकार: 'प्रतिफल',
        value
    };
  }

  private createBlockNode(statements: ASTNode[]): ASTNode {
    return {
        type: 'block',
        प्रकार: 'खंड',
        कथन: statements
    };
  }

  private createExpressionStatementNode(expression: ASTNode): ASTNode {
    return {
        type: 'expressionStatement',
        प्रकार: 'अभिव्यक्तिकथन',
        अभिव्यक्ति: expression
    };
  }

  private createAssignmentNode(name: any, operator: TokenType, value: ASTNode): ASTNode {
    return {
        type: 'assignment',
        प्रकार: 'निर्धारण',
        नाम: name,
        संचालक: operator,
        value
    };
  }

  private createBinaryNode(left: ASTNode, operator: TokenType, right: ASTNode): ASTNode {
    return {
        type: 'binary',
        प्रकार: 'द्विआधारी',
        left,
        संचालक: operator,
        right
    };
  }

  private createUnaryNode(operator: TokenType, right: ASTNode): ASTNode {
    return {
        type: 'unary',
        प्रकार: 'एकल',
        संचालक: operator,
        right
    };
  }

  private createLiteralNode(value: any): ASTNode {
    return {
        type: 'literal',
        प्रकार: 'साहित्यिक',
        value
    };
  }

  private createVariableNode(name: string): ASTNode {
    return {
        type: 'variable',
        प्रकार: 'चर',
        नाम: name
    };
  }

  private createGroupingNode(expression: ASTNode): ASTNode {
    return {
        type: 'grouping',
        प्रकार: 'समूहन',
        अभिव्यक्ति: expression
    };
  }

  private createCallNode(callee: ASTNode, args: ASTNode[], line: number): ASTNode {
    return {
        type: 'call',
        प्रकार: 'आह्वान',
        callee,
        arguments: args,
        line
    };
  }

  private createVariableDeclarationNode(name: string, initializer?: ASTNode, isConstant: boolean = false): ASTNode {
    return {
        type: 'variableDeclaration',
        प्रकार: 'चरघोषणा',
        नाम: name,
        initializer,
        isConstant
    };
  }

  private createPatternMatchNode(value: ASTNode, patterns: PatternCaseNode[]): ASTNode {
    return {
        type: 'PATTERN_MATCH',
        प्रकार: 'मिलान',
        value,
        patterns
    };
  }

  private createTemplateLiteralNode(parts: (string | ASTNode)[]): ASTNode {
    return {
        type: 'TEMPLATE_LITERAL',
        प्रकार: 'टेम्पलेटलिटरल',
        parts
    };
  }
}

// Export the Sanskrit class name as Parser for external use
export const Parser = व्याकरणविश्लेषक;

// Error message translations for better debugging
const त्रुटिअनुवाद: Record<string, string> = {
    'Unexpected token': 'अप्रत्याशित टोकन',
    'Expected identifier': 'पहचानकर्ता अपेक्षित',
    'Expected expression': 'अभिव्यक्ति अपेक्षित',
    'Expected operator': 'ऑपरेटर अपेक्षित',
    'Unterminated string': 'अपूर्ण स्ट्रिंग',
    'Unexpected end of input': 'इनपुट का अप्रत्याशित अंत',
    // Add more translations as needed
};