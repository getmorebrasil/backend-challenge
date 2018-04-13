var request = require('request');

request('http://localhost:3000', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// request.post(
//     'http://localhost:3000',
//     { json: { key: 'value' } },
//     function (error, response, body) {
//     	console.log('error:', error); // Print the error if one occurred
//   		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   		console.log('body:', body); // Print the HTML for the Google homepage.
//     }
// );

// request('http://localhost:3000/1', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


