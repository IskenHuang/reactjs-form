/** @jsx React.DOM */

var TMForm = React.createClass({
    render: function() {
        return <form className={this.props.class} id={this.props.id}></form>;
    }
});
