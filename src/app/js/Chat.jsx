import React from 'react';
import io from 'socket.io-client';
import api from './utils/api';
import { withRouter } from 'react-router-dom';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io.connect('localhost:3002');

        this.socket.on('RECEIVE_MESSAGE', data => {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = this.sendMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        //     this._expandBar = this._expandBar.bind(this);
    }

    componentWillMount() {
        localStorage.getItem('messages') &&
            this.setState({
                messages: JSON.parse(localStorage.getItem('messages')),
                isLoading: false
            });
        // setInterval(() => {
        //     api.get('/api/match/existing').then(match => {
        //         console.log('asdasdasd', match);
        //         if (match) {
        //             console.log('We are the best');
        //         } else {
        //             console.log('Match no longer exists');
        //             this.props.history.push('/home/');
        //         }
        //     });
        // }, 3000);
    }

    _handleKeyPress(ev) {
        if (ev.keyCode == 13) {
            console.log('Key Pressed');
            this.sendMessage();
        }
    }

    sendMessage(ev) {
        ev.preventDefault();
        console.log('MESSAGES', this.state.messages);

        const messageCount = this.state.messages.reduce((acc, el) => {
            // if (el.author !== this.state.username) return acc;
            return acc + el.message.length;
        }, 0);

        console.log(messageCount);

        if (messageCount > 100) {
            api.get('/api/match/delete').then(result => {
                this.props.history.push('/match/');
            });
        } else {
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        }

        console.log(messageCount);
        console.log(this.state);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('messages', JSON.stringify(nextState.messages));
    }

    render() {
        return (
            <div className="big-wrapper">
                <div className="container text-dark">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title text-dark">
                                        <strong>Love Knows NO Boundaries</strong>
                                    </div>
                                    <hr />
                                    <div className="messages">
                                        {this.state.messages.map(message => {
                                            return (
                                                <div>
                                                    {message.author}: {message.message}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        className="form-control"
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Message"
                                        className="form-control"
                                        value={this.state.message}
                                        onChange={ev => this.setState({ message: ev.target.value })}
                                        onKeyPress={this._handleKeyPress}
                                    />
                                    <br />
                                    <button
                                        onClick={this.sendMessage}
                                        className="btn btn-primary form-control"
                                        style={{ backgroundColor: '#4F000B' }}
                                    >
                                        Spread Some Love
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Chat);
