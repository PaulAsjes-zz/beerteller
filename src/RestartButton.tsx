import * as React from 'react';
import './RestartButton.css';

interface Props {
  onClick(event: {}): void;
}

class RestartButton extends React.Component<Props> {

  public render() {
    return (
      <div className="Restart" onClick={this.props.onClick}>
        Restart
      </div>
    );
  }
}

export default RestartButton;