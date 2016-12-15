import React from 'react';
import { Link } from 'react-router';

class HeroUnit extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1>Never Lose Your Stuff Again</h1>
          <p>Or if you do, make it easy for someone to return it.</p>
        </div>
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    return (
      <div>
        <p>
          <strong>What Is Lost-Item.Com?</strong> It's a site that gives you a permanent link,
          which you attach to things you own. Then, if you ever lose something, whoever finds it
          can know who to contact to return it.
        </p>
        <p>
          <strong>Can I see an example?</strong> Sure! <a href="/eric">Click here</a>.
        </p>
        <p>
          <strong>Why wouldn't I just write my name on my stuff</strong> You could, but this is easier. 
          Also, what if the person who finds it doesn't know you? Or if you don't want to put your personal
          information on the item (For example, you might not want to attach a note to your keys that says "If found, please return
          to &lt; <em>you address</em> &gt;.")
        </p>
        <p>
          <strong>How much does it cost?</strong> Free. You get your own permanent link, for free. We make money by selling custom links (like vanity license plates), selling stickers, labels, and nametags with your link professionally printed on it, and through donations (like when people get their stuff returned to them).
        </p>
        <p>
          <strong>OK I'm sold. How do I get one of these?</strong> Just <a href='/signup'>sign up here</a>.
        </p>
        <p>
          <strong>Why did you make this?</strong> I lose stuff. All the time.
        </p>
      </div>
    )
  }
}


function Home() {
  const reactLink = 'https://github.com/facebook/react';
  const reactRouterLink = 'https://github.com/reactjs/react-router';
  const ghPagesLink = 'https://pages.github.com/';
  const repoReadmeLink = 'https://github.com/rafrex/spa-github-pages#readme';

  return (
    <div>
      <HeroUnit />
      <About />
    </div>
  );
}

export default Home;
