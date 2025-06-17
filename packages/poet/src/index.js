var DEFAULT_INDENT = "  ";
var DEFAULT_LINE_BREAK = "\n"

export class CodeBuilder {
    #buffer = [];
    #indentLevel = 0;
    #indentString = DEFAULT_INDENT;
    #newLineString = DEFAULT_LINE_BREAK;

    constructor(options) {
        if (options) {
            this.#indentString = options.indent || DEFAULT_INDENT;
            this.#newLineString = options.lineBreak || DEFAULT_LINE_BREAK;
        }
    }

    indent() {
        this.#indentLevel++;
        return this;
    }

    outdent() {
        if (this.#indentLevel > 0) this.#indentLevel--;
        return this;
    }

    append(str) {
        this.#buffer.push(str);
        return this;
    }

    appendIndent() {
        this.#buffer.push(this.#indentString.repeat(this.#indentLevel));
        return this;
    }

    lineBreak(str) {
        if (str) this.append(str)
        return this.append(this.#newLineString);
    }

    appendLine(str) {
        if (str)
        for (const line of str.split(/\r?\n/))
            this.appendIndent().append(line).lineBreak();
        return this;
    }

    toString() {
        return this.#buffer.join("");
    }
}
