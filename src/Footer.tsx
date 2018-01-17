import * as React from 'react';
import './Footer.css';

class Footer extends React.Component {

  public render() {
    return (
      <div className="Footer">
          Made with ♥ by <a href="https://twitter.com/paul_asjes">@paul_asjes</a>.
          Inspired by <a href="http://coolmaterial.com/food-drink/flowchart-what-style-of-beer-should-you-drink/">
            Cool Material. 
          </a>
          Icon by Vectors Market from <a href="https://www.flaticon.com">flaticon</a>
      </div>
    );
  }
}

export default Footer;
