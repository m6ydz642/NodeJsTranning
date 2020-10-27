var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }))
app.locals.pretty = true;

app.set('views', './views_file')
app.set('view engine', 'jade'); // jade 템플릿 엔진

// 라우팅
app.get('/topic/new', function(req,res) {
      res.render('new');
})

app.get('/topic', function(req,res) {
      fs.readdir('data', function (err, files){
            if(err){
                  res.send('내부오류발생 ') ;
            }
            res.render('view', {topics : files});

      });

    
})

app.post('/topic', function(req,res){
      var title = req.body.title; // 제목
      var desc = req.body.desc; // 본문
      fs.writeFile('data/' + title, desc, function(err){
            if(err){
                  res.send('내부오류발생 ') ;
            }
            res.send('Success! ->>> hi post : ' + req.body.title) ;   
      });
})

app.listen(3000, function(){
      console.log('접속 완료 3000번 포트');
})


