/* eslint-disable max-len */
import React from "react";
import { withRouter } from "react-router";

class Testimonials extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="testimonials row">
          <div className="page-title">
            <h1>People Who Don’t Get Lost</h1>
            <p>See what people Lost Item users have to say</p>
          </div>
          <div className="col-md-12">
            <div className="col-md-6 col-sm-12">
              <div className="testimonial">
                <div className="msg">
                  <p className="title">MISSbehavin Suit Jacket</p>
                  <p className="content">
                    Michael Scott of Scott’s Tots renown, once lost his best
                    suit jacket just hours before a high stake business
                    negotiation. However, thanks to his personalized link being
                    stitched into the hot pink lining, he was able to get the
                    jacket back in the nick of time, resulting in a 12% raise.
                    He now places his Lost Item on all of his most valuable
                    belongings.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/mike.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Michael Scott</p>
                    <p className="desc">
                      Founder Scott’s Totts, 17x Dundee Winner, World’s Best
                      Boss
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">Incredibly Detailed Disguise</p>
                  <p className="content">
                    Superma…*ahem* excuse me Clark Kent, has two personalized
                    Lost Item links. The second is for Clark Kent, and the first
                    is what happens when you shop online after too much wine.
                    Wary of the repercussions if he lost his glasses, Clark
                    attaches the correct link to each pair.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/clark.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Clark Kent</p>
                    <p className="desc">
                      Red underpants wearer, journalist, lover of a bold
                      Cabernet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">Wallet</p>
                  <p className="content">
                    Bill Clinton uses lost-item. Despite being a former
                    president of the United States and having an IQ over over
                    220, he is surprisingly forgetful! One time, he left his
                    wallet at a United Nations dinner with 4 of the G7 heads of
                    state, and the prime minister of Japan returned his wallet
                    using Lost Item.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/clinton.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Bill Clinton</p>
                    <p className="desc">
                      Former president, Saxophone enthusiast
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">A Lot</p>
                  <p className="content">
                    Kanye West is a long time lost-item user. Probably no
                    surprise here, but Kanye is forgetful AF. Believe it or not,
                    he has lost item solid gold, engraved license plate holders
                    for all of his cars, including his mid 1990s Ferrari
                    collection
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/kayne.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Kanye West</p>
                    <p className="desc">
                      He said he’d let me finish writing this sentence, and he
                      did, but I forgot what I was going to write. My B
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">Professional Dignity</p>
                  <p className="content">
                    Me, the copywriter for this page. After I lost the sheet of
                    testimonials for this page, and had to make up new ones the
                    day before the site was supposed to go live, I now use Lost
                    Item for all of my belongings.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/writer.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Me</p>
                    <p className="desc">
                      Person hoping their boss doesn’t read these testimonials
                      to closely
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="testimonial">
                <div className="msg">
                  <p className="title">Nemo</p>
                  <p className="content">
                    After losing his son Nemo, Marlin the Clownfish, placed his
                    Lost Item sticker on his son and now rests easy. Dory
                    ordered stickers with an address in Sydney, AU but forgot
                    where she put them...if only she’d had a Lost Item sticker
                    for her stickers.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/marlin.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Marlin</p>
                    <p className="desc">
                      Funny fish, 100 mi. swimmer, battler of sharks & jellyfish
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">The One Ring</p>
                  <p className="content">
                    Frodo Baggins uses Lost Item after a mishap on the way to
                    Mordor almost ended the Trilogy 700 pages too soon.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/frodo.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Frodo Baggins</p>
                    <p className="desc">
                      Tends to ghost when a ring gets mentioned
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">Abode Cloud Password</p>
                  <p className="content">
                    If you thought having a posse of personal assistants meant
                    icon Kim K wouldn’t need a Lost Item subscription, you’d be
                    wrong. Always jetsetting from one locale to another, Kim K
                    attaches her personal link to her Photoshop login info, so
                    that it’s there at a selfie’s notice.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/kim.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Kim K</p>
                    <p className="desc">
                      Lover of tandem motorcycle rides, future lawyer (no
                      really)
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">A Pinch of Pepper Grinders</p>
                  <p className="content">
                    Emeril Lagasse of New Orleans and Food Network fame became a
                    Lost Item user after he kept losing his spice mixes. Its
                    important to always have a pepper grinder handy if you want
                    to be able to "kick it up a notch" and Lost Item makes sure
                    if he ever loses a pepper grinder, he'll get it back!
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/emeril.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Emeril Lagasse</p>
                    <p className="desc">
                      James Beard Winner, 1st celebrity chef to have meals
                      delivered in space
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="msg">
                  <p className="title">iPhone 10x</p>
                  <p className="content">
                    For Sports Illustrated swimsuit model Kate Upton, Lost Item
                    is a must have service. When you're only wearing a bikini,
                    it's just too easy to lose a phone or wallet -- there just
                    aren't any pockets! While money isn't really a problem for
                    an A-lister like Kate, we are proud to say that we've helped
                    her recover her phone over 10 times.
                  </p>
                  <div className="msg-pointer"></div>
                </div>
                <div className="sender">
                  <div
                    className="pic"
                    style={{
                      backgroundImage: `url(../../images/testimonials/kate.png)`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="name">Kate Upton</p>
                    <p className="desc">
                      5x World Champion Equestrian, Animal Lover, Cover Model
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="disclaimer">
            The characters and events depicted in these testimonials are
            fictitious. Any similarity to actual persons, living or dead, is
            purely coincidental.
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Testimonials);
