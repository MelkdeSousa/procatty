import crypto from 'crypto'

import { IProfessionalProps, Professional } from './professional'

describe('Professional entity', () => {
  it('deve lançar um erro de que profissional informou um email inválido', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk',
      phone: '91986043359'
    }

    const assert = () => new Professional(props)

    const expected = 'email: email is invalid'

    expect(assert).toThrow(expected)
  })

  it('deve lançar um erro de que profissional informou um telefone inválido', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk@gmail.com',
      phone: '(91) 98604-335'
    }

    const assert = () => new Professional(props)

    const expected = 'phone: phone is invalid'

    expect(assert).toThrow(expected)
  })

  it('deve lançar um erro de que profissional têm id inválido', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk@gmail.com',
      phone: '(91) 98604-335'
    }
    const id = crypto.randomBytes(16).toString('hex')

    const assert = () => new Professional(props, id)

    const expected = 'id: id is invalid'

    expect(assert).toThrow(expected)
  })

  it('deve instanciar um profissional válido', () => {
    const props: IProfessionalProps = {
      name: 'Melk de Sousa',
      avatar: 'https://github.com/melkdesousa.png',
      bio: 'I am a professional',
      email: 'melk@gmail.com',
      phone: '(91) 98604-3359'
    }

    const id = crypto.randomUUID()

    const assert = () => new Professional(props, id)

    expect(assert()).toBeInstanceOf(Professional)
    expect(assert().isValid(props)).toBeTruthy()
  })
})
