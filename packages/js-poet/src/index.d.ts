export type TConstantDeclarationKind = "const" | "var";

export type TCodeGenerationConfig = {
    constantDeclaration?: TConstantDeclarationKind;
    useSingleQuotes?: boolean;
};

export interface ICodeElement<ElementType> {
    readonly elementType: ElementType;
    generateJS(): string;
}

export interface IExportableCodeElement<DeclType>
    extends ICodeElement<DeclType> {
    module: Module;
    exported: boolean;
}

export interface IConstantDeclaration extends IExportableCodeElement<"const"> {
    readonly name: string;
    readonly value: unknown;
    readonly kind: TConstantDeclarationKind;
}

export type TConstantOptions = {
    kind?: TConstantDeclarationKind;
    export?: boolean;
};

export class Module {
    public readonly constants: readonly IConstantDeclaration[];

    public constructor(config?: TCodeGenerationConfig);

    public constant(
        name: string,
        value: unknown,
        options: TConstantOptions,
    ): Module;
    public refConstant(name: string): IConstantDeclaration | null;

    public generateJS(): string;
}
