import { ASTNode, FunctionParameter, TokenType } from '../types';

/**
 * Compiles the Sanskrit AST to JavaScript
 * @param ast Abstract Syntax Tree nodes 
 * @returns JavaScript code as string
 */
export function compile(ast: ASTNode[]): string {
    let code = '';
    
    for (const node of ast) {
        code += compileNode(node) + '\n';
    }
    
    return code;
}

function compileNode(node: ASTNode | undefined, indent: string = ''): string {
    if (!node) return '';
    
    switch (node.type) {
        case 'function':
            return compileFunction(node, indent);
        case 'class':
            return compileClass(node, indent);
        case 'if':
            return compileIf(node, indent);
        case 'try':
            return compileTry(node, indent);
        case 'return':
            return indent + 'return ' + compileNode(node.value) + ';';
        case 'block':
            return compileBlock(node, indent);
        case 'expressionStatement':
            return indent + compileNode(node.अभिव्यक्ति) + ';';
        case 'assignment':
            return indent + node.नाम + ' ' + getOperatorString(node.संचालक) + ' ' + compileNode(node.value);
        case 'binary':
            return compileNode(node.left) + ' ' + getOperatorString(node.संचालक) + ' ' + compileNode(node.right);
        case 'unary':
            return getOperatorString(node.संचालक) + compileNode(node.right);
        case 'literal':
            return compileLiteral(node.value);
        case 'variable':
            return node.नाम;
        case 'grouping':
            return '(' + compileNode(node.अभिव्यक्ति) + ')';
        case 'call':
            return compileCall(node, indent);
        case 'variableDeclaration':
            return compileVariableDeclaration(node, indent);
        case 'PATTERN_MATCH':
            return compilePatternMatch(node, indent);
        case 'TEMPLATE_LITERAL':
            return compileTemplateLiteral(node);
        default:
            return `/* Unsupported node type: ${node.type} */`;
    }
}

function compileFunction(node: ASTNode, indent: string): string {
    const isAsync = node.isAsync ? 'async ' : '';
    const params = (node.मापदंड || []).map((param: FunctionParameter) => {
        let paramStr = param.name;
        
        // Handle default parameters
        if (param.defaultValue !== null && param.defaultValue !== undefined) {
            paramStr += ' = ' + compileNode(param.defaultValue);
        }
        
        return paramStr;
    }).join(', ');
    
    return `${indent}${isAsync}function ${node.नाम}(${params}) {
${compileNode(node.शरीर, indent + '  ')}
${indent}}`;
}

function compileClass(node: ASTNode, indent: string): string {
    const methods = (node.विधियाँ || []).map((method: ASTNode) => compileNode(method, indent + '  ')).join('\n\n');
    
    return `${indent}class ${node.नाम} {
${methods}
${indent}}`;
}

function compileIf(node: ASTNode, indent: string): string {
    let code = `${indent}if (${compileNode(node.शर्त)}) {
${compileNode(node.तबशाखा, indent + '  ')}
${indent}}`;
    
    if (node.अन्यथाशाखा) {
        code += ` else {
${compileNode(node.अन्यथाशाखा, indent + '  ')}
${indent}}`;
    }
    
    return code;
}

function compileTry(node: ASTNode, indent: string): string {
    let code = `${indent}try {
${compileNode(node.tryBlock, indent + '  ')}
${indent}}`;
    
    if (node.catchBlock) {
        code += ` catch (error) {
${compileNode(node.catchBlock, indent + '  ')}
${indent}}`;
    }
    
    if (node.finallyBlock) {
        code += ` finally {
${compileNode(node.finallyBlock, indent + '  ')}
${indent}}`;
    }
    
    return code;
}

function compileBlock(node: ASTNode, indent: string): string {
    let code = '';
    for (const statement of node.कथन || []) {
        code += compileNode(statement, indent) + '\n';
    }
    return code;
}

function compileCall(node: ASTNode, indent: string): string {
    const args = (node.arguments || []).map((arg: ASTNode) => compileNode(arg)).join(', ');
    return `${compileNode(node.callee)}(${args})`;
}

function compileVariableDeclaration(node: ASTNode, indent: string): string {
    const keyword = node.isConstant ? 'const' : 'let';
    const initializer = node.initializer ? ' = ' + compileNode(node.initializer) : '';
    
    return `${indent}${keyword} ${node.नाम}${initializer};`;
}

function compilePatternMatch(node: ASTNode, indent: string): string {
    // Convert pattern matching to a switch statement or if/else chain
    // Depending on the exact semantics needed
    
    const valueVar = '_matchValue';
    let code = `${indent}(function() {
${indent}  const ${valueVar} = ${compileNode(node.value)};
${indent}  `;
    
    // Check for pattern types, here we use a basic approach
    // A more sophisticated implementation would need proper pattern evaluation
    for (const pattern of node.patterns || []) {
        if (pattern.isDefault) {
            code += `
${indent}  // Default case
${indent}  return ${compileNode(pattern.body)};`;
        } else {
            code += `
${indent}  if (${valueVar} === ${compileNode(pattern.pattern)}) {
${indent}    return ${compileNode(pattern.body)};
${indent}  }`;
        }
    }
    
    code += `
${indent}})()`;
    
    return code;
}

function compileTemplateLiteral(node: ASTNode): string {
    const parts = (node.parts || []).map((part: string | ASTNode) => {
        if (typeof part === 'string') {
            return part;
        } else {
            return '${' + compileNode(part) + '}';
        }
    });
    
    return '`' + parts.join('') + '`';
}

function compileLiteral(value: any): string {
    if (typeof value === 'string') {
        return `"${value}"`;
    } else if (value === null) {
        return 'null';
    } else if (value === undefined) {
        return 'undefined';
    } else {
        return value.toString();
    }
}

function getOperatorString(operatorType: TokenType): string {
    // Map TokenType to actual operator strings
    const operatorMap: Record<string, string> = {
        'EQUALS': '=',
        'YOGA': '+',
        'VIYOGA': '-',
        'GUNA': '*',
        'BHAGA': '/',
        'SHESH': '%',
        'SAMAAN': '==',
        'ASAMAAN': '!=',
        'ADHIK': '>',
        'NYOON': '<',
        'ADHIKTULYA': '>=',
        'NYUNTULYA': '<=',
        'AUR': '&&',
        'YA': '||',
        'NA': '!',
        'SAMAAN_YOGA': '+=',
        'SAMAAN_VIYOGA': '-=',
        'SAMAAN_GUNA': '*=',
        'SAMAAN_BHAGA': '/=',
        'SAMAAN_SHESH': '%='
    };
    
    return operatorMap[operatorType] || operatorType.toString();
} 