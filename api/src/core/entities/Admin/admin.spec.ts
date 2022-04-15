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

    const id = crypto.randomUUID()

    const assert = () => new Admin(id, props)

    const expected = { key: 'email', message: 'email is invalid' }

    expect(assert().errors.get('email')).toMatchObject(expected)
  })

  it('should throw an error that admin reported an invalid username be special characters ', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      email: 'melk@gmail.com',
      password: '123456',
      username: 'melk.de_sousa'
    }

    const id = crypto.randomUUID()

    const assert = () => new Admin(id, props)

    const expected = { key: 'username', message: 'username is invalid' }

    expect(assert().errors.get('username')).toMatchObject(expected)
  })

  it('should throw an error that admin reported an invalid username be less than 6 characters ', () => {
    const props: IAdminProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      email: 'melk@gmail.com',
      password: '123456',
      username: 'melk'
    }

    const id = crypto.randomUUID()

    const assert = () => new Admin(id, props)

    const expected = { key: 'username', message: 'username must have at least 6 characters' }

    expect(assert().errors.get('username')).toMatchObject(expected)
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

    const assert = () => new Admin(id, props)

    expect(assert()).toBeInstanceOf(Admin)
    expect(assert().valid).toBeTruthy()
  })
})
