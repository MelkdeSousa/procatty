import crypto from 'crypto'

import { IProfessionalProps, Professional } from './professional'

describe('Professional entity', () => {
  it('should throw an error that professional reported an invalid email', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk',
      phone: '91986043359'
    }

    const id = crypto.randomUUID()

    const assert = () => new Professional(id, props)

    const expected = { key: 'email', message: 'email is invalid' }

    expect(assert().errors.get('email')).toMatchObject(expected)
  })

  it('should throw an error that professional reported an invalid phone', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk@gmail.com',
      phone: '(91) 98604-335'
    }

    const id = crypto.randomUUID()

    const assert = () => new Professional(id, props)

    const expected = { key: 'phone', message: 'phone is invalid' }

    expect(assert().errors.get('phone')).toMatchObject(expected)
  })

  it('should be instantiate a valid professional', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk@gmail.com',
      phone: '(91) 98604-3359'
    }

    const id = crypto.randomUUID()

    const assert = () => new Professional(id, props)

    expect(assert()).toBeInstanceOf(Professional)
    expect(assert().valid).toBeTruthy()
  })
})
