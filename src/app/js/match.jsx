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
                                            <img src="../../server/public/img/kisspng-baby-shower-party-infant-gender-reveal-feestversie-hand-painted-flower-pattern-watercolor-heart-trans-5b9a06a41a8731.4388879515368209001087.png" />
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
