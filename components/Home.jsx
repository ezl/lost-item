import React from 'react';

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
        Lost Item is a site that gives you a permanent link, which you can stick on
        things that you own.
      </p>
      <p>
        For example, I have a sticker that says <a href="http://www.lost-item.com/eric">www.lost-item.com/eric</a> on it. So if anyone finds my phone, it will be easy for them to figure out who it belongs to.
      </p>
      <p>
        With your own www.lost-item.com link, if you ever lose something, whoever finds it
        will easily be able to get it back to you.
      </p>
      <p>
        <a href="/eric">Click here</a> to see an example.
      </p>
      <p className="cta">
        <a className="btn btn-primary" href="/signup">Oh, cool. Sign me up.</a>
      </p>
    </section>
    <section>
      <h3>Why wouldn't I just write my name on my stuff?</h3>
      <p>
        You could, but this is easier.
      </p>
      <p>
        Also, what if the person who finds it doesn't know you? Or if you don't want to put your personal
        information on the item? For example, you might not want to attach a tag to your keys that says
        "If found, please return to 123 My House Lane."
      </p>
      <p>So basically, Lost Item makes it easy for someone to contact you if they find your stuff.</p>
      <p className="cta">
        <a className="btn btn-primary" href="/signup">Oh, cool. Sign me up.</a>
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
        <a className="btn btn-primary" href="/signup">Oh, cool. Sign me up.</a>
      </p>
    </section>
    <section>
      <h3>Why did you make this?</h3>
      <p>
        I lose stuff. Often. Obviously, it's kind of a problem.
      </p>
      <p className="cta">
        <a className="btn btn-primary" href="/signup">Oh, cool. Sign me up.</a>
      </p>
    </section>
  </div>;

const Home = () =>
  <div>
    <HeroUnit />
    <About />
  </div>;

export default Home;
