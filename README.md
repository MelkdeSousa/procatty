# Teste contratação Tiva

> Olá dev,
> Este teste prático é de caráter obrigatório para nosso processo
> de contratação, e tem como objetivo conseguir avaliar a
> capacidade de construção e organização do código.
> Bom trabalho! :thumbsup:

## Resumo do projeto

* Construir uma API para um catálogo de profissionais e consumir numa aplicação.
* Todo retorno deve ser em **JSON**.
* De preferência usar Rails, mas pode usar o framework de melhor domínio.
* Usar DB **MySQL** ou **PostgreSQL**.
* Incluir Documentação no README do Git (com instruções de instalação e de uso).

*Extras opcionais:*
    ****Usar Docker para facilitar teste.***
    **Consumir a API em uma aplicação (web ou mobile).*

## O projeto

### RF - 01

* Login de pessoas autorizadas para gerir a aplicação (Admins)
* Banco de dados já precisa vim populado com o primeiro Admin.
* Cadastro de admins só pode ser feito por outro admin.

### RF - 02

* CRUD de profissionais.
* ***Criar, editar e deletar somente com login Admin :warning:***
* Profissional tem os seguintes campos:
  * Nome
  * Descrição
  * Email
  * número de celular
  * Foto de perfil
* Exibir informações do profissional é aberto, deve retornar todos os dados no seguinte formato:

```JSON
{
    "name": "",
    "description": "",
    // ...
    "addresses": [{/*...*/},{/*...*/}],
    "available_schedules": [{/*...*/},{/*...*/}]
}
```

### RF - 03

* Cadastro de Endereços.
* Criar, editar e deletar somente com login Admin :warning:
* Um profissional pode ter vários endereços de atuação.
* Os campos de endereços são:
  * CEP,
  * Estado,
  * Cidade,
  * Bairro,
  * Rua,
  * Nº

### RF - 04

* Cadastro de Agenda
* ***Criar, editar e deletar somente com login Admin :warning:***
* Um profissional pode ter várias agendas.
* Os campos da agenda são:
  * data de início,
  * data de fim,
  * hora de início,
  * hora de fim,

### RF - 05

* Função agendar
* Qualquer um pode agendar com o profissional
* É preciso informar o nome, email, telefone para contato, dia agendado, hora de início e hora de fim.
* Não pode permitir que tenham dois agendamentos no mesmo horário.
* *Opcional: Disparar email para o profissional avisando que houve um novo agendamento*
* *Opcional: Integrar com Google Calendário.*

### RF - 06

* Função consultar agenda
* *Somente com login Admin* :warning:
* Retorna todos os agendamento do profissional
