// utils/encryption.js

import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Use a strong secret key

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
