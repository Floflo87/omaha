import React from 'react';
import { Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText, Button } from 'reactstrap';
import api from './utils/api.js';

class Match extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            term: '',
            newterm: '',
            isLoaded: false,
            cityquery: '',
            agequery: '',
            otherUser: null
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.namehandler = this.namehandler.bind(this);
        this.doMatch = this.doMatch.bind(this);
    }
    searchHandler(event) {
        this.setState({
            term: event.target.value
        });
        console.log(this.state);
    }
    namehandler(event) {
        this.setState({
            newterm: event.target.value
        });
        console.log(this.state);
    }

    searchingFor(term) {
        return function(x) {
            return x.age.toString().includes(term) || !term;
        };
    }

    searchingForr(newterm) {
        return function(x) {
            return x.name.toLowerCase().includes(newterm.toLowerCase()) || !newterm;
        };
    }

    componentDidMount() {
        api.get(`/api/match`).then(result => {
            console.log(result);
            this.setState({
                items: result,
                isLoaded: true
            });
        });
    }
    doMatch(otherUserId) {
        api.post('api/match', {
            otherUser: otherUserId
        }).then(match => {
            if (match.confirmed) {
                console.log('We are the best');
                prompt('COngrats you have a match');
            } else {
                console.log('Better luck next time sucker');
            }
        });
    }
    render() {
        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Still Loading ...Almost there </div>;
        } else {
            return (
                <div>
                    <form>
                        //cityquery
                        <input type="text" name="namequery" onChange={this.namehandler} />
                    </form>
                    <form>
                        //agequery
                        <input type="number" name="agequery" onChange={this.searchHandler} />
                    </form>
                    <div id="user-cards">
                        {items
                            .filter(this.searchingFor(this.state.term))
                            .filter(this.searchingForr(this.state.newterm))
                            .map(item => (
                                <Card key={item._id}>
                                    <CardImg
                                        top
                                        width="100%"
                                        src={item.profilePicture}
                                        alt="Upps SomeThing Went Wrong"
                                    />
                                    <CardBody>
                                        <CardTitle>{item.name}</CardTitle>
                                        <CardSubtitle>LOVE Knows NO Boundaries</CardSubtitle>
                                        <CardText>{item.description}</CardText>
                                        <CardText>{item.city}</CardText>
                                        <CardText>{item.age}</CardText>
                                        <Button onClick={() => this.doMatch(item._id)}>
                                            THE ONE
                                            <img src="https://png2.kisspng.com/sh/7dfc0f44d590ee27bcf5e658fa857f9b/L0KzQYi4UcI5N2I8epGAYUHnRrPphcFma2Q6SZC5OEO7Q4m4WcE2OWI9T6kANka0Qoe1kP5o/5a1d6bbe1ec351.083838191511877566126.png" />
                                        </Button>
                                    </CardBody>
                                </Card>
                            ))}
                    </div>
                </div>
            );
        }
    }
}

export default Match;
