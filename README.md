# Desafio Back End

## Overview da Solução

API RESTful implementada utilizando Java com Spring Boot, com rotas POST e GET.

Persistência implementada com MySQL, utilizando Hibernate e JPA para fazer a conexão da api com o MySQL.

Para a validação dos dados foram criados custom validators que validam os atributos(id, name e childrenIds).

## Utilizando a API

### api testada utilizando as configurações abaixo.

>- Servidor Apache Tomcat 9
>- Java 1.8
>- Windows 10 e 7
>- Apache Maven 3.5.2
>- [Restlet Client](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm?hl=en) REST API Testing Chrome Extension

### 1. Modifique o arquivo "~/Challenge/src/main/resources/application.properties" como abaixo.

No campo ```spring.datasource.url``` coloque ```=jdbc:mysql://localhost:<porta do banco>/desafiobackend?useSSL=false```.

Nos campos ```spring.datasource.username``` e ```spring.datasource.password``` coloque o **usuário** e **senha** do banco.

### 2. Inicie o *Tomcat* e abra o *Prompt de Comando* e faça o seguinte.

* Dê cd até a pasta "~/Challenge/"

* Digite ```mvn spring-boot:run``` e espere, a última mensagem de log deverá ser algo parecido com *: Started Application in .x seconds (JVM running for .y)*

### 3. POST Request

* Abra o Restlet Client Tester e em METHOD escolha *POST*

* Na URL coloque ```http://localhost:{porta do Tomcat}/categories```

* No campo Body digite o texto no formato JSON como abaixo
```json
{
"id": 3,
"name": "Teste",
"childrenIds":[1, 2]
}
```

* Clique no botão *Send* ao lado da URL, a API retornará o objeto categoria e o código Http 200(Ok)

### 4. GET Request

#### GET sem parâmetros

*Você pode utilizar o Restlet Client ou o próprio navegador para a rota GET*

##### Caso esteja usando o Restlet Client: 

* Em METHOD escolha *GET* e na URL coloque ```http://localhost:{porta do Tomcat}/categories```

* Aperte *Send*

##### Caso esteja usando o próprio navegador:

* Na URL coloque ```http://localhost:{porta do Tomcat}/categories``` e dê enter

O resultado deverá ser da seguinte forma.

```json
[ {
  "id" : 1,
  "name" : "Teste",
  "childrenIds" : [ ]
}, {
  "id" : 2,
  "name" : "Teste",
  "childrenIds" : [ 1 ]
}, {
  "id" : 3,
  "name" : "Teste",
  "childrenIds" : [ 1, 2 ]
} ]
```

#### GET com parâmetros (id)

* Faça o mesmo que na rota sem parâmetros porém na URL coloque:

```http://localhost:{porta do Tomcat}/categories/{id}```

Exemplo: ```http://localhost:8080/categories/3```

## Entendo os erros de validação

Caso um atributo seja invalidado pela api, ela retornará código 400, não efetuará nenhum movimento no banco de dados e retornará um objeto
como o que se encontra abaixo.

```
{
"timestamp": "2018-05-18T19:32:14.878+0000",                            -> Data/hora do erro
"status": 400,                                                          -> Código Http
"error": "Bad Request",                                                 -> Erro Http
"errors":[
  {
    "codes":["IdConstraint.category.id", "IdConstraint.id", ...],       -> Códigos dos erros
    "arguments":[{"codes":["category.id", "id" ], ...}],                -> Argumentos
    "defaultMessage": "Invalid id",                                     -> Mensagem padrão soltada quando o id é inválido, neste caso
    "objectName": "category",                                           -> Objeto que teve atributos inválidos
    "field": "id",                                                      -> Atributo que foi invalidado
    "rejectedValue": 3,                                                 -> Valor do atributo que foi invalidado
    "bindingFailure": false,                                                                      
    "code": "IdConstraint"                                              -> Restrição no id neste caso
  }
],
"message": "Validation failed for object='category'. Error count: 1",   -> Mensagem, neste caso a validação falhou para o objeto category     
"path": "/categories"                                                   -> Caminho
}
```
