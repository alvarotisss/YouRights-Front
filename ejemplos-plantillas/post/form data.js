//   https://www.youtube.com/watch?v=gL8M9Sl5QLs
//   https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

//Sending Data to the Server using Fetch()
//using jsonplaceholder for the data
//GET - queryStrings
// http://jsonplaceholder.typicode.com/posts?userId=1&postId=65
// http://jsonplaceholder.typicode.com/todos?userId=2
//POST
// http://jsonplaceholder.typicode.com/posts  

//  http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create
//  http://jsonplaceholder.typicode.com/

const root = 'http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create';
let uri = root;

let formdata = new FormData();
formdata.append("userId", 3);
formdata.append('title','This is my title');
formdata.append('body','This is the body text of the post');

var arr = [
    {
        "home_id": "1",
        "price": "925",
        "sqft": "1100",
        "num_of_beds": "2",
        "num_of_baths": "2.0",
    }, 
    {
        "home_id": "2",
        "price": "1425",
        "sqft": "1900",
        "num_of_beds": "4",
        "num_of_baths": "2.5",
}];


let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json",
      },
    body: arr
}
let req = new Request(root, options);

fetch(req)
.then(response => response.json())
    .then( (j) =>{
        console.log(j);
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });
