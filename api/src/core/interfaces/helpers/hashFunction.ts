/* Defining the interface for a class that will be used to hash and compare values. */
export interface IHashFunction {
  execute(value: string): Promise<string>
  compare(value: string, hash: string): Promise<boolean>
}
