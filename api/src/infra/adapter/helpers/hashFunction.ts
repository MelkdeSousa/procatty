import crypto from 'crypto'

import { IHashFunction } from "@core/interfaces/helpers/hashFunction";
import { environment } from '@infra/config/environment'

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

  async execute(value: string): Promise<string> {
    const hash = await this.hash(value, environment.salt_hash, 64)

    return hash.toString('hex')
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const encrypted = await this.execute(value)

    return encrypted === hash
  }
}
