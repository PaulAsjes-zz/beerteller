import * as React from 'react';
import './App.css';
import data from './data';
import Question from './Question';
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
  // path of decision tree, always starts at question 1
  private path: Array<number> = [1];

  public componentDidMount() {
    // update the wave container if the window is resized
    window.addEventListener('resize', this.updateWindow.bind(this));

    this.updateWindow();
  }

  public render() {
    const question = this.getQuestion(this.state.current);
    const options = question.options || [];

    // const prevQuestion = this.getQuestion(this.path[this.path.length - 2]);

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
            <Question 
              options={options} 
              questionText={question.text} 
              next={question.next}
              show={true}
              optionClickFn={(next) => this.handleClick(next)}
              restartClickFn={() => this.restart()}                            
            />                        
              {/* {
                prevQuestion ? 
                  <Question
                    options={prevQuestion.options || []}
                    questionText={prevQuestion.text}
                    next={prevQuestion.text}
                    show={false}
                    optionClickFn={this.handleClick.bind(this)}
                    restartClickFn={this.restart.bind(this)}
                  />
                : null
              } */}
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
    return num ? data[`q${num}`] : null;
  }

  private handleClick(next: number) {
    this.path.push(next);

    this.setState({
      current: next,
    });
  }
}

export default App;
