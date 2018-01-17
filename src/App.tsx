import * as React from 'react';
import './App.css';
import data from './data';
import Option from './Option';
import RestartButton from './RestartButton';
import Wave from './Wave';
import Footer from './Footer';

const logo = require('./logo.svg');

class App extends React.Component {

  public state = {
    current: 1,
    width: 0,
    height: 0,
    // if there's a touchscreen, it's probably mobile.
    wavePoints: navigator.maxTouchPoints ? 2 : 4,
  };

  private waveContainer: HTMLDivElement | null;

  public componentDidMount() {
    // update the wave container if the window is resized
    window.addEventListener('resize', this.updateWindow.bind(this));

    this.updateWindow();
  }

  public render() {
    const question = this.getQuestion(this.state.current);
    const options = question.options || [];

    return (
      <div className="App">
        <div className="App-header">
          <a href="#">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Beerteller</h2>
          </a>
        </div>
        <div className="Wave-container" ref={waveContainer => this.waveContainer = waveContainer}>
          <Wave 
            width={this.state.width} 
            height={this.state.height} 
            points={this.state.wavePoints}
            waveHeight={100}
            waveDelta={10}
            speed={.7}
          />
        </div>
        <div className="Container">
          <div className="Content">
            <div className={options.length ? '' : 'Result'}>
              {question.text}
            </div>
            <div className="Options">
              {options.map((option: string, index: number) => {
                return <Option text={option} key={index} onClick={() => this.handleClick(question.next[index])}/>;
              })}
            </div>
            {
              options.length < 1 ? 
              <RestartButton onClick={() => this.restart()} />
              : null
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  private updateWindow() {
    if (this.waveContainer) {
      this.setState({
        width: this.waveContainer.offsetWidth,
        height: this.waveContainer.offsetHeight,
      });
    }
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
