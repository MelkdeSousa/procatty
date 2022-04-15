export interface ICreateAdminDTOInput {
  name: string
  email: string
  password: string
  username: string
  avatar?: string
}

export interface ICreateAdminDTOOutput {
  success: boolean
  message_error?: string
}
