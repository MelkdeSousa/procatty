import crypto from 'crypto'

import { IHashFunction } from "@core/interfaces/helpers/hash-function";
import { environment } from '@infra/config/environment'

/* A class that implements the `IHashFunction` interface. */
export class HashFunction implements IHashFunction {
  private hash = (value: crypto.BinaryLike, salt: crypto.BinaryLike, keylen: number) =>
    new Promise((resolve: (value: Buffer) => void, reject) => {
      crypto.scrypt(value, salt, keylen, (err, derivedKey) => {
        if (err) {
          reject(err)
        }

        resolve(derivedKey)
      })
    })

  /* Encrypting the value passed as a parameter. */
  async execute(value: string): Promise<string> {
    const hash = await this.hash(value, environment.salt_hash, 64)

    return hash.toString('hex')
  }

  /* Comparing the value passed as a parameter with the hash passed as a parameter. */
  async compare(value: string, hash: string): Promise<boolean> {
    const encrypted = await this.execute(value)

    return encrypted === hash
  }
}
