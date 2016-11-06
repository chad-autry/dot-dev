var React = require('react');
var Link = require('react-router').Link;


module.exports = React.createClass({
    

    render: function() {
        return (
            /* jshint ignore:start */

            <div className="container">
                <div className="center-form panel">
                    <div className="panel-body">
                        <h2 className="text-center">Log in            </h2>
                        <h6 className="text-center">react-bp has a mock backend which is hard coded to log you in as 'John Doe'            </h6>
                            <div className="form-group has-feedback">
                                <input type="text" ngControl="email" className="form-control input-lg" placeholder="Email" autofocus/>
                                <i className="fa form-control-feedback fa-at">            </i>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" ngControl="password" className="form-control input-lg" placeholder="Password"/>
                                <i className="fa form-control-feedback fa-key">            </i>
                            </div>
                            <button className="btn btn-lg btn-block btn-success">Log in            </button>
                            <br/>
                            <p className="text-center text-muted" >
                                <small>Don&apos;t have an account yet?            </small>
                                <Link to='signup'>Sign up            </Link>
                            </p>
                            <div className="signup-or-separator">
                                <h6 className="text">or            </h6>
                                <hr/>
                            </div>

                        <button className="btn btn-block btn-google-plus">
                            <i className="fa fa-google-plus">            </i>
                sign in with Google
                        </button>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});