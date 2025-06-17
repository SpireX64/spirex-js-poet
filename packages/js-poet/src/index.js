var ConstantDeclarationPrototype = Object.freeze({
    decl: "const",
    valueOf() {
        return this.value;
    },
    // istanbul ignore next
    toString() {
        return `const{${this.name} = ${JSON.stringify(this.value)}}`;
    },
    generateJS() {
        return `var ${this.name} = ${JSON.stringify(this.value)};\n`
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
            cb.push(c.generateJS());
        });
        return cb.join("");
    }
}
