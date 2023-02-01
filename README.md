# API_REST_NODE_MongoDB

Api rest com vários cruds atrelado a plataforma, on line, do mongodb:
https://www.mongodb.com/atlas/database

### No terminal:

- Antes de inciar o projeto faça: "npm i" para baixar todas as dependencias e inicie a aplicação com: "npm run dev"
- Na pasta loaders/mongodb.ts, é preciso colocar o link das suas tabelas na plataforma online do mongodb

Esta é uma construção RESTful API que permite:

- Cadastrar Usuário
- Fazer Login

### A partir destas daqui todas as funções devem ser feitas logado

- Adicionar um cliente
- Listar todos os clientes
- Listar cliente pelo seu ID
- Editar informações do cliente
- Remover um cliente

**Importante: Lembre-se sempre que cada usuário só pode ver e manipular os se estiver logado. Não atender a este pré-requisito retornarar uma mensagem {message: "User not authorization!"} **

\*\*Importante 2: A pasta node_modules tem que esta presente no projeto. Execute 'npm i' para instalar todas as dependencias. Para iniciar a aplicação digite o comando "npm run dev".

**Importante 3: Esta api, sempre que uma requisição falhar, responderá com código de erro e mensagem adequada à situação**

**Exemplo:**

```javascript
// Quando tenta fazer requisição de cadastro com nome de usuário repetido retornara:
// HTTP Status 400
{
    "mensagem": "This username already exists!"
}
```

## **Banco de dados**

O Banco de Dados MongeDB está hospedado online na plataforma https://www.mongodb.com/ e já está devidamente logada e atrelada a api:  
**ATENÇÃO! Os nomes das tabelas e das colunas que foram criados estão listados abaixo.**

- id: ObjectId,
- username: String,
- email: String,
- password: String,
- phone: String,
- cpf:String,
- street: String,
- number: String,
- city: String,
- country: String

## **Status Codes**

Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/sign`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - username
  - email
  - password

- **Resposta**  
   Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta o conteúdo do usuário cadastrado
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /sign
{
    "usernam": "claudioares",
    "email": "claudio@ares.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "nome": "claudioares",
    "email": "claudio@ares.com"
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - username
  - senha

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com as propriedades **token** que deverá possuir como valor o token de autenticação gerado e uma propriedade **usuario** que deverá possuir as informações do usuário autenticado, exceto a senha do usuário.  
   Em caso de **falha na validação**, a resposta possuirá **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - email
  - password

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "claudio@ares.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"_id": "63bb2ea7ca0a71bcd611f9fc",
	"userName": "claudioares",
	"emailUser": "claudio@ares.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmIyZWE3Y2EwYTcxYmNkNjExZjlmYyIsImlhdCI6MTY3MzIxOTA5MSwiZXhwIjoxNjczMjQ3ODkxfQ.sUz0WwVhUoaJbF6O453bnmqHratGLLlqzQ0Q9yO9dcM"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "messagem": "Failed validetion!"
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigi o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado

---

### **Adicionar usuário**

#### `POST` `/addclient`

Essa é a rota que será chamada quando o usuario quiser adicionar um novo cliente logado em seu perfil.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo da requisição.
- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o cliente a ser adicionado ao banco de dado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.
  {
  "name":"Maria eduarda",
  "email": "mary@duda.com",
  "phone": "9892356458",
  "street": "João Nogueira",
  "number": "1343",
  "cpf": "000000000000",
  "city": "Pinhas",
  "country" : "Pernambuco"
  }
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### **Exemplo de resposta**

    {
    	"message": "Internal failure!"
    }

### **Detalhar usuário**

#### `GET` `/listing`

Essa é a rota que será chamada quando o usuario quiser obter os dados dos usuários.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo da requisição.
  - **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa todos usuários encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.

### **Detalhar um usuário específico**

#### `GET` `/listing/:id`

Essa é a rota que será chamada quando o usuario quiser obter os dados de um usuário expecífico.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
   Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    _id: "63b8178003cc104cdd5fc59d",
    username: "desafiosharenergy",
    email: "desafio@sharenergy.com",
    password: "$2b$10$uqfdGtGo5ssHEXRUdeWiEeQF2CXLON97DaMDJi015TK7LPnR78IL2",
    __v: 0,
    city: "Pinheiro",
    country: "Maranhão",
    cpf: "000.000.000-00",
    number: "596",
    phone: "(98)99158-6420",
    street: "Rua José Bonifácio",
  },
  {
    _id: "63ba31fcd870ad800f09c295",
    username: "claus_Ares",
    email: "claus@claus.com",
    phone: "(98)99158-6420",
    cpf: "041.200.973-07",
    street: "Rua José Bonifácio",
    number: "596",
    city: "Pinheiro",
    country: "Maranhão",
    __v: 0,
  },
  {
    _id: "63bb2d39ca0a71bcd611f9f4",
    username: "Fer_pessoa",
    email: "fernando@pessoa.com",
    password: "$2b$10$enmYd.hl7VHRrjYb1eK7.OUcPun2mAcvjL5hiAPNmYX1.U5p76HCu",
    __v: 0,
  },
  {
    _id: "63bb2ea7ca0a71bcd611f9fc",
    username: "jonMars",
    email: "jhon@mars.com",
    password: "$2b$10$h.cnSf2maTL8TcKD5sE0OuQmu7j7vDgnOYD/KX2VUWaDlIdHdUI5S",
    __v: 0,
  },
];
```

### **Atualizar usuário**

#### `PUT` `/update/:id`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no perfil de algum cliente.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Resposta**  
   Em caso de **sucesso**, será enviar conteúdo no corpo (body) da resposta.  
   Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

### **Excluir transação do usuário logado**

#### `DELETE` `/delete/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir um cliente.  
.

- **Requisição**  
   Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
   O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
   Em caso de **sucesso**, haverá conteúdo no corpo (body) da resposta como exemplo abaixo.  
   Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

.

#### **Exemplo de requisição**

```javascript
// DELETE /delete/63bb2d39ca0a71bcd611f9f4
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// {
	"message": "User deleted"
   }
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"message": "User does not exists"
}
```
