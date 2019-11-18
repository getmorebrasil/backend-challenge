var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Configura para ler dados do POST por form e json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var categories = [];

//configura uma rota raiz
app.get('/', function (req, res) {
    res.send("Desafio Backend - Franck - GetMore")
});

//recebe uma única categoria e registrá-la
app.post('/categories', function (req, res) {
    var existChild = 0;
    notExist  = false ;

    
    req.body.childrenIds.forEach(childId=>{
     categories.forEach(elementCat => {
         if(childId == elementCat.id){
           existChild++;
         }

     })
    })
    if(existChild <req.body.childrenIds.length){
        notExist =true;
    }
    if (notExist) {

        res.send(
            {
                "ok": false,
                "error": "InvalidCategories",
            }
        )


    } else {
        categories.push(req.body);
        console.log(categories);
        res.send({ "ok": true }) 
    }
  
});
//  retorna uma lista com todas as categorias registradas
app.get('/categories', function (req, res) {
  if(categories.length == 0){
   
      console.log("Não existe ainda nenhuma categoria, favor crie categorias via post");
      res.send({
        "ok": false,
        "error": "Não existe ainda nenhuma categoria, favor crie categorias via post"
    })
  }else{
    res.send(categories);
  }
    

});
// retorna os dados da categoria com o id passado.
app.get('/categories/:id', function (req, res) {
    
    let id = req.params.id;
    var achou = false;
    var ItemId;

    if (categories.length==0){
        console.log("Não existe ainda nenhuma categoria, favor crie categorias via post");
        res.send({
          "ok": false,
          "error": "Não existe ainda nenhuma categoria, favor crie categorias via post"
      }) 
    }else{
        categories.forEach(item => {

            if (item.id == id) {
                achou = true;
                ItemId = item;
                console.log(item); 
    
            }
        })
    
        if (achou) {
            
            res.send(ItemId);
        } else {
            res.send({
                "ok": false,
                "error": "InvalidID"
            })
        } 
       
    }


});

//inicia um servidor
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port;
    console.log("Servidor iniciado em http://localhost:3000", host, port);

});