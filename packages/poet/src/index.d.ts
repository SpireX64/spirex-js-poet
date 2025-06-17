/** Options for configuring the CodeBuilder instance. */
export type TCodeBuilderOptions = {
    /** The string used for one level of indentation. */
    indent?: string
    /** The string used to represent a line break. */
    lineBreak?: string
}

/**
 * A utility class to help build formatted code strings
 * with indentation and line breaks.
 */
export class CodeBuilder {
    /**
     * Creates an instance of CodeBuilder.
     * @param [options] - Configuration options of builder
     */
    constructor(options?: TCodeBuilderOptions);

    /**
     * Increases the current indentation level by one.
     * @returns Returns the CodeBuilder instance for chaining.
     */
    indent(): CodeBuilder;

    /**
     * Decreases the current indentation level by one, but not below zero.
     * @returns Returns the CodeBuilder instance for chaining.
     */
    outdent(): CodeBuilder;

    /**
     * Appends a string to the current buffer without any additional formatting.
     * @param [str] - The string to append.
     * @returns Returns the CodeBuilder instance for chaining.
     */
    append(str: string): CodeBuilder;

    /**
     * Appends the current indentation string based on the indentation level.
     * @returns Returns the CodeBuilder instance for chaining.
     */
    appendIndent(): CodeBuilder;

    /**
     * Appends a string prefixed by the current indentation and then adds a line break.
     * If no string is provided, only a line break is added.
     *
     * @param [str] - The string to append.
     * @returns Returns the CodeBuilder instance for chaining.
     */
    appendLine(str: string): CodeBuilder;

    /**
     * Appends the provided string (if any), followed by a line break.
     * @param [str] - Optional string to append before the line break.
     * @returns Returns the CodeBuilder instance for chaining.
     */
    lineBreak(str?: string): CodeBuilder;

    /**
     * Returns the complete generated code as a string.
     * @returns {string} The concatenated code string.
     */
    toString(): string;
}
