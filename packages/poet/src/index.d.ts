export type TCodeBuilderOptions = {
    indent?: string
    lineBreak?: string
}

export class CodeBuilder {
    constructor(options?: TCodeBuilderOptions);

    indent(): CodeBuilder;
    outdent(): CodeBuilder;
    append(str: string): CodeBuilder;
    appendIndent(): CodeBuilder;
    appendLine(str?: string): CodeBuilder;
    lineBreak(str?: string): CodeBuilder;
    toString(): string;
}
