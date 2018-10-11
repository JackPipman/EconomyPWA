

var objJsonResp = {
"-LOJdxFWAmZwHiPVYVfb": {
"email": "jackpin@gmail.com",
"id": 1,
"name": "Администратор",
"password": "12345678"
},
"-LOJgMgy0ePYP700LMLu": {
"email": "jackpipman@gmail.com",
"id": 1,
"name": "Администратор",
"password": "12345678"
}
};

var result;

for(var k in objJsonResp) {
  if (objJsonResp[k]['email'] == "jackpipman@gmail.com") {
    result = objJsonResp[k];
  }
}

console.log(result);