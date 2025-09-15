import { vi } from "vitest";
import { encrypt, decrypt } from "../util/crypto";

describe("crypto utilities", () => {
  it("deve criptografar e descriptografar um objeto corretamente", () => {
    const data = { id: 1, name: "Test User", loggedIn: true };

    const encryptedData = encrypt(data);

    expect(typeof encryptedData).toBe("string");
    expect(encryptedData).not.toEqual(JSON.stringify(data));

    const decryptedData = decrypt(encryptedData);

    expect(decryptedData).toEqual(data);
  });

  it("deve retornar null se a descriptografia falhar", () => {
    const invalidData = "dados-invalidos";

    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = decrypt(invalidData);

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });
});
