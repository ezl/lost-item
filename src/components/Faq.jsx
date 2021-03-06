/* eslint-disable max-len */
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getFirebaseApp } from "./db/FirebaseApp";

class Faq extends React.Component {
  constructor(props) {
    super(props);

    this.openQuestion = this.openQuestion.bind(this);
  }

  openQuestion(e) {
    const items = document.querySelectorAll(".question");

    e.target.classList.toggle("active");

    for (let i = 0; i < items.length; i++) {
      if (items[i] != e.target) {
        items[i].classList.remove("active");
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="faq row">
          <div className="col-sm-10 offset-sm-1 shadow">
            <div className="question active" onClick={this.openQuestion}>
              <h5>
                What is Lost-Item? <i className="fa fa-chevron-up" />
              </h5>

              <p>
                Lost-Item has your back, we help you track down misplaced
                belongings by givinge you a link that you can put on your items.
                <br />
                <br />
                Then, when someone finds something you lose, they can contact
                you to arrange returning the object.
                <br />
                <br />
                For example, I have a sticker on my phone that says{" "}
                <a href="https://www.lost-item.com/eric">
                  www.lost-item.com/eric
                </a>{" "}
                on it. That way, if anyone finds my phone, it is easy for them
                to not only figure out who it belongs to, but also to arrange to
                return it.
                <br />
                <br />
                <a href="">Click here</a> to see an example of what it looks
                like when someone visits your link.
                <br />
                <br /> Click the button below to get started with your own link.
                <br />
                <br />
                <p className="cta">
                  <Link className="btn btn-primary" to="/signup">
                    Oh, cool. Sign me up.
                  </Link>
                </p>
              </p>
            </div>

            <div className="question" onClick={this.openQuestion}>
              <h5>
                How much does it cost? <i className="fa fa-chevron-up" />
              </h5>
              <p>
                $0.00. It’s free to sign-up and get your randomized permanent
                link.
                <br />
                <br />
                We do offer custom personalized links and printed link stickers
                for a small fee.
              </p>
            </div>

            <div className="question" onClick={this.openQuestion}>
              <h5>
                How does it work? <i className="fa fa-chevron-up" />
              </h5>
              <p>
                1. Put your link, like lost-item/eric on something you own.
                <br />
                <br />
                2. Lose that item.
                <br />
                <br />
                3. Someone finds that item, and then goes to your link.
                <br />
                <br />
                4. That person contacts you and helps you get your item back.
              </p>
            </div>

            <div className="question" onClick={this.openQuestion}>
              <h5>
                How do I get my item returned?{" "}
                <i className="fa fa-chevron-up" />
              </h5>
              <p>
                When someone visits your link, they will provide information to
                allow you to get in contact. You can then arrange however you
                would like to have your item returned.
              </p>
            </div>

            <div className="question" onClick={this.openQuestion}>
              <h5>
                Is Lost-item available in my area?{" "}
                <i className="fa fa-chevron-up" />
              </h5>
              <p>
                Lost-item is available wherever internet is available. Stickers
                are sold through Mabel’s Labels, who does offer international
                shipping at varying rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Faq);
