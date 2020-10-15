/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getFirebaseApp } from './db/FirebaseApp';


class Terms extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="about row">
          <div className="col-sm-10 offset-sm-1 shadow">
            <h2>Title here</h2>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cumque quod id minus veniam, sed nisi dolorum eveniet sequi iusto dolor laudantium quas, at delectus, numquam impedit ipsa eaque aliquid deleniti. Porro unde distinctio officia facere rem reprehenderit animi sequi!</p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt tenetur deserunt a vel ut exercitationem fugiat minima modi provident?</p>

            <h3>Smaller title here</h3>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cumque quod id minus veniam, sed nisi dolorum eveniet sequi iusto dolor <Link to="/">home</Link> quas, at delectus, numquam impedit ipsa eaque aliquid deleniti. Porro unde distinctio officia facere rem reprehenderit animi sequi!</p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt tenetur deserunt a vel ut exercitationem fugiat minima modi provident?</p>

            <h3>Smaller title here</h3>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cumque quod id minus veniam, sed nisi dolorum eveniet sequi iusto dolor <Link to="/">home</Link> quas, at delectus, numquam impedit ipsa eaque aliquid deleniti. Porro unde distinctio officia facere rem reprehenderit animi sequi!</p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt tenetur deserunt a vel ut exercitationem fugiat minima modi provident?</p>

            <h3>Smaller title here</h3>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cumque quod id minus veniam, sed nisi dolorum eveniet sequi iusto dolor <Link to="/">home</Link> quas, at delectus, numquam impedit ipsa eaque aliquid deleniti. Porro unde distinctio officia facere rem reprehenderit animi sequi!</p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt tenetur deserunt a vel ut exercitationem fugiat minima modi provident?</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Terms);