import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../utils/api';
import Profile from '.';

const ProfileDisplay = props => {
    console.log('props', props);
    // if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

    return (
        <div className="container">
            <h1>Hey</h1>
            <img src={props.user.profilePicture} height="200px" />
            <br />
            {props.user._id}
            <br />
            {props.user.email}
            <br />
            <h1>Show me your best self:</h1>
            {/* <input
                type="number"
                value={this.state.age}
                placeholder="age"
                onChange={evt => this._inputChangeHandler('age', evt.target.value)}
            />
            <br />
            <input
                type="text"
                value={this.state.gender}
                placeholder="gender"
                onChange={evt => this._inputChangeHandler('gender', evt.target.value)}
            />
            <br />
            <input
                type="text"
                value={this.state.name}
                placeholder="name"
                onChange={evt => this._inputChangeHandler('name', evt.target.value)}
            />
            <br />
            <h2>Interested In</h2>
            <label>
                <input
                    type="radio"
                    value="women"
                    checked={this.state.preferences === 'women'}
                    onChange={evt => this._inputChangeHandler('preferences', evt.target.value)}
                />
                Women
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    value="men"
                    checked={this.state.preferences === 'men'}
                    onChange={evt => this._inputChangeHandler('preferences', evt.target.value)}
                />
                Men
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    value="both"
                    checked={this.state.preferences === 'both'}
                    onChange={evt => this._inputChangeHandler('preferences', evt.target.value)}
                />
                Both
            </label>
            <br />
            <h2>About Yourself</h2>
            <textarea
                type="text"
                value={this.state.description}
                placeholder="About Yourself"
                onChange={evt => this._inputChangeHandler('description', evt.target.value)}
            />
            <br />
            <input
                type="text"
                value={this.state.city}
                placeholder="city"
                onChange={evt => this._inputChangeHandler('city', evt.target.value)}
            />
            <button onClick={this._submitData}>SUBMIT</button> */}
        </div>
    );
};
export default ProfileDisplay;
