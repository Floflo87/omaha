import React from 'react';

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.email : 'Stranger'}! </h1>
            <p>
                Feeling Alone, Looking For That Special Someone?
                <br />
                You have come to the Right Place.
            </p>
            <h2>
                Finding Special Connections Since 2018.
                <br />
                <br />
                Welcome To THE ONE.
            </h2>
        </div>
    );
};

export default Home;
