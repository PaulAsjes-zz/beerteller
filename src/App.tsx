import * as React from 'react';
import './App.css';
import data from './data';
import Option from './Option';
import RestartButton from './RestartButton';
import Wave from './Wave';

const logo = require('./logo.svg');

class App extends React.Component {

  public state = {
    current: 1,
    width: 0,
    height: 0,
  };

  private waveContainer: HTMLDivElement | null;

  public componentDidMount() {
    if (this.waveContainer) {
      this.setState({
        width: this.waveContainer.offsetWidth,
        height: this.waveContainer.offsetHeight,
      });
    }
  }

  public render() {
    const question = this.getQuestion(this.state.current);
    const options = question.options || [];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Beerteller</h2>
        </div>
        <div className="Wave-container" ref={waveContainer => this.waveContainer = waveContainer}>
          <Wave width={this.state.width} height={this.state.height}/>
        </div>
        <div className="Container">
          <div className="Content">
            <div className={options.length ? '' : 'Result'}>
              {question.text}
            </div>
            <div className="Options">
              {options.map((option: string, index: number) => {
                return <Option text={option} key={index} onClick={this.handleClick.bind(this, question.next[index])}/>;
              })}
            </div>
            {
              options.length < 1 ? 
              <RestartButton onClick={this.restart.bind(this)} />
              : null
            }
          </div>
        </div>
        <div className="Footer">
            Made with ♥ by <a href="https://twitter.com/paul_asjes">@paul_asjes</a>. Inspired by <a href="http://coolmaterial.com/food-drink/flowchart-what-style-of-beer-should-you-drink/">Cool Material</a>
        </div>
      </div>
    );
  }

  private restart() {
    this.setState({
      current: 1,
    });
  }

  private getQuestion(num: number) {
    return data[`q${num}`];
  }

  private handleClick(next: number) {
    this.setState({
      current: next,
    });
  }
}

export default App;
