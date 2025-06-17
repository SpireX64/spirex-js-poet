function isValidIdentifier(identifier) {
    return /^[a-zA-Z_$][\w$]*$/.test(identifier);
}

function stringLiteral(stringValue, singleQuotes) {
    var quote = singleQuotes ? "'" : '"';
    stringValue = stringValue
        .replace(/\\/g, "\\\\")
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f")
        .replace(/\v/g, "\\v")
        .replace(RegExp(quote, "g"), "\\" + quote);
    return quote + stringValue + quote;
}

function valueToCode(value, config) {
    if (value === undefined) return "undefined";
    if (value === null) return "null";

    var type = typeof value;
    if (type === "string") return stringLiteral(value, config.useSingleQuotes);
    if (type === "number" || type === "boolean") return String(value);
    if (Array.isArray(value)) {
        var csv = value.map((v) => valueToCode(v, config)).join(", ");
        return "[" + csv + "]";
    }
    if (type === "object") {
        var entries = Object.entries(value).map(([key, value]) => {
            var safeKey = isValidIdentifier(key) ? key : JSON.stringify(key);
            return `${safeKey}: ${valueToCode(value, config)}`;
        });
        return "{ " + entries.join(", ") + " }";
    }
    throw new Error(`Unknown value type: ${type}`);
}

var ConstantDeclarationPrototype = Object.freeze({
    elementType: "const",
    // Use 'const' keyword to declare constant by default
    kind: "const",
    // Constants are not exported by default
    exported: false,
    valueOf() {
        return this.value;
    },
    // istanbul ignore next
    toString() {
        return `const{${this.name} = ${JSON.stringify(this.value)}}`;
    },
    generateJS() {
        var cb = [];
        if (this.exported) cb.push("export ");
        cb.push(this.kind === "var" ? "var " : "const ");
        cb.push(this.name);
        cb.push(" = ");
        cb.push(valueToCode(this.value, this.module.config));
        cb.push(";\n");
        return cb.join("");
    },
});

var defaultConfig = {
    useSingleQuotes: false,
    constantDeclaration: "const",
};

export class Module {
    #config;
    #constants = [];

    constructor(config) {
        this.#config = config
            ? Object.assign({}, defaultConfig, config)
            : defaultConfig;
    }

    get config() {
        return this.#config;
    }

    get constants() {
        return Array.from(this.#constants);
    }

    constant(name, value, opt) {
        this.#constants.push(
            Object.freeze(
                Object.setPrototypeOf(
                    {
                        name,
                        value,
                        module: this,
                        exported: opt && opt.export,
                        kind: opt && opt.kind,
                    },
                    ConstantDeclarationPrototype,
                ),
            ),
        );
        return this;
    }

    refConstant(name) {
        return this.#constants.find((it) => it.name === name) || null;
    }

    generateJS() {
        var cb = [];
        this.#constants.forEach((c) => {
            cb.push(c.generateJS());
        });
        return cb.join("");
    }
}
