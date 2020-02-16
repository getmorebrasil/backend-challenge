var request = require('request');

const route = 'http://localhost:3002/categories';

function categoriesPost (id, name) {
    request.post(route, { json: {id: id, name: name } },
        function (err, res, json) {
            console.log('Testing POST /categories:');
            console.log('StatusCode:', res.statusCode);
            console.log('Json:', json);
        }
    )
}

function categories () {
    request(route, function (err, res, json) {
        console.log('Testing GET /categories:');
        console.log('StatusCode:', res.statusCode);
        console.log('Json:', json);
    })
  }
  
function categoriesId (id) {
    request((route + '/' + id), function (err, res, json) {
        console.log('Testing GET /categories/:id:');
        console.log('StatusCode:', res.statusCode);
        console.log('Json:', json);
    })
}
    
categoriesPost(201, 'ModaMasculina');

categories();
categoriesId (200);