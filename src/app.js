var React = require('react'),
    DOM = React.DOM, h1 = DOM.h1;

module.exports = React.createClass({
    getInitialState: function() {
        return {message: this.props.message}
    },
    render: function () {
        return h1(null, this.state.message);
    }
});