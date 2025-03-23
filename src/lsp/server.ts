import {
    createConnection,
    TextDocuments,
    Diagnostic,
    DiagnosticSeverity,
    ProposedFeatures,
    InitializeParams,
    TextDocumentPositionParams,
    CompletionItem,
    CompletionItemKind,
    TextDocumentSyncKind,
    InitializeResult
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Lexer } from '../lexer/lexer';
import { Parser } from '../parser/parser';

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);

// Create a text document manager
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Keywords and built-in functions in Sanskrit
const keywords = [
    'यदि', 'अन्यथा', 'अथवा', // if, else, elif
    'पुनरावृत्ति', 'विराम', // loop, break
    'फलन', 'वापसी', // function, return
    'वर्ग', 'अंक', 'पाठ', // class, number, string
    'सत्य', 'असत्य', // true, false
    'शून्य' // null
];

const builtinFunctions = [
    'योग', 'व्यवकलन', 'गुणन', 'भाग', // arithmetic operations
    'लिख', 'पढ़', // I/O operations
    'संयोजन', 'विभाजन', // string operations
    'आकार', 'खोज' // utility functions
];

connection.onInitialize((params: InitializeParams): InitializeResult => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.']
            },
            hoverProvider: true,
            definitionProvider: true,
            referencesProvider: true
        }
    };
});

// Provide code completion
connection.onCompletion((params: TextDocumentPositionParams): CompletionItem[] => {
    return [
        ...keywords.map(keyword => ({
            label: keyword,
            kind: CompletionItemKind.Keyword,
            data: 'keyword'
        })),
        ...builtinFunctions.map(func => ({
            label: func,
            kind: CompletionItemKind.Function,
            data: 'function'
        }))
    ];
});

// Provide additional information for completion items
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    if (item.data === 'keyword') {
        item.detail = 'Sanskrit Keyword';
        item.documentation = 'Built-in Sanskrit language keyword';
    } else if (item.data === 'function') {
        item.detail = 'Built-in Function';
        item.documentation = 'Sanskrit standard library function';
    }
    return item;
});

// Validate documents
documents.onDidChangeContent(change => {
    validateDocument(change.document);
});

async function validateDocument(document: TextDocument): Promise<void> {
    const diagnostics: Diagnostic[] = [];
    const text = document.getText();

    try {
        const lexer = new Lexer(text);
        const tokens = lexer.शब्दविश्लेषण();
        const parser = new Parser(tokens);
        parser.विश्लेषण();
    } catch (error) {
        if (error instanceof Error) {
            diagnostics.push({
                severity: DiagnosticSeverity.Error,
                range: {
                    start: document.positionAt(0),
                    end: document.positionAt(text.length)
                },
                message: error.message,
                source: 'sanskrit'
            });
        }
    }

    connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

// Listen for document changes
documents.listen(connection);

// Listen for connection
connection.listen();