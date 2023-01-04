import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="inicio">
                <p className="head1">Costumer Experience for your business</p>
                <p className="head2">
                    Delivering a great customer experience is hugely important for any business. The better experience customers have, the more repeat custom and positive reviews you'll receive, while simultaneously reducing the friction of customer complaints and returns.</p>
            </div>
        );
    }
}
