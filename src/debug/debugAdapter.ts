import {
    Logger, logger,
    LoggingDebugSession,
    InitializedEvent, TerminatedEvent, StoppedEvent, OutputEvent,
    Thread, StackFrame, Scope, Source, Handles
} from '@vscode/debugadapter';
import { DebugProtocol } from '@vscode/debugprotocol';
import { basename } from 'path';
import { संस्कृतकार्यान्वयन as SanskritRuntime } from './sanskritRuntime';

interface LaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
    program: string;
    stopOnEntry?: boolean;
}

export class SanskritDebugSession extends LoggingDebugSession {
    private static THREAD_ID = 1;
    private runtime: SanskritRuntime;
    private variableHandles = new Handles<string>();

    public constructor() {
        super("sanskrit-debug.txt");
        this.runtime = new SanskritRuntime();

        this.runtime.on('stopOnEntry', () => {
            this.sendEvent(new StoppedEvent('entry', SanskritDebugSession.THREAD_ID));
        });

        this.runtime.on('stopOnStep', () => {
            this.sendEvent(new StoppedEvent('step', SanskritDebugSession.THREAD_ID));
        });

        this.runtime.on('stopOnBreakpoint', () => {
            this.sendEvent(new StoppedEvent('breakpoint', SanskritDebugSession.THREAD_ID));
        });

        this.runtime.on('output', (text: string) => {
            const e: DebugProtocol.OutputEvent = new OutputEvent(`${text}\n`);
            this.sendEvent(e);
        });

        this.runtime.on('end', () => {
            this.sendEvent(new TerminatedEvent());
        });
    }

    protected initializeRequest(response: DebugProtocol.InitializeResponse, args: DebugProtocol.InitializeRequestArguments): void {
        response.body = {
            ...response.body,
            supportsConfigurationDoneRequest: true,
            supportsEvaluateForHovers: true,
            supportsStepBack: false,
            supportsDataBreakpoints: false,
            supportsCompletionsRequest: true,
            supportsFunctionBreakpoints: true,
            supportsDelayedStackTraceLoading: true,
        };

        this.sendResponse(response);
        this.sendEvent(new InitializedEvent());
    }

    protected async launchRequest(response: DebugProtocol.LaunchResponse, args: LaunchRequestArguments) {
        logger.setup(Logger.LogLevel.Verbose, false);

        await this.runtime.start(args.program, !!args.stopOnEntry);

        this.sendResponse(response);
    }

    protected threadsRequest(response: DebugProtocol.ThreadsResponse): void {
        response.body = {
            threads: [
                new Thread(SanskritDebugSession.THREAD_ID, "मुख्य धागा")  // Main Thread in Sanskrit
            ]
        };
        this.sendResponse(response);
    }

    protected stackTraceRequest(response: DebugProtocol.StackTraceResponse, args: DebugProtocol.StackTraceArguments): void {
        const stack = this.runtime.stack();
        const frames: StackFrame[] = stack.map((f) => {
            const source = new Source(basename(f.फ़ाइल), this.convertDebuggerPathToClient(f.फ़ाइल));
            return new StackFrame(f.क्रम, f.नाम, source, f.पंक्ति);
        });
        response.body = {
            stackFrames: frames,
            totalFrames: stack.length
        };
        this.sendResponse(response);
    }

    protected scopesRequest(response: DebugProtocol.ScopesResponse, args: DebugProtocol.ScopesArguments): void {
        response.body = {
            scopes: [
                new Scope("स्थानीय", this.variableHandles.create("local"), false),
                new Scope("वैश्विक", this.variableHandles.create("global"), true)
            ]
        };
        this.sendResponse(response);
    }

    protected async variablesRequest(response: DebugProtocol.VariablesResponse, args: DebugProtocol.VariablesArguments) {
        const variables = this.runtime.getVariables(this.variableHandles.get(args.variablesReference));
        response.body = {
            variables: variables.map((v) => ({
                name: v.नाम,
                type: v.प्रकार,
                value: v.मान,
                variablesReference: 0
            }))
        };
        this.sendResponse(response);
    }

    protected continueRequest(response: DebugProtocol.ContinueResponse, args: DebugProtocol.ContinueArguments): void {
        this.runtime.continue();
        this.sendResponse(response);
    }

    protected nextRequest(response: DebugProtocol.NextResponse, args: DebugProtocol.NextArguments): void {
        this.runtime.step();
        this.sendResponse(response);
    }

    protected evaluateRequest(response: DebugProtocol.EvaluateResponse, args: DebugProtocol.EvaluateArguments): void {
        response.body = {
            result: this.runtime.evaluate(args.expression),
            variablesReference: 0
        };
        this.sendResponse(response);
    }
}