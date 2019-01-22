# backend-challenge - GetMore


API com estrutura escalável para registro e leitura de Categorias em esquema de árvore com persistência em banco. 



### :bookmark_tabs: Requisitos

---

* npm [instalado corretamente](https://www.npmjs.com/get-npm)
* MongoDB [instalado corretamente](https://docs.mongodb.com/manual/installation/)
* TypeScript@2.3.4 [instalado corretamente](https://www.typescriptlang.org/index.html#download-links)
* Node.js@8.11.3 (or higher) [instalado corretamente](https://nodejs.org/en/download/package-manager/)


### :: 

---

Esquema modificado de uma categoria:

| Nome do atributo | Tipo          | Comentário                                                                                      |
|------------------|---------------|-------------------------------------------------------------------------------------------------|
| code             | `number       ` | código da categoria, assim como o id é um identificador único porém é de uso mais fácil ao usuário|
| name             | `string`        | Nome da categoria                                                                               |
| childrencodes    | `Array<number>` | Lista de códigos dos filhos da categoria. É uma lista vazia se a categoria é folha (não tem filhos) |
| *id              | `string`        | Identificador único da categoria contendo a string referente ao ObjectId do banco MongoDB (atribuido automaticamente pelo banco)                                                               |
| *childrenIds     | `Array<string>` | Lista de ids dos filhos da categoria. É uma lista vazia se a categoria é folha (não tem filhos) |
| *root            | `boolean      ` | determina se a categoria é raiz (não é "filho de ninguém") |
| *treeHeight      | `number`        | identifica a altura do nodo dentro da arvore |

###### *para uso interno da aplicação

### :package: Estrutura do Projeto

* **db: contém todos os managers, modelos e classes usados para operações no banco não-relacional MongoDB.**
        
* **events: esta pasta contém todas classes relacionadas a comunicação por eventos**
        
* **handler: nesta pasta estão os Handlers, classes que contém a parte lógica da aplicação, a ideia é cada módulo do sistema ter um handler**

* **interfaces: contém todas as interfaces usadas para melhor tipagem do projeto**

* **locale: contém mensagens do sistema**

* **rest: contém as classes usadas para requisições de serviços REST, a ideia é cada módulo ter "seu REST"**


* **test: aqui é o ambiente para teste das funcionalidades da aplicação usando chai-mocha interface**


#### :file_folder: db

* **managers**
    * _Basic Manager_ -> Classe com as operações básicas de acesso/escrita em banco. Utilizada para extender outras classes Manager
    * _Category_ -> Classe para operações de banco para o modelo Category
*  **model**
    * _BasicSchema_ -> Classe com atributos base para todos os modelos de documento do banco
    * _Category_ -> Classe onde é definida as propriedades/atributos do esquema Categoria. Extende BasisSchema  
* _Database_ -> Classe com as propriedas do banco de dados Mongo, utiliza da biblioteca mongoose
* _index_ -> index usado para importação e exportação dos managers

#### :fide_folder: events
* _Hub_ -> Classe utilizado para comunicação por eventos, funciona como um tipo de local por onde todos os eventos passam, utiliza do eventEmitter2 para "escutar" e "enviar" eventos
* _Message_ -> Classe Mensagem utilizado para enviar mensagens pelo HUB
* _Source_ -> Classe Source é utilizada para extender todas as demais classes, contém um identificador unico e o HUB.

#### :file_folder: handlers

* **util**
    * _BasicHandler_-> contém a lógica básica de um handler, por exemplo: funções de retorno. Utilizado para extender os outros handlers
    * _QueryObject_-> Classe utilizada para fornecer uma interface e facilitar operações de Query no banco. 
    * _UpdateObject_-> Classe utilizada para fornecer uma interface e facilitar operações de Update no banco.
    * _Util_-> Classe Util estática, contém operações de tratamento de errors que não constam no handler base
* _MainHandler_ -> Classe com a principal lógica da aplicação, extende a classe BasicHandler

#### :file_folder: interfaces

* _Category_ -> Interface para o modelo de Categoria usado
* _ManagerMap_ -> Interface que contém todos os managers para uso no index do db.
* _MessageData_ -> Interface para retorno de Mensagem pelo HUB.

#### :file_folder: locale

* **pt-Br/errors**

* _category.json_ JSON contendo os errors com mensagens e botões relacionados á categoria.

#### :file_folder: rest

* _BasicRest_ -> Classe com funções básicas de uma classe Rest, utilizada para extender.
* _index_ -> index contendo todos os RESTS, utilizado para importação/exportação
* _MainRest_ -> Rest principal da aplicação, faz o link entre o cliente e o handler (parte lógica da aplicação)

---

### :arrow_forward: Rodando a API
---
A API rodará baseado nos dados de backend-challeng/config.json (default: localhost:1337)

`git clone `

`npm install` then `tsc`

`node build/index.js`

### :art: Utilizando a API
---
Após rodar a API, o endpoint é `/api`, então faremos sempre a requisição no formato: `server/api/ROUTE` onde Route é a rota que desejamos

#### Criando Categorias

Método: **POST** - Rota: **/categories**
 * Para criar uma categoria, devemos enviar a URL /categories com um body contendo: Código da categoria, Nome, Categorias filhos devemos dizer se ela é raiz (root: true)
 * Caso ocorra algum erro, o erro será retornado no formato {title: string, description: string, buttons: object, type: string}. Buttons é um objeto contendo labels e possiveis ações a serem tomadas.
 
 
#### Lendo Todas as Categorias

Método: **GET** - Rota **/categories**
* Para ler todas as categorias, usamos a URL /categories sem precisar passar nada.
* Todas as Categorias serão retornadas aninhadas, isto é, as categorias "mais altas" são retornadas e dentro do seu array de childrenIds estarão as suas categorias filhas e assim por diante.


#### Lendo Categorias por código

Método: **GET** - Rota **/categories/:code**
* Para ler uma categoria pelo seu código, usamos a URL /categories/codigoCategoria.
* A categoria será então retornada e dentro do array de childrenIds estarão suas categorias filhas.

License [MIT](https://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT)