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
import swig from 'swig';

const app = express();


app.use(logger('dev'));
app.use(requestIp.mw());
app.use(express.static(__dirname + '/../../public'));


// View engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/../views'));


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