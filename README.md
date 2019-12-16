# Desafio backend
 
## Overview:
The project intent is just to handle two get requests where:
- **GET/category** -/ *pull response of all categories registered*
- **GET/category/:id** -/ *pull response of only the category with the ID expressed by requisition parameter ID: "/:id"*

- **POST/category/masculino**:
    *push a **"roupa masculina"** json format to the server side in order to store that information in database*
    
- **POST/category/feminino**
    *push a **"roupa feminina"** json format to the server side in order to store that information in database*
    
- **POST/category/modamasc**
    *push a **"moda masculina"** json format to the server side in order to store that information in database*
    
- **POST/category/modafem**
    *push a **"moda feminina"** json format to the server side in order to store that information in database*
    
- **POST/category/moda**
    *push a **"moda"** json format to the server side in order to store that information in database*

# Tecnologies

- Node
- Express
- Yup
- Sequelize ORM
- Postgre
- Docker

# The project was designed with the following dependencies:

```
  "dependencies": {
    "bcryptjs": "^2.4.3", //already for authentication
    "cors": "^2.8.5", //Security for get and post routes
    "express": "^4.17.1", //node routing lib
    "helmet": "^3.21.2", //Security for get and post routes
    "pg": "^7.12.1", //Dependencie for Sequelize
    "pg-hstore": "^2.3.3", // another Dependencie for Sequelize
    "sequelize": "^5.21.3", //ORM for POSTGRES
    "yup": "^0.27.0" //for schemas
  },
  "devDependencies": {
    "eslint": "^6.3.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-config-prettier": "^6.1.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-prettier": "^3.1.0",
    "nodemon": "^1.19.1",
    "prettier": "^1.18.2",
    "sequelize-cli": "^5.5.1",
    "sucrase": "^3.10.1"
  }
}
```
# implementation
## Requirements
- Docker
- PostgreSQL (^9.4)
- Insomnia (OPTIONAL)
- Install the dependencies above

### 1. 
 **Create a container to redirect postgres PORT**
 **_docker run --name getmore -e POSTGRES_PASSWORD=getmore -p 5432:5432 -d postgres_**
### 2.
 **Create connection in postgres with**:
 Host: localhost
 Port: 5432
 Username: postgres
 password: getmore
 
### 3.
 **instal dependencies with yarn or npm**
 
### 4.
 **pull repository and command yarn dev**
 
# Code review
## Post categories
Let's comment out how I did it:
In first sight I though that the posts would receive unique JSON,
but then I realize that it must have some relationship N:N between the childs,

The first Issue is that in relational database the array don't support foreign keys
to relate it's child to another table, so I made in a different way I think it's more easy
to get categories by using only javascript algorithms.

## Let's go the restritions of posts
the post requests restritions I made with Yup, a lib to create schemas
that come via creating sequelize model instances from JSON requests.

# Roupas
The format of "roupas masculinas" and "roupas femininas" is:
```
{
  "id": 300,
  "name": "Camisa sextou",
  "childrenIds": []
}
```
I set:
- min and max value for ID (299, 400)
- Id is required
- name is required
- children_ids allow null
```
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(299).lessThan(400).required(),
      name: Yup.string().required(),
      children_ids: Yup.array()
    });

    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }
```
# Modas de roupas
### The format of "moda masculina" and "moda feminina" is:
```
{
  "id": 200,
  "name": "Teen",
  "childrenIds": [300, 301]
}
```
#### I set:
- min and max value for ID (199, 300)
- Id is required
- name is required
- children_ids must not be null
- children_ids required at least (1 char)
```
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(199).lessThan(300).required(),
      name: Yup.string().required(),
      children_ids: Yup.array().required().min(1)
    });


    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }
```
### the validation for children IDS is: 
```
const { children_ids } = req.body;

    //check if childrens exists
    const hasValidChildren = await Categories[0].findAll({
      where: {
        id: children_ids
      }
    })

    if (hasValidChildren.length !== children_ids.length) {
      return res.status(401).json({
        ok: false,
        error: "InvalidCategories"
      })
    }

    try { const modamasc = await Categories[2].create(req.body) }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
```
the array above Categories[2] is the model index, 
the algorithm is checking if the number of instances matched 
with children_ids is strictly equal to the self children_ids of the request


# Requisitos
Os requisitos são:
- Implementar todas as rotas descritas acima;  👌😀👍
- Tratar todos os erros de validação dos dados; 👌😀👍
- Implementar persistência; 👌😀👍
# Requisitos adicionais
Esses requisitos não são obrigatórios:
- Suportar paginação no `GET /categories`; 👌😀👍
# Como começo?
Aqui vão as etapas:
- Faça um fork desse repositório; 👌😀👍
- Crie uma Pull Request com sua fork 👌😀👍

