// 메인 애플리케이션, 엔트리 애플리케이션
 var express = require('express');
var app = express(); 
var bodyParser = require('body-parser') // post방식 사용할 수 있게 해주는 모듈
app.locals.pretty = true; // 글씨 이쁘게

app.set('view engine','jade'); // 약속된 의미임
app.set('views', './views'); // jade 익스프레스에서는 views라는 디렉토리로 많이 씀
// app.set 뷰가 없어도 기본값으로 알아서 해줌 (views만)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false })) // 모듈을 붙임

app.get('/topic/:id', function(req,res){

      var topices = [
            'JavaScript is....',
            'NodeJs is....',
            'Expressis...'
      ];

      var output = `
      <a href="/topic/0">자바스크립트</a> <br>
      <a href="/topic/1">노드 js </a> <br>
      <a href="/topic/2">익스프레스</a> <br>
      ${topices[req.params.id]}
      `
      // params -> 파라메터 줄인말
      res.send(output);
      console.log(output + "output내용");
      // res.send(topices[req.query.id]);

}) 

app.get('/form', function(req,res){
      res.render('form');
})

app.get('/testview', function(req,res){
      res.send('test html');
})

app.get('/form_receiver', function(req,res){
      var title = req.query.title;
      var decription = req.query.dec;
      res.send(title + ',' + decription);
       console.log(title + " : title 내용 ");
      res.send("get?");
});

app.post('/form_receiver',function(req,res){
      var title = req.body.title;
      var desc = req.body.dec;
      res.send(title + ',' + desc);
      
 res.send('post 방식');
})
app.get('/topic/:id/:mode', function(req, res){
      res.send(req.params.id + ',' + req.params.mode)
      // mode -> 마지막 /에 의미하는 정보
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


 
