export interface ICodeElement<DeclType> {
    readonly decl: DeclType;
    generateJS(): string;
}

export interface IConstantDeclaration extends ICodeElement<'const'> {
    readonly name: string;
    readonly value: unknown;
}

export class Module {
    public readonly constants: readonly IConstantDeclaration[]

    public constant(name: string, value: unknown): Module
    public refConstant(name: string): IConstantDeclaration | null

    public generateJS(): string;
}
