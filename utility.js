async function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

async function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function padKey(key, length) {
  let paddedKey = key;
  while (paddedKey.length < length) {
    paddedKey += "0"; // Simple ASCII padding
  }
  return paddedKey.slice(0, length);
}

export async function encryptMessage(message) {
  const keyText = padKey("B00k_Sagϵ", 16);
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    await str2ab(keyText),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12 bytes for GCM
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    keyMaterial,
    await str2ab(message)
  );

  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const encryptedHex = Array.from(new Uint8Array(encrypted))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return ivHex + ":" + encryptedHex;
}

export async function decryptMessage(message) {
  const keyText = padKey("B00k_Sagϵ", 16);
  if (typeof message !== "string" || !message.includes(":")) {
    return "Invalid message format.";
  }

  const [ivHex, encryptedHex] = message.split(":");
  const iv = new Uint8Array(
    ivHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  const encryptedBytes = new Uint8Array(
    encryptedHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    await str2ab(keyText),
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      keyMaterial,
      encryptedBytes
    );

    return await ab2str(decrypted);
  } catch (error) {
    return "Decryption failed.";
  }
}
