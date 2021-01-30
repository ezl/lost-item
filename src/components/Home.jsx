import React from 'react';
import { Link } from 'react-router-dom';

const HeroUnit = () =>
  <div className="hero container big">
    <div className="item">
      <h1 className="big-title color-blue">Never Lose <br /><span>Your Stuff Again</span></h1>

      <p>Or if you do, make it easy <br /> for someone to return it.</p>

      <p className="cta">
        <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
        <Link className="btn btn-primary more" to="/signup">Learn More</Link>
      </p>
    </div>
    <div className="item">
      <img src="images/hero.svg" />
    </div>
  </div>;

const About = () =>
  <div>
    <div className="hero-bg"></div>

    <section className="what color-blue container big">
      <div className="row">
        <div className="col-md-6">
          <h3 className="big-title color-blue smaller"><span>What is Lost Item?</span></h3>

          <p><strong>Lost Item</strong> gives you a link, which you can put things that you own.</p>

          <p>Them, if someone finds something you lose, they can contact you to let you know.</p>

          <p>For example, I have a sticker that says <Link to="/eric">www.lost-item.com/eric</Link> on it. So if anyone finds phone, it will be easy for them to figure out who it belongs to.</p>

          <p>
            <Link to="/eric">Click here</Link> to see an example.
          </p>

          <p className="cta">
            <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
          </p>
        </div>
        <div className="col-md-6 right">
          <h3 className="big-title color-blue smaller">Why wouldn&apos;t I just <br /><span>write my name on my stuff?</span></h3>

          <p>You could, but this is easier.</p>

          <p>Also, what if the person who finds it doesn&apos;t know you? Or if you don&apos;t want to put your personal information on the item? For example, you might not want to attach a tag to your keys that says &quot;If found, please return to 123 My House Lane.&quot;</p>

          <p>So basically, Lost Item makes it easy for someone to contact you if they find your stuff.</p>

          <p className="cta">
            <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
          </p>
        </div>
      </div>
    </section>

    <section className="price container">
      <h2 className="big-title color-blue center smaller">How much <span>does it cost?</span></h2>
      <div className="row mb-3 mt-3">
        <div className="col-md-5 shadow">
          <div className="price-card-head">
            <p>Random link</p>
          </div>

          <p className="zero free blue">0 <span>$</span></p>
          
          <div className="cta">
            <Link className="btn btn-primary" to="/signup">Sign up</Link>
          </div>

          <ul>
            <li>Unique link that can be attached to anything</li>
            <li>Automated email when someone finds your lost item</li>
            <li className="disabled">Customizable link. Like lost-item.com/eric</li>
            <li className="disabled">Automated SMS when someone finds your lost item</li>
          </ul>

        </div>

        <div className="col-md-5 offset-md-2 shadow">
          <div className="price-card-head">
            <p>Custom link</p>
          </div>

          <p className="zero free blue">
            1.99 <span>$</span>
            <p className="billed-note">per month, billed annually</p>
          </p>

          <div className="cta">
            <Link className="btn btn-primary" to="/signup">Sign up</Link>
          </div>

          <ul>
            <li>Unique link that can be attached to anything</li>
            <li>Automated email when someone finds your lost item</li>
            <li>Customizable link. Like lost-item.com/eric</li>
            <li>Automated SMS when someone finds your lost item</li>
          </ul>

        </div>
      </div>
    </section>

    <section className="often container">
      <h2 className="big-title color-blue center smaller">Why did <span>you make this?</span></h2>

      <p>I lose stuff. Often. Obviously, it&apos;s kind of a problem.</p>

      <p className="cta container">
        <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
      </p>
    </section>
  </div>;

const Home = () =>
  <div>
    <HeroUnit />
    <About />
  </div>;

export default Home;
