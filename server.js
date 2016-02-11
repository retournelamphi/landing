var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    App = React.createFactory(require('./src/app'));

http.createServer(function (req, res) {
    if (req.url == '/') {
        res.setHeader('Content-Type', 'text/html');

        var props = {
            message: 'helloWorld'
        };

        var html = ReactDOMServer.renderToStaticMarkup(body(null,
            div({
                id: 'content', dangerouslySetInnerHTML: {
                    __html: ReactDOMServer.renderToString(App(props))
                }
            }),

            script({
                dangerouslySetInnerHTML: {
                    __html: 'var APP_PROPS = ' + safeStringify(props) + ';'
                }
            }),

            script({src: '//fb.me/react-0.14.7.min.js'}),
            script({src: '//fb.me/react-dom-0.14.7.min.js'}),
            script({src: '/bundle.js'})
        ));

        // Return the page to the browser
        res.end(html);

        // This endpoint is hit when the browser is requesting bundle.js from the page above
    } else if (req.url == '/bundle.js') {
        res.setHeader('Content-Type', 'text/javascript');
        browserify()
            .add('./browser.js')
            .transform(literalify.configure({
                'react': 'window.React',
                'react-dom': 'window.ReactDOM'
            }))
            .bundle()
            .pipe(res);

        // Return 404 for all other requests
    } else {
        res.statusCode = 404;
        res.end()
    }

// The http server listens on port 3000
}).listen(3000, function (err) {
    if (err) throw err;
    console.log('Listening on 3000...');
});


// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}