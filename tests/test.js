var request = require('request');

const route = 'http://localhost:3003/categories';

function categoriesPost (id, name, childrenId) {
    request.post(route, { json: {id: id, name: name, childrenId: childrenId } },
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
    
categoriesPost(215, 'ModaMasculina', 214);

categories();
categoriesId(210);