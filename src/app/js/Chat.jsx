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
                    <div className="chat">
                        <div className="card card-chat card-left">
                            <div className="card-body">
                                <div className="author">Flo</div>
                                <div className="message">I am a nice German guy</div>
                            </div>
                        </div>

                        <div className="card card-chat card-right">
                            <div className="card-body">
                                <div className="author">Hananas</div>
                                <div className="message">
                                    I am a nice girl from hawai Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Totam reprehenderit autem dignissimos
                                    necessitatibus doloribus sit eos enim voluptas harum, dolor officiis
                                    repellat laboriosam, ratione est voluptatem dolorem id perferendis
                                    facilis.
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <hr />
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
        );
    }
}

export default withRouter(Chat);
