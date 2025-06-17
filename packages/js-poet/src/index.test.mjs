import { describe, test, expect } from "vitest";
import { Module } from './index';

describe("JSPoet", () => {
    describe("Module", () => {
        describe("Create", () => {
            test("WHEN: create module", () => {
                // Act ------------
                var module = new Module()

                // Assert ---------
                // 1. Constructor returns expected object
                expect(module).toBeInstanceOf(Module);

                // 2. Has empty list of constants
                expect(module.constants).instanceOf(Array);
                expect(module.constants).is.empty;
            })
        })
    })
})
