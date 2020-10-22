// 메인 애플리케이션, 엔트리 애플리케이션
 var express = require('express');
var app = express(); 
app.locals.pretty = true; // 글씨 이쁘게

app.set('view engine','jade'); // 약속된 의미임
app.set('views', './views'); // jade 익스프레스에서는 views라는 디렉토리로 많이 씀
// app.set 뷰가 없어도 기본값으로 알아서 해줌 (views만)

app.use(express.static('public'));

app.get('/topic', function(req,res){

      var topices = [
            'JavaScript is....',
            'NodeJs is....',
            'Expressis...'
      ];

      var output = `
      <a href="/topic?id=0">자바스크립트</a> <br>
      <a href="/topic?id=1">노드 js </a> <br>
      <a href="/topic?id=2">익스프레스</a> <br>
      ${topices[req.query.id]}
      `
      res.send(output);
      console.log(output + "output내용");
      // res.send(topices[req.query.id]);

}) 

app.get('/template', function(req,res) {
      res.render('temp', {time:Date(), _title:'JadeTitle'}); // 웹페이지로 랜더링 해서 전송함
      // temp라는 템플릿?을 호출함 (temp.jade)
})

app.get('/', function(req,res){
      res.send('hello world');
});
app.get('/login', function(req,res){
      res.send('<h1>Login page</h1>');
});


app.listen(3000, function() {
      console.log('커넥트 3000포트 '); 
});


 
