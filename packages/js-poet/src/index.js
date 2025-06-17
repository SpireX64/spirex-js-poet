var ConstantDeclarationPrototype = Object.freeze({
    decl: "const",
    valueOf() {
        return this.value;
    },
    // istanbul ignore next
    toString() {
        return `const{${this.name} = ${JSON.stringify(this.value)}}`;
    },
});

export class Module {
    #constants = [];

    get constants() {
        return Array.from(this.#constants);
    }

    constant(name, value) {
        this.#constants.push(
            Object.freeze(
                Object.setPrototypeOf(
                    {
                        name,
                        value,
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
            cb.push(`var ${c.name} = ${JSON.stringify(c.value)};\n`);
        });
        return cb.join("");
    }
}
