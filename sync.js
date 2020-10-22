var fs = require('fs');

// sync (동기방식)
console.log(1);
var data = fs.readFileSync('data.txt',{encoding:'utf-8'} );
console.log(data);

// Async (비동기 방식)
console.log(2);
fs.readFile('data.txt',{encoding:'utf-8'},function(err, data){
      console.log(3);
      console.log(data);
});

console.log(4);


