import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const propTypes = {
  children: PropTypes.element,
};

class Labels extends React.Component {
  state = {
    nav1: null,
    nav2: null,
  };

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div className="labels container big">
        <div className="row mb-3 mt-3">
          <div className="slider-side col-md-6">
            <Slider
              asNavFor={this.state.nav2}
              ref={(slider) => (this.slider1 = slider)}
            >
              <img
                className="main-slider-view"
                src="images/airpods-label.png"
                alt=""
              />
              <img
                className="main-slider-view"
                src="images/hard-bag-amy-label.png"
                alt=""
              />
              <img
                className="main-slider-view"
                src="images/iphone-label.png"
                alt=""
              />
            </Slider>
            <Slider
              asNavFor={this.state.nav1}
              ref={(slider) => (this.slider2 = slider)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              <img
                className="slider-thumbs"
                src="images/airpods-label.png"
                alt=""
              />
              <img
                className="slider-thumbs"
                src="images/hard-bag-amy-label.png"
                alt=""
              />
              <img
                className="slider-thumbs"
                src="images/iphone-label.png"
                alt=""
              />
            </Slider>
          </div>
          <div className="info-side col-md-5 offset-md-1 mt-3">
            <p className="sold-by">
              SOLD BY <img src="images/mabels.svg" alt="" />
            </p>
            <h1>Cool small labels</h1>
            <p className="desc">
              Customizable waterproof labels that you can peel-and-stick to
              anything you want your lost-item link on, no matter its size!
            </p>
            <div className="left btn btn-primary">Buy labels</div>
          </div>
        </div>
      </div>
    );
  }
}

Labels.propTypes = propTypes;

export default Labels;
