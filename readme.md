#landing

[![Code Climate](https://codeclimate.com/github/retournelamphi/landing/badges/gpa.svg)](https://codeclimate.com/github/retournelamphi/landing)
[![bitHound Overall Score](https://www.bithound.io/github/retournelamphi/landing/badges/score.svg)](https://www.bithound.io/github/retournelamphi/landing)

[![bitHound Dependencies](https://www.bithound.io/github/retournelamphi/landing/badges/dependencies.svg)](https://www.bithound.io/github/retournelamphi/landing/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/retournelamphi/landing/badges/devDependencies.svg)](https://www.bithound.io/github/retournelamphi/landing/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/retournelamphi/landing/badges/code.svg)](https://www.bithound.io/github/retournelamphi/landing)

##use

- `npm install`
- `bower install`
- `npm run webpack` you can edit for --watch
- `npm run start-dev`

##dockerise (wip) 

- `npm install`
- `bower install`
- `npm run build`
- `docker build -t rl/landing .`
- `docker run -p 3000:5000 -d rl/landing`

##production 

- `npm install`
- `bower install`
- `npm run build`
- `cd dist && npm start`

##stack

- node with es6 syntax
- mongodb

##packages

###dev

- [nodemon](http://nodemon.io/)
- [babel](https://www.npmjs.com/package/babel)

###production

- [mongoose](http://mongoosejs.com/)
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [sendgrid](https://www.npmjs.com/package/sendgrid)