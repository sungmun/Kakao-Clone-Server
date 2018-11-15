import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './router/main';
import OAuth from './auth/oauth';

const app = express();
const port =3000;
const devPort=3001;
if(process.env.NODE_ENV==='development'){
    console.log('Server is running on development mode');

    const config = require('../webpack.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',router);

var oauth=new OAuth(app);
app.use('/auth',oauth.googleOAuth())

const db=mongoose.connection;
db.on('error',console.error);
db.once('open',()=>console.log('Connected to Mongodb Server'));

mongoose.connect('mongodb://localhost/kakao_talk',{useNewUrlParser:true});

const server=app.listen(port,()=>console.log('Express listening on port', port));

//supervisor server.js