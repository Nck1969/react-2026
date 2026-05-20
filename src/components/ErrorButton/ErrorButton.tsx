import { Component } from 'react';
import styles from './ErrorButton.module.css';

interface State {
  shouldThrow: boolean;
}

export default class ErrorButton extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  private handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error triggered by ErrorButton');
    }
    return (
      <button className={styles.button} onClick={this.handleClick}>
        Throw error
      </button>
    );
  }
}
