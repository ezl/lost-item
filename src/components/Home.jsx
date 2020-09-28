import React from 'react';
import { Link } from 'react-router-dom';

const HeroUnit = () =>
  <div className="jumbotron">
    <h1>Never Lose Your Stuff Again</h1>
    <p>Or if you do, make it easy for someone to return it.</p>
  </div>;

const About = () =>
  <div>
    <section>
      <h3>What is Lost Item?</h3>
      <p>
        <strongLost Item</strong> gives you a link, which you can put
        things that you own.
      </p>
      <p>
        Them, if someone finds something you lose, they can contact you to let you know.
      </p>
      <p>
        For example, I have a sticker that says <Link to="/eric">www.lost-item.com/eric</Link> on it. So if anyone finds my phone, it will be easy for them to figure out who it belongs to.
      </p>
      <p>
        With your own www.lost-item.com link, if you ever lose something, whoever finds it
        will easily be able to get it back to you.
      </p>
      <p>
        <Link to="/eric">Click here</Link> to see an example.
      </p>
      <p className="cta">
        <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
      </p>
    </section>
    <section>
      <h3>Why wouldn&apos;t I just write my name on my stuff?</h3>
      <p>
        You could, but this is easier.
      </p>
      <p>
        Also, what if the person who finds it doesn&apos;t know you? Or if you don&apos;t want to put your personal
        information on the item? For example, you might not want to attach a tag to your keys that says
        &quot;If found, please return to 123 My House Lane.&quot;
      </p>
      <p>So basically, Lost Item makes it easy for someone to contact you if they find your stuff.</p>
      <p className="cta">
        <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
      </p>
    </section>
    <section>
      <h3>How much does it cost?</h3>
      <p>
        Free. You get your own permanent link, for free.
      </p>
      <p>
        In theory, we would make money by:
      </p>
      <ul>
        <li>by selling custom links (like vanity license plates)</li>
        <li>selling stickers, labels, and nametags with your link professionally printed on it</li>
        <li>through donations (for example, when a grateful person has his/her lost belongings returned due to someone reporting an item lost through this site)</li>
      </ul>
      <p>For now though, I just built this for myself so I would be able to recover items I lose.</p>
      <p className="cta">
        <Link className="btn btn-primary" to="/signup">Oh, cool. Sign me up.</Link>
      </p>
    </section>
    <section>
      <h3>Why did you make this?</h3>
      <p>
        I lose stuff. Often. Obviously, it&apos;s kind of a problem.
      </p>
      <p className="cta">
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
