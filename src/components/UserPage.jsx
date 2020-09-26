import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import values from 'object.values';
import { getFirebaseApp } from './db/FirebaseApp';
import Loading from './Loading';

const propTypes = {
    location: PropTypes.object.isRequired,
};

const getSlug = () => location.pathname.slice(1);

class UserContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            what: '',
            where: '',
            slug: getSlug(),
            how: '',
            sending: false,
            messageSent: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            sending: true
        })
        fetch('https://us-central1-lost-item-ba357.cloudfunctions.net/notifyUser', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(this.state), // body data type must match "Content-Type" header
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        messageSent: true
                    })
                }
                this.setState({
                    sending: false
                })
            }); // parses response to JSON
    }

    handleChange(name, e) {
        const change = {};
        change[name] = e.target.value;
        this.setState(change);
    }
    render() {
        const buttonText = 'Send';

        return (
            <div>
                {this.state.messageSent &&
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Thank you!</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <br />
                                <p>🎉</p>
                                <p>{this.props.user.name} will be happy to get his {this.state.what} back!</p>
                                <p>Do you need a lost-item link also? Lost Item gives you a link so if you lose something, the person who finds it can help you get it back.</p>
                                <p className="cta">
                                    <Link className="btn btn-primary" to="/signup">Learn more here.</Link>
                                </p>
                                <hr />
                            </div>
                        </div>
                    </div>
                }
                {!this.state.messageSent &&
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Yay! You found something that belongs to {this.props.user.name}!</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <br />
                                <p>{this.props.user.name} will be very happy to hear that! Please help get this item returned!</p>
                                <form method="POST" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>What did you find?</label>
                                        <input className="form-control" type="text" name="what" onChange={this.handleChange.bind(this, 'what')} />
                                        <small className="form-text text-muted">e.g. an android phone, a credit card, a large sack of potatoes</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Where did you find it?</label>
                                        <input className="form-control" type="text" name="where" onChange={this.handleChange.bind(this, 'where')} />
                                        <small className="form-text text-muted">e.g. at Burger King on Clark Street, at Jenny&apos;s house, on Richard
                                        Branson&apos;s jet
                            </small>
                                    </div>
                                    <div className="form-group">
                                        <label>What&#39;s the best way for {this.state.name} to get this item back?</label>
                                        <textarea className="form-control" type="text" name="how" onChange={this.handleChange.bind(this, 'how')} />
                                        <small className="form-text text-muted">Leave your contact email or phone here, or a message for
                            how {this.state.name} can retrieve it, like &quot;I left it with the front desk at the ACME Hotel at Colombus and
                            4th Street.&quot;</small>
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={this.state.sending}>
                                        <i className={this.state.sending ? 'fa fa-spinner' : 'fa fa-send'} aria-hidden="true" />
                          &nbsp;&nbsp;{buttonText}</button>
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

UserContactForm.propTypes = {
    user: PropTypes.object,
};

const UserInfo = (props) => <UserContactForm user={props.user} />;

UserInfo.propTypes = {
    user: PropTypes.object,
};


const UserNotFound = () =>
    <div>
        <strong>No Such Page</strong>
        <p>Hmmm... We do not have a page for this link. Did you find an item with this link on it?</p>
    </div>;

class UserPage extends React.Component {
    state = {
        user: null,
        loading: true
    };
    componentDidMount() {
        const slug = getSlug();

        getFirebaseApp().database()
            .ref('/users')
            .orderByChild('slug')
            .equalTo(slug)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val() === null) {
                    this.setState({ user: null, loading: false });
                } else {
                    // do something else;
                    const user = values(snapshot.val())[0];
                    this.setState({ user, loading: false });
                }
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        if (this.state.user === null) {
            return <UserNotFound />;
        }
        return <UserInfo user={this.state.user} />;
    }
}

UserPage.propTypes = propTypes;

export default UserPage;
