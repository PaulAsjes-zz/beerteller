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
      // trigger DOM refresh
      /* tslint:disable */
      findDOMNode(this).clientHeight;
      /* tslint:enable */

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

    const isResult = options.length < 1;

    return (
      <div className={`Question ${this.state.show ? 'slideIn' : 'slideOut'}`} >
        {isResult ? 
          <span>
            <div>You should drink</div> 
            <div className="Result">
              <a href={`https://www.google.com/search?q=${this.toSearchStr(questionText)}`}>{questionText}</a>
            </div>
          </span>
          : 
          <div>{questionText}</div>
          }        
        <div className="Options">
          {options.map((option: string, index: number) => {
            return <Option text={option} key={index} onClick={(e) => optionClickFn(next[index])}/>;
          })}
        </div>
        {
          isResult ? 
          <RestartButton onClick={() => restartClickFn()} />
          : null
        }
      </div>
    );
  }

  private toSearchStr(str: string): string {
    return str.toLowerCase().replace(' ', '+');
  }
}

export default Question;
