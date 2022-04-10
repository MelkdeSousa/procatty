export interface ICommand<DTOInput, DTOOutput = void> {
  execute(dto: DTOInput): Promise<DTOOutput>
}
