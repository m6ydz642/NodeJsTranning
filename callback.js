a = [3,1,2];

function b(v1, v2) {
      console.log('c' ,v1, v2);
      return v2-v1;
}

a.sort(b);
console.log(a); 

/************************ */
// 익명함수

c = [3,1,2];

c.sort(function (v1, v2){
return v2-v1;
});
console.log(c);