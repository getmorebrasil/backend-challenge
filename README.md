# Desafio backend    

Você foi contratado para desenvolver uma API restful para o cadastro de lojas por lojistas. As rotas necessárias são as seguintes:

POST /stores - deverá poder cadastrar a loja com todos os seus atributos (exceto o id que o backend que deverá gerar);
GET /stores - deverá retornar as lojas cadastradas no servidor no seguinte formato:

| Nome do atributo | Tipo |
|------------------|------|
|name              |string|
|takeback          |number|
|image_blob        |blob  |

Exemplo de retorno de um json de lojas:

```json  
[
  { 
    "id":1,
    "name":"Ri Happy",
    "takeback":4.335500000000001,
    "image_blob":"data:image/png;base64,...",
  },
  {
    "id":2
    "name":"Havan",
    "takeback":3.575,
    "image_blob":"data:image/png;base64,...",
  },
  {
    "id":3
    "name":"Netshoes",
    "takeback":6.003,
    "image_blob":"data:image/png;base64,...",
  }
]
```


PUT /stores/:id - deverá poder alterar quaisquer dados de uma loja (exceto id);
DELETE /stores/:id - deverá poder deletar a loja do id especificado;
GET /stores/:id - deverá retornar todos os detalhes de uma lojas cadastrada com os seguintes atributos. 

| Nome do atributo | Tipo |
|------------------|------|
|name              |string|
|takeback          |number|
|rating            |number|
|url               |string|
|image_blob        |blob  |
|category          |array |

Exemplo do json de retorno com todos os atributos de uma loja:

```json
{
  "id": "1",
  "name": "Ri Happy",
  "takeback": 4.335500000000001,
  "rating": 4.9,
  "url": "https://www.rihappy.com.br/",
  "image_blob": "data:image/png;base64,...",
  "category": [
    "Moda e Acessórios",
    "Brinquedos e Jogos"
  ]
}
```

## Requisitos
Os requisitos são:
- Implementar todas as rotas descritas acima;
- Tratar todos os erros de validação dos dados;

## Requisitos adicionais
Esses requisitos não são obrigatórios:
- Suportar paginação nas lojas;
- Implementar persistência;

## Como começo?
Aqui vão as etapas:
- Faça um fork desse repositório;
- Crie uma Pull Request com seu código pronto;

## Tecnologias
Você poderá utilizar quaisquer tecnologias mobile para desenvolver, aqui vão algumas sugestões:
- Node.js;
- RoR;
- Django;
- Play;

## Requisitos para avaliação
- Uso do git (commits concisos, títulos auto-explicativos, etc);
- Boas práticas de programação (uso de padrões, nomes de identificadores, tamanho de funções, perfomance);
- Escolha de arquitetura (MVC, MVP, MVI, MVVC, VIPER, etc);
- Uso de bibliotecas para auxiliar o desenvolvimento;
- Uso de scripts (para execução do programa, otimização de imagens, etc);
