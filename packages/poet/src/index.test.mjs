import { describe, test, expect } from "vitest";
import { CodeBuilder } from "./index";

describe("CodeBuilder", () => {
    test("WHEN: Empty string", () => {
        // Arrange ---------
        var cb = new CodeBuilder();

        // Act -------------
        var result = cb.toString();

        // Assert ----------
        expect(result).toBe("");
    });

    test("WHEN: Append single string", () => {
        // Arrange ---------
        var cb = new CodeBuilder();

        // Act -------------
        cb.append("var foo;");
        var result = cb.toString();

        // Assert ----------
        expect(result).toBe("var foo;");
    });

    test("WHEN: Append multiple strings", () => {
        // Arrange --------
        var cb = new CodeBuilder();

        // Act -----------
        cb.append("var foo;").append(" // decl");

        var result = cb.toString();

        // Assert -------
        expect(result).toBe("var foo; // decl");
    });

    test("WHEN: Append line", () => {
        // Arrange -------
        var cb = new CodeBuilder();

        // Act -----------
        cb.appendLine("var foo;");
        var result = cb.toString();

        // Assert --------
        expect(result).toBe("var foo;\n");
    });

    test("WHEN: Append multiline lines", () => {
        // Arrange ------
        var cb = new CodeBuilder();

        // Act ---------
        cb.appendLine("var foo;").appendLine("var bar = 42;");
        var result = cb.toString();

        // Assert ------
        expect(result).toBe("var foo;\nvar bar = 42;\n");
    });

    test("WHEN: Append empty string", () => {
        // Arrange -------
        var cb = new CodeBuilder();

        // Act -----------
        cb.appendLine("");
        var result = cb.toString();

        // Arrange ------
        expect(result).toBe("");
    })

    test("WHEN: Append empty line", () => {
        // Arrange -------
        var cb = new CodeBuilder();

        // Act -----------
        cb.appendLine("var foo;").lineBreak().appendLine("print(foo);");
        var result = cb.toString();

        // Assert --------
        expect(result).toBe("var foo;\n\nprint(foo);\n");
    })

    test("WHEN: Append with indent", () => {
        // Arrange ------
        var cb = new CodeBuilder();

        // Act ----------
        cb.appendLine("{")
            .indent()
            .appendLine("hello();")
            .outdent()
            .appendLine("}");

        var result = cb.toString();

        // Assert ------
        expect(result).toBe("{\n  hello();\n}\n");
    });

    test("WHEN: Auto-indent lines", () => {
        // Arrange -------
        var cb = new CodeBuilder();

        // Act -----------
        cb.appendLine("{").indent().appendLine('var foo;\nvar bar = 42;').outdent().appendLine('}');
        var result = cb.toString();

        // Arrange -------
        expect(result).toBe("{\n  var foo;\n  var bar = 42;\n}\n");
    })

    test("WHEN: Append parts of line", () => {
        // Arrange -----
        var cb = new CodeBuilder();

        // Act ---------
        cb.appendLine("{")
            .indent()
            .appendIndent()
            .append("exec();")
            .lineBreak(" // run")
            .outdent()
            .appendLine("}");
        var result = cb.toString();

        // Assert ------
        expect(result).toBe("{\n  exec(); // run\n}\n");
    });

    test("WHEN: Outdent with zero level indent", () => {
        // Arrange ------
        var cb = new CodeBuilder();

        // Act ----------
        cb.outdent().appendLine("hello");
        var result = cb.toString();

        // Assert -------
        expect(result).toBe("hello\n");
    })

    test("WHEN: override indent string", () => {
        // Arrange -------
        var cb = new CodeBuilder({ indent: "--" });

        // Act -----------
        cb.appendLine("var foo;").indent().appendLine("exec();");
        var result = cb.toString();

        expect(result).toBe("var foo;\n--exec();\n");
    });

    test("WHEN: override line break string", () => {
        // Arrange ---------
        var cb = new CodeBuilder({ lineBreak: ' -> ' });

        // Act ------------
        cb.appendLine("foo").appendLine('bar').append('qwe');
        var result = cb.toString();

        // Arrange --------
        expect(result).toBe("foo -> bar -> qwe");
    })
});
