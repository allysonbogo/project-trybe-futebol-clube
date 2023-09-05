# Trybe Futebol Clube
#### _by [Allyson Belli Bogo](https://www.linkedin.com/in/allysonbogo/)_

## :page_with_curl: Sobre

O Trybe Futebol Clube (TFC) é um projeto de desenvolvimento de uma API RESTful para um site informativo de partidas e classificações de times de futebol. Como parte da proposta, foi construída uma API usando a metodologia Test-Driven Development (TDD) e a integração de aplicativos com docker-compose, garantindo uma operação rápida, consistente e conectada ao banco de dados.

O objetivo principal foi criar um back-end dockerizado com modelagem de dados utilizando TypeScript, MySQL e Sequelize, seguindo rigorosamente as regras de negócio estabelecidas e deixando a API pronta para ser consumida pelo front-end já existente. Foram estabelecidos relacionamentos entre as tabelas "teams" e "matches" para atualizações simultâneas das tabelas de partidas e classificações.


## 🛠️ Ferramentas Utilizadas

* Docker
* Node.js
* TypeScript
* MySQL
* Mocha.js
* Chai.js
* Sinon.js


## ⚙️ Como Executar

> :warning: &nbsp; _É necessário ter o Docker instalado para executar este projeto_

<details>
  <summary> Passo a passo </summary>
  <br>

1. Clone o repositório em uma pasta de preferência

```
git clone git@github.com:allysonbogo/project-trybe-futebol-clube.git
```
2. Entre na pasta raíz do projeto e instale todas as dependências

```
npm run install:apps
```
3. Para rodar o projeto é necessario executar o comando abaixo no diretório raiz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível

```
npm run compose:up
```
4. O servidor será inicializado juntamente com a orquestração do docker. Para visualização da interface da API podem ser utilizados o Thunder Client, Postman, Insomnia ou alguma outra ferramenta de sua preferência

5. A interface de usuário também será inicializada com a orquestação dos containers docker e estará disponível no endereço abaixo

```
http://localhost:3000/
```

5. Para testar o projeto entre na pasta <code>app/backend/</code> e execute os scripts abaixo

```
npm test
```
```
npm run test:coverage
```
</details>


## 📚 Documentação (endpoints)


### :bust_in_silhouette: Login
<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `POST` | Realiza o login de uma pessoa usuária cadastrada | `http://localhost:3001/login`

  <details>
    <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

    {
      "email": "string",
      "password": "string"
    }
  
  </details>

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }

  > :warning: &nbsp; _O token acima é fictício, o token verdadeiro é gerado a partir da ferramenta JWT (JSON Web Token), utilizando uma palavra-passe e um payload secretos_
  </details>

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - A rota retorna um erro <code>400</code> <code>{ "message": "All fields must be filled" }</code>, caso a requisição não receba todos os campos devidamente preenchidos; <br>
    - A rota retorna um erro <code>401</code> <code>{ "message": "Invalid email or password" }</code>, caso a requisição receba um par de <code>email</code> e <code>password</code> inválidos ou não cadastrados no banco de dados, sendo que o campo <code>password</code> deve ter no mínimo 6 caracteres; <br>
  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna o papel da pessoa usuária | `http://localhost:3001/login/role`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    { "role": "admin" }

  </details>
  <br>
</details>


### :coin: Token
<details>
  <summary> Autenticação </summary>
  <br>

  > :warning: &nbsp; _Após o login de uma pessoa usuária cadastrada, é gerado um <code>token</code> aleatório, o qual será autenticado em todas as rotas a seguir, exceto nas rotas GET_

  <details>
    <summary> As requisições irão falhar nos seguintes casos: </summary>
    - É disparado o erro <code>401</code> <code>{ "message": "Token not found" }</code>, ao fazer uma operação sem um token; <br>
    - É disparado o erro <code>401</code> <code>{ "message": "Token must be a valid token" }</code>, ao fazer uma operação com um token expirado ou inválido; <br>
  </details>
  <br>
</details>


### :soccer: Teams
<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma lista de times cadastrados | `http://localhost:3001/teams`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "id": 1,
        "teamName": "Bulbasaur"
      },
      ...
    ]

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna um time a partir do id | `http://localhost:3001/teams/:id`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    {
      "id": 4,
      "teamName": "Charmander"
    }

  </details>

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - É disparado o erro <code>404</code> <code>{ message: "Team {id} not found" }</code>, caso o time não esteja cadastrado no banco de dados; <br>
  </details>
  <br>
</details>


### :crossed_flags: Matches

<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma lista de partidas cadastradas | `http://localhost:3001/matches`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
      ...
    ]

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma lista de partidas em andamento | `http://localhost:3001/matches?inProgress=true`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      ...
    ]

  </details>
  <br>


  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma lista de partidas finalizadas | `http://localhost:3001/matches?inProgress=false`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      ...
    ]

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `PATCH` | Finaliza uma partida em andamento | `http://localhost:3001/matches/:id/finish`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    { "message": "Finished" }

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `PATCH` | Atualiza o resultado de uma partida | `http://localhost:3001/matches/:id`

  <details>
    <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>
    
    {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }

  </details>

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    }

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `POST` | Realiza o cadastro de uma partida | `http://localhost:3001/matches`

  <details>
    <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

    {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }

  </details>

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 201</code>: </summary>

    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    }

  </details>

  <details>
    <summary> A requisição irá falhar nos seguintes casos: </summary>
    - A rota retorna um erro <code>422</code> <code>{ "message": "It is not possible to create a match with two equal teams" }</code> ao tentar cadastrar uma partida com os campos <code>homeTeam</code> e <code>awayTeam</code> iguais; <br>
    - A rota retorna um erro <code>404</code> <code>{ "message": "There is no team with such id!" }</code>ao tentar cadastrar uma partida com um time que não exista no banco de dados; <br>
  </details>
  <br>
</details>


### :trophy: Leaderboard

<details>
  <summary> Rotas </summary>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma tabela de desempenho dos times da casa | `http://localhost:3001/leaderboard/home`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      {
        "name": "Palmeiras",
        "totalPoints": 7,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 10,
        "goalsOwn": 5,
        "goalsBalance": 5,
        "efficiency": "77.78"
      },
      ...
    ]

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma tabela de desempenho dos times visitantes | `http://localhost:3001/leaderboard/away`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": "100.00"
      },
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
        "goalsBalance": 4,
        "efficiency": "66.67"
      },
      ...
    ]

  </details>
  <br>

  | Método | Funcionalidade | URL |
  |---|---|---|
  | `GET` | Retorna uma tabela de classificação geral dos times | `http://localhost:3001/leaderboard`

  <details>
    <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
    
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      ...
    ]

  </details>
  <br>
</details>
<br>
