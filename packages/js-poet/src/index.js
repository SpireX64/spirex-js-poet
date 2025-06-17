export class Module {
    #constants = new Set();

    get constants() { return Array.from(this.#constants); }
}
