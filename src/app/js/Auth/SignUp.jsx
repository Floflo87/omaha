import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    componentDidMount() {
        this.props.handleInputChange('email', '');
        this.props.handleInputChange('password', '');
        // this.props.handleInputChange('profilePicture', '');
    }

    render() {
        return (
            <div className="container">
                <h1>SignUp</h1>
                <input
                    type="email"
                    value={this.props.email}
                    onChange={evt => this.props.handleInputChange('email', evt.target.value)}
                    className="input"
                    placeholder="E-Mail"
                />
                <br />
                <br />
                <input
                    type="password"
                    value={this.props.password}
                    onChange={evt => this.props.handleInputChange('password', evt.target.value)}
                    className="input"
                    placeholder="Password"
                />
                <br />
                <br />
                <input
                    type="file"
                    value={this.props.profilePicture}
                    onChange={evt => this.props.handleInputChange('picture', evt.target.files[0])}
                    className="input"
                    placeholder="Profile Picture"
                    style={{
                        backgroundColor: '#4f000b'
                    }}
                />
                <br />
                <br />
                <button
                    style={{ backgroundColor: '#4f000b' }}
                    className="button"
                    onClick={() => this.props.sign('up')}
                >
                    Sign Up
                </button>
                <br />
                <br />
                <p>{this.props.error}</p>
                <div className="separator" />
                <Link style={{ color: '#4f000b' }} className="link" to="/auth/sign-in">
                    Already One Of Us? Sign In You Must!
                </Link>
            </div>
        );
    }
}

export default SignUp;
