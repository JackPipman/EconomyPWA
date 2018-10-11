const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const express = require("express");
const serviceAccount = require("./moneypwa-firebase-adminsdk-3kv07-cf7facb549.json");

const databaseURL = "https://moneypwa.firebaseio.com";

const app = express();

//////////DATABASE


app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//////////////////Users

app.get("/users/:userEmail", (request, response) => {
fetch(databaseURL + '/users.json')
.then((res) => res.json())
.then((usersData) => {
  var result = [];
  for(var k in usersData) {
    if (usersData[k]['email'] === request.params.userEmail) {
      result.push(usersData[k]);
    }
  }
  return result;
}).then((data) => {
  response.send(data);
  return null;
}).catch(error => response.send(error));
});

app.post("/users", (request, response) => {
  var data = request.body;
  var id = 1;
  fetch(databaseURL + '/users.json')
  .then((res) => res.json())
  .then((usersData) => {
    for(var k in usersData) {
      id += 1;
    }
    data.id = id;
    return data;
  })
  .then(idData => {
    return fetch(databaseURL + '/users.json', { method: 'POST', body: JSON.stringify(idData)})
  })
  .then(() => response.send(JSON.stringify(data)))
  .catch(error => response.send(error))
})

/////////////Events

app.get("/events", (request, response) => {
    fetch(databaseURL + '/events.json')
    .then((res) => res.json())
    .then((eventsData) => {
      var result = [];
      for(var k in eventsData) {
        result.push(eventsData[k]);
      }
      return result;
    }).then((data) => {
    response.send(data);
    return null;
  }).catch(error => response.send(error));
});

app.get("/events/:eventId", (request, response) => {
fetch(databaseURL + '/events.json')
.then((res) => res.json())
.then((eventsData) => {
  var result;
  for(var k in eventsData) {
    if (eventsData[k]['id'] === Number(request.params.eventId)) {
      result = eventsData[k];
    }
  }
  return result;
}).then((data) => {
  response.send(data);
  return null;
}).catch(error => response.send(error));
});

app.post("/events", (request, response) => {
  var data = request.body;
  var id = 1;
  fetch(databaseURL + '/events.json')
  .then((res) => res.json())
  .then((eventsData) => {
    for(var k in eventsData) {
      id += 1;
    }
    data.id = id;
    return data;
  })
  .then(idData => {
    return fetch(databaseURL + '/events.json', { method: 'POST', body: JSON.stringify(idData)})
  })
  .then(() => response.send(JSON.stringify(data)))
  .catch(error => response.send(error))
})
//////////////Bill

app.get("/bill", (request, response) => {
  fetch(databaseURL + '/bill.json')
  .then((res) => res.json())
  .then((data) => {
    response.send(data);
    return null;
  }).catch(error => response.send(error));
});

app.put("/bill", (request, response) => {
  fetch(databaseURL + '/bill.json', {
    method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(request.body) // Coordinate the body type with 'Content-Type'
  })
  .then(() => response.send(JSON.stringify(request.body)))
  .catch(error => response.send(error));
})

//////////////Currency

app.get("/currency/:base", (request, response) => {
    fetch('https://api.exchangeratesapi.io/latest?symbols=USD,EUR&base=' + request.params.base)
    .then((data) => {
      response.send(data);
      return null;
    }).catch(error => response.send(error));
});

///////////////Categories

app.get("/categories", (request, response) => {
    fetch(databaseURL + '/categories.json')
    .then((res) => res.json())
    .then((usersData) => {
      var result = [];
      for(var k in usersData) {
        result.push(usersData[k]);
      }
      return result;
    }).then((data) => {
    response.send(data);
    return null;
  }).catch(error => response.send(error));
});

app.get("/categories/:categoryId", (request, response) => {
fetch(databaseURL + '/categories.json')
.then((res) => res.json())
.then((categoriesData) => {
  var result;
  for(var k in categoriesData) {
    if (categoriesData[k]['id'] === Number(request.params.categoryId)) {
      result = categoriesData[k];
    }
  }
  return result;
}).then((data) => {
  response.send(data);
  return null;
}).catch(error => response.send(error));
});

app.post("/categories", (request, response) => {
  var data = request.body;
  var id = 1;
  fetch(databaseURL + '/categories.json')
  .then((res) => res.json())
  .then((categoriesData) => {
    for(var k in categoriesData) {
      id += 1;
    }
    data.id = id;
    return data;
  })
  .then(idData => {
    return fetch(databaseURL + '/categories.json', { method: 'POST', body: JSON.stringify(idData)})
  })
  .then(() => response.send(JSON.stringify(data)))
  .catch(error => response.send(error))
});

app.put("/categories/:categoryId", (request, response) => {
  var data = request.body;
  var id = request.params.categoryId;
  fetch(databaseURL + '/categories.json')
  .then((res) => res.json())
  .then((categoriesData) => {
    var globId;
    for(var k in categoriesData) {
      if (categoriesData[k]['id'] === Number(request.params.categoryId)) {
        globId = k;
      }
    }
    return globId;
  })
  .then((gId) =>{
    return fetch(databaseURL + '/categories/' + gId + '.json', {
      method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
      body: JSON.stringify(data) // Coordinate the body type with 'Content-Type'
    })
  })
  .then(() => response.send(JSON.stringify(data)))
  .catch(error => response.send(error))
});

//////////////API

const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`
  }
  return app(request, response);
});

module.exports = {
  api
}
