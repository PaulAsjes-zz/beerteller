import * as React from 'react';
import './App.css';
import data from './data';
import Option from './Option';
import RestartButton from './RestartButton';

const logo = require('./logo.svg');

class App extends React.Component {

  public state = {
    current: 1,
  };

  public render() {
    const question = this.getQuestion(this.state.current);
    const options = question.options || [];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Beerteller</h2>
        </div>
        <div className="Container">
          <div className="Content">
            <div>{question.text}</div>
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
