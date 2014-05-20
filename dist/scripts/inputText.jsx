/** @jsx React.DOM */
/*jshint strict: true */
/**
 * <TMInputText
 *     label="Username"
 *     id="username"
 *     value=""
 *     placeholder=""
 *     maxLength="200"
 *     minLength="1"
 *     errors:{{
 *         required: 'l10n string'
 *     }}
 *     validateBefore={function(){
 *
 *     }}
 *     validate={function(){
 *         return errorCode
 *     }}
 *     validateAfter={function(){
 *
 *     }}
 *     validateOn="blur,focus,change,input,submit"
 *     />
 */


var INPUT_TYPES = [
    'text',
    'password',
    'datetime',
    'datetime-local',
    'date',
    'month',
    'time',
    'week',
    'number',
    'email',
    'url',
    'search',
    'tel',
    'color'
];

var TMInputText = React.createClass({
    getInitialState: function() {
        console.log('getInitialState = ', this);
        this.validate = this.props.validate || this.validate;
        this.validateBefore = this.props.validateBefore || this.validateBefore;
        this.validateAfter = this.props.validateAfter || this.validateAfter;
        this.errors = this.props.errors || this.errors;

        return {
            windowWidth: window.innerWidth,
            value: this.props.value || '',
            validateOn: this.props.validateOn || '',
        };
    },

    componentDidMount: function() {
        console.log('componentDidMount');
    },

    componentWillUnmount: function() {
        console.log('componentWillUnmount');
    },

    getValue: function() {
        return this.refs.input.getDOMNode().value;
    },

    setValue: function(value) {
        this.setState({
            value: value
        });
    },

    getErrorMessage: function() {
        return this.refs.errorMessage.getDOMNode().value;
    },

    setErrorMessage: function(message) {
        return this.refs.errorMessage.getDOMNode().innerHTML = message;
    },

    util: {
        addClass: function(node, className){
            // http://caniuse.com/#feat=classlist
            // ie9- doesn't support classlist
            if(node.classList){
                return node.classList.add(className);
            }else{
                // TODO - ie9- support
            }
        },
        removeClass: function(node, className){
            // http://caniuse.com/#feat=classlist
            // ie9- doesn't support classlist
            if(node.classList){
                return node.classList.remove(className);
            }else{
                // TODO - ie9- support
            }
        },
        hasClass: function(node, className){
            // http://caniuse.com/#feat=classlist
            // ie9- doesn't support classlist
            if(node.classList){
                return node.classList.contains(className);
            }else{
                // TODO - ie9- support
            }
        },
    },

    errors: {
        'required': 'Required!'
    },

    getError: function(code) {
        console.log('getError code = ', code);
        return this.errors[code] || '';
    },

    handleError: function(e, errorStatus) {
        console.log('handleError = ', e);
        var rootNode = this.getDOMNode(),
            errorNodes = rootNode.querySelectorAll('[class*=help-]');

        if(errorStatus) {
            this.util.addClass(rootNode, 'error');
        }else{
            this.util.removeClass(rootNode, 'error');
        }

        for(var i = 0; i < errorNodes.length; i++) {
            var item = errorNodes[i],
                msg = '';

            if(errorStatus) {
                this.util.removeClass(item, 'hide');
                if(this.util.hasClass(item, 'help-inline')) {
                    msg = this.getError(errorStatus);
                }
            }else{
                this.util.addClass(item, 'hide');
            }

            item.innerHTML = msg;
        }

        this.setState({
            errorStatus: errorStatus
        });
    },

    handleValidate: function(e, eventFrom) {
        console.log('handleValidate = ', e, eventFrom);
        var _regexp = new RegExp(eventFrom, 'i');
        if(this.state.validateOn.match(_regexp)) {
            this.validateBefore(e);
            this.handleError(e, this.validate(e));
            this.validateAfter(e);
        }
    },

    validateBefore: function(e) {
        console.log('validate Before = ', e);
    },

    validate: function(e){
        console.log('validate = ', e.target.value);
        return false;
    },

    validateAfter: function(e) {
        console.log('validate After = ', e);
    },

    handleBlur: function(e){
        console.log('handleBlur = ', e.target.value);

        this.handleValidate(e, 'blur');
    },

    handleFocus: function(e) {
        console.log('handleFocus = ', this, e.target.value);

        this.handleValidate(e, 'focus');
    },

    handleChange: function(e){
        console.log('handleChange = ', e.target.value, this.getDOMNode());
        this.setState({
            value: e.target.value
        });

        this.handleValidate(e, 'change');
    },

    renderInput: function() {
        return (
            <input
                type={this.props.type || 'text'}
                id={this.props.id || ''}
                name={this.props.id || ''}
                maxLength={this.props.maxLength || ''}
                minLength={this.props.minLength || ''}
                placeholder={this.props.placeholder || ''}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                validateOn={this.props.validateOn}
                value={this.state.value}
                ref='input' />
        );
    },

    renderLabel: function() {
        return this.props.label ? <label className="control-label" htmlFor={this.props.id} ref='label'>{this.props.label}</label> : null;
    },

    renderErrorArrow: function() {
        return (
            <div className="help-arrow hide"></div>
        );
    },

    renderErrorMessage: function() {
        return (
            <div className="help-inline hide" data-error ref="errorMessage"></div>
        );
    },

    render: function() {
        var _fieldClassName = 'control-group';
        _fieldClassName += (this.props.id) ? ' field-' + this.props.id : '';

        return (
            <div className={_fieldClassName}>
                {this.renderLabel()}
                <div className="controls">
                    {this.renderInput()}
                    {this.renderErrorArrow()}
                    {this.renderErrorMessage()}
                </div>
            </div>
        );
    },
});
