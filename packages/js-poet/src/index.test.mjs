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

        describe("Constants", () => {
            test("WHEN: Get list of constants", () => {
                // Arrange ------
                var module = new Module()
                    .constant('foo', 42);
                var ref = module.refConstant('foo');

                // Act ----------
                var list1 = module.constants;
                var list2 = module.constants;

                // Assert -------
                // 1. Both lists contains constant declaration reference
                expect(list1).contains(ref);
                expect(list2).contains(ref);

                // 2. There are different copies of the internal list
                //    to prevent external mutation.
                expect(list1).not.toBe(list2);
            })

            test("WHEN: Declare constant", () => {
                // Arrange -------
                var expectedConstantName = 'foo'
                var expectedConstantValue = 42
                var module = new Module();

                // Act ----------
                var chainThis = module.constant(expectedConstantName, expectedConstantValue)
                var constant = module.refConstant(expectedConstantName)

                // Assert -------
                // 1. 'refConstant' returns constant declaration object
                expect(constant).instanceOf(Object)
                expect(constant).is.frozen; // is immutable
                expect(constant.decl).toBe('const'); // is constant declaration
                expect(constant.name).toBe(expectedConstantName)
                expect(constant.value).toBe(expectedConstantValue)
                expect(constant.valueOf()).toBe(expectedConstantValue)

                // 2. The constants list contains new constant
                expect(module.constants).to.contain(constant);

                // 3. 'constant' method returns module itself for chaining
                expect(chainThis).toBe(module);
            })

            test("WHEN: Ref undeclared constant", () => {
                // Arrange -------
                var module = new Module();

                // Act -----------
                var ref = module.refConstant('foo');

                // Assert --------
                expect(ref).is.null;
            })
        })
    })
})
