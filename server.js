import app from './server/config/express';
import mongoose from 'mongoose';
const debug = require('debug')('landing:index');


const mongoPath = `mongodb://192.168.99.100:27017`;

mongoose.connect(mongoPath, {server: {socketOptions: {keepAlive: 1}}});
mongoose.connection.on('error', λ => {
    throw new Error(`unable to connect to database: ${mongoPath}`);
});


// listen on port config.port
app.listen(process.env.PORT || 5000, λ => debug(`started server on port 5000`));

export default app;
