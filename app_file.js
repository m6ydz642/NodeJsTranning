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

      fs.readdir('data', function (err, files){
            if(err){
                  res.send('내부오류발생 ')
            }
            res.render('new', {topics:files});
            });
     
});

/*********************************************** */
//코드 중복성 줄이기
// app.get('/topic', function(req,res) {
//       fs.readdir('data', function (err, files){
//             if(err){
//                   res.send('내부오류발생 ') ;
//             }
//             res.render('view', {topics : files});

//       });

    
// })

app.get(['/topic','/topic/:id'], function(req,res) {
      // 경로를 대괄호를 이용해서 추가로 등록할 수 있음
      fs.readdir('data', function (err, files){
            if(err){
                  res.send('내부오류발생 ') ;
            }
            var id = req.params.id; // id 값 저장
            console.log("id값 : " + id);
            if(id){ // 참이면
                        // id 값이 있을때
            fs.readFile('data/' + id, 'utf-8', function(err,data) {  //data 경로에 id값 불러서 읽음
                  if(err){
                        res.send('파일 읽기 오류 발생 ') ;
                  }
                  console.log("data내용 " + data);
                //  res.send(data); // 매개변수로 받은 data값을 읽음
                res.render('view',{topics:files, titlezz:id, desc:data}); // 매개변수로 받은 data값을 읽음
                  // jade view안에 내용이랑 topic id 를 같이 가져옴
            
            
        
            })
            }else{
                    //id 값이 없을때
              res.render('view', {topics : files, title:'Welcome',desc:'hello javascript'}); 
            }
      
      })


})

// 중복이라 제거
// app.get('/topic/:id', function(req,res){ // 글 읽기
// var id = req.params.id; // id값에 해당 되는 글
// /********************************************** */
// // 파일을 먼저읽게 한다음에 작업
// fs.readdir('data', function (err, files){
//       if(err){
//             res.send('내부오류발생 ') ;
//       }
//     //  res.render('view', {topics : files});


//     /// topic/:id를 읽기에 성공했으면 파일안에 내용을 read file함
//     fs.readFile('data/' + id, 'utf-8', function(err,data) {  //data 경로에 id값 불러서 읽음
//       if(err){
//             res.send('파일 읽기 오류 발생 ') ;
//       }
//       console.log("data내용 " + data);
//     //  res.send(data); // 매개변수로 받은 data값을 읽음
//     res.render('view',{topics:files, titlezz:id, desc:data}); // 매개변수로 받은 data값을 읽음
//       // jade view안에 내용이랑 topic id 를 같이 가져옴


//       })
//    })
// })


app.get('/temp', function(req,res){ // views views_file이랑 경로 확인한다고  적어봄 
      res.render('temp');
})

app.post('/topic', function(req,res){
      var title = req.body.title; // 제목
      var desc = req.body.desc; // 본문
      fs.writeFile('data/' + title, desc, function(err){
            if(err){
                  res.send('내부오류발생 ') ;
            }
            res.send('Success! ' + req.body.title) ;   
            res.redirect('/topic/' + title); // 경로 이동시킴
      });
})

app.listen(3000, function(){
      console.log('접속 완료 3000번 포트');
})


