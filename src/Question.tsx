import *  as React from 'react';
import { findDOMNode } from 'react-dom';
import Option from './Option';
import RestartButton from './RestartButton';
import './Question.css';

interface Props {
  options: Array<string>;
  questionText: string;
  next: Array<number>;
  show: boolean;
  optionClickFn(next: number): void;
  restartClickFn(): void;
}

class Question extends React.Component<Props> {

  public state = {
    show: this.props.show,
  };

  public componentWillReceiveProps() {
    this.setState({
      show: false,
    }, () => {
      findDOMNode(this).clientHeight;

      this.setState({
        show: true,
      });
    });
  }

  public render() {
    const { 
      options,
      questionText,
      optionClickFn,
      restartClickFn,
      
      next,            
    } = this.props;

    return (
      <div className={`Question ${this.state.show ? 'slideIn' : 'slideOut'}`} >
        <div className={options.length ? '' : 'Result'}>
          {questionText}
        </div>
        <div className="Options">
          {options.map((option: string, index: number) => {
            return <Option text={option} key={index} onClick={(e) => optionClickFn(next[index])}/>;
          })}
        </div>
        {
          options.length < 1 ? 
          <RestartButton onClick={() => restartClickFn()} />
          : null
        }
      </div>
    );
  }
}

export default Question;
