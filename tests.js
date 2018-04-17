var request = require('request');

function getCategories() {
	request('http://localhost:3000/categories', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.
	});
}

function getCategoryById(id) {
	request(('http://localhost:3000/categories/'+id), function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.
	});
}

function post(categoryName, childrenArray) {
	request.post(
	    'http://localhost:3000/categories',
	    { json: { name: categoryName ,childrenIds: childrenArray } },
	    function (error, response, body) {
	    	console.log('error:', error); // Print the error if one occurred
	  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  		console.log('body:', body); // Print the HTML for the Google homepage.
	    }
	);
}

//call test function here



