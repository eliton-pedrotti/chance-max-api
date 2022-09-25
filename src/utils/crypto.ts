import { createHash, randomBytes, createCipheriv, createDecipheriv, Cipher, Decipher } from 'crypto';

const ENCRYPTION_KEY: string = createHash('sha256')
    .update(String('secret'))
    .digest('base64')
    .substr(0, 32);

const IV_LENGTH = 16;

export function encrypt(text: string): string {
    try {
        let iv: Buffer = randomBytes(IV_LENGTH);
        let cipher: Cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted: Buffer = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
        throw new Error(error);
    }
}

export function decrypt(text: string): string {
    try {
        let textParts: string[] = text.split(':');
        let iv: Buffer = Buffer.from(textParts.shift(), 'hex');
        let encryptedText: Buffer = Buffer.from(textParts.join(':'), 'hex');
        let decipher: Decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted: Buffer = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    } catch (error) {
        throw new Error(error);
    }
}