import crypto from 'crypto'

import { IAdminProps, Admin } from './admin'

describe('Admin entity', () => {
  it('should throw an error that admin reported an invalid email', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      email: 'melk',
      username: 'melkdesousa',
      password: '123456'
    }

    const assert = () => new Admin(props)

    const expected = 'email: email is invalid'

    expect(assert).toThrow(expected)
  })

  it('should throw an error that admin reported an invalid username be special characters ', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      email: 'melk@gmail.com',
      password: '123456',
      username: 'melk.de_sousa'
    }

    const assert = () => new Admin(props)

    const expected = 'username: username is invalid'

    expect(assert).toThrow(expected)
  })

  it('should throw an error that admin reported an invalid username be less than 6 characters ', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      email: 'melk@gmail.com',
      password: '123456',
      username: 'melk'
    }

    const assert = () => new Admin(props)

    const expected = 'username: username must have at least 6 characters'

    expect(assert).toThrow(expected)
  })

  it('should throw an error that admin have invalid id', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      username: 'melkdesousa',
      email: 'melk@gmail.com',
      password: '99wBInra0hgXQ1H'
    }

    const id = crypto.randomBytes(16).toString('hex')

    const assert = () => new Admin(props, id)

    const expected = 'id: id is invalid'

    expect(assert).toThrow(expected)
  })

  it('should be instantiate a valid admin', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      username: 'melkdesousa',
      email: 'melk@gmail.com',
      password: '99wBInra0hgXQ1H@'
    }

    const id = crypto.randomUUID()

    const assert = () => new Admin(props, id)

    expect(assert()).toBeInstanceOf(Admin)
    expect(assert().isValid(props)).toBeTruthy()
  })
})
