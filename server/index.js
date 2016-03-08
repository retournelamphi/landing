import app from './config/express';
import mongoose from 'mongoose';
const debug = require('debug')('landing:index');


const mongoPath = `xxx`;

mongoose.connect(mongoPath, {server: {socketOptions: {keepAlive: 1}}});
mongoose.connection.on('error', λ => {
    throw new Error(`unable to connect to database: ${mongoPath}`);
});


// listen on port config.port
app.listen(5000, λ => debug(`started server on port 3000`));

export default app;
