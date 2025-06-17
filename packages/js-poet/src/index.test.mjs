import { describe, test, expect } from "vitest";
import { Module } from './index';

describe("JSPoet", () => {
    describe("Module", () => {
        describe("Create", () => {
            test("WHEN: create module", () => {
                // Act ------------
                var module = new Module()

                // Assert ---------
                // Constructor returns expected object
                expect(module).toBeInstanceOf(Module);
            })
        })
    })
})
