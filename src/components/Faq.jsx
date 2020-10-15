/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getFirebaseApp } from './db/FirebaseApp';


class Faq extends React.Component {
  constructor(props) {
    super(props);
    
    this.openQuestion = this.openQuestion.bind(this);
  }

  openQuestion(e) {
    const items = document.querySelectorAll(".question");

    for (let i = 0; i < items.length; i++) {
      if(items[i] == e.target) {
        e.target.classList.toggle('active');
      } else {
        items[i].classList.remove('active');
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="faq row">
          <div className="col-sm-10 offset-sm-1 shadow">
            <div className="question active" onClick={this.openQuestion}>
              <h5>Here's the first question <i className="fa fa-chevron-up" /></h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit incidunt vitae? Quaerat, eaque numquam? Dicta modi minima voluptas molestias aut nesciunt eligendi recusandae facere.</p>
            </div>
            
            <div className="question" onClick={this.openQuestion}>
              <h5>Here's the first question <i className="fa fa-chevron-up" /></h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit incidunt vitae? Quaerat, eaque numquam? Dicta modi minima voluptas molestias aut nesciunt eligendi recusandae facere.</p>
            </div>
          
            <div className="question" onClick={this.openQuestion}>
              <h5>Here's the first question <i className="fa fa-chevron-up" /></h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit incidunt vitae? Quaerat, eaque numquam? Dicta modi minima voluptas molestias aut nesciunt eligendi recusandae facere.</p>
            </div>

            <div className="question" onClick={this.openQuestion}>
              <h5>Here's the first question <i className="fa fa-chevron-up" /></h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit incidunt vitae? Quaerat, eaque numquam? Dicta modi minima voluptas molestias aut nesciunt eligendi recusandae facere.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Faq);