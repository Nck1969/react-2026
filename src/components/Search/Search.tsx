import { Component } from 'react';
import styles from './Search.module.css';

interface Props {
  initialTerm: string;
  onSearch: (term: string) => void;
}

interface State {
  value: string;
}

export default class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: props.initialTerm };
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') this.props.onSearch(this.state.value);
  };

  private handleClick = () => {
    this.props.onSearch(this.state.value);
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search pokemon..."
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className={styles.button} onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
}
