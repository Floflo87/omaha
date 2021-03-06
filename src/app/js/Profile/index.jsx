import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../utils/api';
import Display from './Display';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: '',
            age: '',
            description: '',
            name: '',
            city: ''
        };

        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._preferencesChangeHandler = this._preferencesChangeHandler.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    render() {
        if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

        return (
            <div className="container">
                <img src={this.props.user.profilePicture} height="200px" />

                {/* {this.props.user._id} */}

                {/* {this.props.user.email} */}
                <br />
                <h1>Some Information:</h1>
                <input
                    className="input"
                    type="text"
                    value={this.state.name}
                    placeholder="name"
                    onChange={evt => this._inputChangeHandler('name', evt.target.value)}
                />
                <br />
                <input
                    className="input"
                    type="number"
                    value={this.state.age}
                    placeholder="age"
                    onChange={evt => this._inputChangeHandler('age', evt.target.value)}
                />
                <br />
                <input
                    className="input"
                    type="text"
                    value={this.state.city}
                    placeholder="city"
                    onChange={evt => this._inputChangeHandler('city', evt.target.value)}
                />
                <br />
                <h2>Keep It Short And Real</h2>
                <textarea
                    className="input"
                    type="text"
                    value={this.state.description}
                    placeholder="About Yourself"
                    onChange={evt => this._inputChangeHandler('description', evt.target.value)}
                />
                <br />
                <button
                    style={{ backgroundColor: '#4f000b' }}
                    className="btn btn-primary"
                    onClick={this._submitData}
                >
                    Up To The Cloud
                </button>
            </div>
        );
    }

    _submitData(e) {
        e.preventDefault();
        console.log('submitting Data', this.state);
        api.put('/api/profile', {
            profilePicture: this.state.profilePicture,
            age: this.state.age,
            description: this.state.description,
            name: this.state.name,
            city: this.state.city
        })
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log('something is wrong', err));
    }

    _inputChangeHandler(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    _preferencesChangeHandler(key) {
        const newPreferences = { ...this.state.preferences };
        newPreferences[key] = !newPreferences[key];
        this.setState({ preferences: newPreferences });
    }
}
export default Profile;
