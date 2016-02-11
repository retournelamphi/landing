import app from './config/express';
const debug = require('debug')('landing:index');

// listen on port config.port
app.listen(5000, λ => debug(`started server on port 3000`));

export default app;