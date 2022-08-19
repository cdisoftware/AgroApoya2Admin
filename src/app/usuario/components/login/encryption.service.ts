import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: "root"
})
export class EncryptionService {
  key: any = "password12345678";
  IV = "password12345678=";

  // ENCRYPTION USING CBC TRIPLE DES
  encryptUsingTripleDES(res: string, typeObj: boolean): string {
    const data = res;
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.IV);
    const mode = CryptoJS.mode.CBC;
    const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, { iv, mode });
    return encrypted.toString();
  }

  // DECRYPTION USING CBC TRIPLE DES
  decryptUsingTripleDES(encrypted: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.IV);
    const mode = CryptoJS.mode.CBC;
    const decrypted = CryptoJS.TripleDES.decrypt(encrypted, keyHex, { iv, mode });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  // ENCRYPTION USING AES
  encryptUsingAES(res: any, typeObj: boolean): string {
    const data = typeObj ? JSON.stringify(res) : res;
    const hash = CryptoJS.MD5(this.key).toString();
    const encrypted = CryptoJS.AES.encrypt(data, hash);
    return encrypted.toString();
  }

  // DECRYPTION USING AES
  decryptUsingAES(encrypted: string): string {
    const hash = CryptoJS.MD5(this.key).toString();
    const decrypted = CryptoJS.AES.decrypt(encrypted, hash);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}