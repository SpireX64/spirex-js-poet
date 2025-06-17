export type TConstantDeclaration = {
    readonly decl: 'const'
    readonly name: string;
    readonly value: unknown;
}

export class Module {
    public readonly constants: readonly TConstantDeclaration[]

    public constant(name: string, value: unknown): Module
    public refConstant(name: string): TConstantDeclaration | null
}
