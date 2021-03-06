import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import routes from '../routes';
import path from 'path';
import requestIp from 'request-ip';

const app = express();


app.use(logger('dev'));
app.use(requestIp.mw());
app.use(express.static(__dirname + '/../../public'));


// View engine setup
app.set('views', path.join(__dirname + '/../views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env

// mount all routes on /api path
app.use('/', routes);


export default app;