import React, { Component } from 'react';
import { withRouter } from 'react-router';

class NotFound extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const {
      location,
      history,
    } = this.props;

    history.push('not-found');
  }

  render() {

    return (
      <div style={{ marginTop: '5em'}}>
        Not fucking Found
      </div>
    );
  }
}

export default withRouter(NotFound);
