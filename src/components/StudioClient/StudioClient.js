import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * StudioClient: StudioClient's render function returns the client-object connected to the Studio Client.
 * @param {studioURL} studioUrl
 * @param {studio} studio
 * @param {render} render
 */
export default class StudioClient extends React.Component {
  componentWillMount() {
    const { studio, studioUrl } = this.props;

    console.log(studioUrl);

    /** Check that we actually got a studio prop at all */
    if (!studio || !studioUrl) {
      throw new Error(
        'StudioClient: Missing paramater - unable to initialize connection!'
      );
    }

    /** Create a connection to the Studio Application */
    const client = new studio.api.Client(studioUrl);

    /** Update our state with the Studio Application Client */
    this.setState({ client });
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    let { client } = this.state;
    return <React.Fragment>{this.props.render(client)}</React.Fragment>;
  }
}

StudioClient.propTypes = {
  studioUrl: PropTypes.string.isRequired,
  studio: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
};
