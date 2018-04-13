# Desafio backend
 
Você deve desenvolver uma API HTTP para registro e obtenção de categorias.

As categorias formam uma árvore, onde cada categoria aponta para seu pai.

Exemplo:
```
- Moda
  - Feminino
    - Roupas
  - Masculino
    - Roupas
- Informática
  - Notebooks
  - Tablets
```
Esse é o esquema de uma categoria:

| Nome do atributo | Tipo          | Comentário                                                                                      |
|------------------|---------------|-------------------------------------------------------------------------------------------------|
| id               | `number`        | Identificador único da categoria                                                                |
| name             | `string`        | Nome da categoria                                                                               |
| childrenIds      | `Array<number>` | Lista de ids dos filhos da categoria. É uma lista vazia se a categoria é folha (não tem filhos) |
 
## POST /categories
A rota POST /categories deve receber uma única categoria e registrá-la. 
Segue um exemplo de requisições criando a árvore "Moda":
#### 1. Cria a categoria de roupas masculinas
```json
Requisição:
POST /categories
{
  "id": 300,
  "name": "Roupas",
  "childrenIds": []
}
Resposta:
{
  "ok": true
}
```
#### 2. Cria a categoria de roupas femininas
```json
POST /categories
{
  "id": 301,
  "name": "Roupas",
  "childrenIds": []
}

Resposta:
{
  "ok": true
}
```
#### 3. Cria a categoria de moda masculina
```json
Requisição:
POST /categories
{
  "id": 200,
  "name": "Masculina",
  "childrenIds": [300],
}

Resposta:
{
  "ok": true
}
```
#### 4. Cria a categoria de moda feminina
```json
Requisição:
POST /categories
{
  "id": 201,
  "name": "Feminina",
  "childrenIds": [301]
}

Resposta:
{
  "ok": true
}
```
#### 5. Cria a categoria de moda
```json
Requisição:
POST /categories
{
  "id": 100,
  "name": "Moda",
  "childrenIds": [200, 201]
}

Resposta:
{
  "ok": true
}
```

## GET /categories
A rota `GET/categories` deve retornar uma lista com todas as categorias registradas.
Exemplo:
```json
Requisição:
GET /categories/1

Resposta:
[
  {
    "id": 1,
    "name": "Moda", 
    "childrenIds": [200, 201]
  },
  {
    "id": 201,
    "name": "Feminina",
    "childrenIds": [301]
  },
  ...
]
```

## GET /categories/:id
A rota `GET /categories/:id` deve retornar os dados da categoria com o `id` passado.
Exemplo:
```json
Requisição:
GET /categories/1

Resposta:
{
  "id": 1,
  "name": "Moda", 
  "childrenIds": [200, 201]
}
```
# Observação importante
Note que ao criar a árvore das categorias de moda, nós criamos as categorias em
reverso (começando nas categorias mais internas).
Se uma categoria for criada com ids de filhos que não existem, o backend deveria
apontar um erro. No exemplo a seguir, as categorias 202 e 203 não existem e a
resposta aponta o erro:
```json
Requisição:
POST /categories
{
  "id": 2,
  "name": "Categoria exemplo",
  "childrenIds": [200, 201, 202, 203]
}

Resposta:
{
  "ok": false,
  "error": "InvalidCategories"
}
```
# Requisitos
Os requisitos são:
- Implementar todas as rotas descritas acima;
- Tratar todos os erros de validação dos dados;
- Implementar persistência;
# Requisitos adicionais
Esses requisitos não são obrigatórios:
- Suportar paginação no `GET /categories`;
# Como começo?
Aqui vão as etapas:
- Faça um fork desse repositório;
- Crie uma Pull Request com sua fork
# Tecnologias
Você pode utilizar qualquer linguagem/framework para desenvolver o servidor. Aqui vão algumas sugestões:

- Node.js (Express, Koa, etc)
- Ruby (Rails, Sinatra, etc.)
- Python (Django, Flask, etc.)
- Scala (Play, http4s, Scalatra, etc.)
- qualquer outra linguagem :)

# Requisitos para avaliação
- Bom uso do git (commits concisos, [boas mensagens de commit](https://github.com/erlang/otp/wiki/writing-good-commit-messages), etc)
- Boas práticas de programação (nomes de variáveis, tamanho de funções, perfomance)
- Código bem organizado e com uma boa arquitetura
- Uso de bibliotecas para auxiliar o desenvolvimento
