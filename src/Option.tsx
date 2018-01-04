import * as React from 'react';
import './Option.css';

interface Props {
  text: string;
  onClick(event: {}): void;
}

class Option extends React.Component<Props> {

  public render() {
    return (
      <div className="Option" onClick={this.props.onClick}>
        <div className="Option-label">
          <h2>{this.props.text}</h2>
        </div>
      </div>
    );
  }
}

export default Option;