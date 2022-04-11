export interface IHashFunction {
  execute(value: string): Promise<string>
  compare(value: string, hash: string): Promise<boolean>
}
