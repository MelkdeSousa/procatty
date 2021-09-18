# Procatty API

> Uma api para facilitar a administração de agendamento de profissionais

## Tecnologias

- NodeJS
- Prisma ORM
- Docker / Docker Compose
- PostgreSQL
- Typescript

## Instalação

### Requisitos

- Instalados
  - Docker
  - Docker Compose
  - NodeJS
  - NPM / Yarn

- Clone o repositório

  ```bash
  git clone https://melk_de_sousa@bitbucket.org/melk_de_sousa/procatty.git
  ```

- Crie uma cópia do arquivo `.env.example` com o nome `.env` e preencha as variáveis de ambiente

  ```bash
  cp .env.example .env
  ```

- Instale as dependências

  ```bash
  npm install
  # ou
  yarn
  ```

- Execute os containers do banco de dados e da aplicação

  ```bash
  npm run docker:up
  # ou
  yarn docker:up
  ```

- A aplicação estará em execução: `http://localhost:3333/`

## Endpoints

- URL Base: `http://localhost:3333/api/v1`

- Significado dos métodos:
  - GET: Listagem de todas informações do recurso
  - POST: Cria um novo recurso
  - PUT: Atualiza um recurso
  - DELETE: Exclui um recurso

- Símbolos:
  - 🛡️: Rota protegida, somente um Admin com token pode acessar
    - *Header*:

        ```plain
        Authorization: Bearer [jwt-token]
        ```

  - 📢: Rota pública, qualquer pessoa pode acessar

- Recursos:

  - *Profissional*: `/professional`
    - 📢 GET: Lista todos os profissionais
    - 🛡️ POST: Criar um novo profissional
      - *Body* em *JSON*:

          ```json
          {
            "name": "string",
            "description": "string",
            "email": "string",
            "phone": "string",
            "avatar": "string"
          }
          ```

    - 📢 POST `/:id/schedule`: Agendamento com profissional com *id* informado
      - *Body* em *JSON*:

        ```json
        {
          "name": "string",
          "email": "string",
          "telephone": "string",
          "start_date_time": "string", // mm/dd/yyyy hh:mm
          "end_date_time": "string"   // mm/dd/yyyy hh:mm
        }
        ```

    - 🛡️ PUT: Atualiza um profissional
      - *Body* em *JSON*:

        ```json
        {
          "professional_id": "string",   // (uuid)
          "name": "string",
          "description": "string",
          "email": "string",
          "phone": "string",
          "avatar": "string"
        }
        ```

    - 🛡️ DELETE `/:id`: Exclui o profissional com o *id*

  - *Available Schedule*: `/available-schedule`
    - 📢 GET: Lista todos os horários disponíveis de cada profissional
    - 🛡️ POST: Criar um novo horário disponível de para um profissional
      - *Body* em *JSON*:

        ```json
        {
          "professional_id": "string",
          "start_date_time": "string", // mm/dd/yyyy hh:mm
          "end_date_time": "string"   // mm/dd/yyyy hh:mm
        }
        ```

    - 🛡️ PUT: Atualiza um horário
      - *Body* em *JSON*:

        ```json
        {
          "id": "string",   // (uuid)
          "start_date_time": "string", // mm/dd/yyyy hh:mm
          "end_date_time": "string"   // mm/dd/yyyy hh:mm
        }
        ```

    - 🛡️ DELETE `/:id`: Exclui um horário disponível com o *id*

  - *Admin*: `/admin`
    - 🛡️ POST: Criar um novo admin
      - *Body* em *JSON*:

          ```json
          {
            "email": "string",
            "name": "string",
            "username": "string",
            "password": "string"
          }
          ```

    - 🛡️ POST `/session`: Cria uma sessão para um admin
      - *Body* em *JSON*:

          ```json
          {
            "username": "string",
            "password": "string"
          }
          ```

  - *Address*: `/address`
    - 📢 GET: Lista todos os endereços
    - 🛡️ POST: Criar um novo endereço para um profissional

        ```json
        {
          "postal_code": "string",
          "state": "string",
          "city": "string",
          "district": "string",
          "street": "string",
          "number": number,
          "professional_id": "string"   // (uuid)
        }
        ```

    - 🛡️ PUT: Atualiza um endereço

        ```json
        {
          "id": "string",   // (uuid)
          "postal_code": "string",
          "state": "string",
          "city": "string",
          "district": "string",
          "street": "string",
          "number": number
        }
        ```

    - 🛡️ DELETE `/:id`: Exclui o profissional com o *id*
