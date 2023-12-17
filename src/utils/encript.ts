import crypto from "crypto"
export function encript(value:string):string{
    return crypto.createHash("sha-256").update(value).digest("hex")
}