import crypto from "crypto";

export function encript(value: string): string {
  if (value !== undefined && value!=null) {
    return crypto.createHash("sha-256").update(value).digest("hex");
  } else {
    throw new Error('Input value is undefined Or it is null.');
  }
}
