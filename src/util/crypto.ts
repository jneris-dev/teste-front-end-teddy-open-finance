import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY as string;

export function encrypt(obj: any): string {
  const jsonString = JSON.stringify(obj);
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
}

export function decrypt(encryptedString: string): any | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Erro ao descriptografar dados:", error);
    return null;
  }
}
