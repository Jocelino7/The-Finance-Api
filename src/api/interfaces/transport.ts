export interface EmailTransport {
    host?: string | undefined,
    port?: number |undefined,
    secure?: boolean | undefined,
    service?:string | undefined,
    auth: {
      user: string,
      pass: string,
    },
}