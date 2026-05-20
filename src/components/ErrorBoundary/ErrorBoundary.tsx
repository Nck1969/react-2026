import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback}>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.subtitle}>
            An unexpected error occurred. Please try again.
          </p>
          <button className={styles.button} onClick={this.handleReset}>
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
