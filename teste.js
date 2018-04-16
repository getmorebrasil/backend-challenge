var request = require('request');

request('http://localhost:3000/categories', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// request.post(
//     'http://localhost:3000/categories',
//     { json: { name: 'value',childrenIds:[2] } },
//     function (error, response, body) {
//     	console.log('error:', error); // Print the error if one occurred
//   		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   		console.log('body:', body); // Print the HTML for the Google homepage.
//     }
// );

// request('http://localhost:3000/categories/1', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


