const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const fs = require('fs');
const indexRouter = require('./routes');
const connect = require('./schemas');
const adminRouter = require('./routes/admin');
const myinfoRouter = require('./routes/myinfo');
const pageinfoRouter = require('./routes/pageinfo'); // 1
const skillsRouter = require('./routes/skills');
const portfolioRouter = require('./routes/portfolio');
const timelineRouter = require('./routes/timeline');
const multer = require('multer');

const app = express();

try{
    fs.readdirSync('img');
}catch(error){
    console.log('img 폴더가 없어 폴더를 생성합니다.');
    fs.mkdirSync('img');
}


require('dotenv').config();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html'); // nunjucks
nunjucks.configure('views',{
    express:app,
    watch:true
})
connect();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'img')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', indexRouter); // 라우터받기

// myinfo 연결
app.use('/myinfo', myinfoRouter);
app.use('/admin', adminRouter);
app.use('/pageinfo', pageinfoRouter); //2 
app.use('/skills', skillsRouter);
app.use('/portfolio', portfolioRouter);
app.use('/timeline', timelineRouter);

// 404 error, 500 error 처리
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터를 찾을 수 없습니다.`);
    error.statue = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error');
});


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중..');
})