import {isSafe} from "./password.js";
import { describe, it, expect} from "vitest";

describe("isSafe", () => {
    it("devuelve true si la contraseña tiene seis caracteres o mas", () =>{
        const password = "123456";
        
        const result = isSafe(password);

        expect(result).toBe(true);
    });
    it(" deuvelve false si el string esta vacio", () => {
        const vacio = "";

        const result = isSafe(vacio);
        expect(result).toBe(false)
    })
});