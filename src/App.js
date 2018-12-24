import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/** Components */
import DisplayValue from './components/DisplayValue/DisplayValue.js';

/** StudioAPI Wrapper, written by Jens Kristian Hoel - 2018
 * This enables us to reuse the vanilla StudioAPI.js that ships with CDP Studio
 */

const el = React.createElement;

/** ApiWrapper:
 * This is the main API Wrapper. It should set up the client connection, and serve
 * this to all other subcomponents that needs to talk to the API
 */
class ApiWrapper extends React.Component {
  componentWillMount() {
    const { studio } = this.props;

    /** Check that we actually got a studio prop at all */
    if (!studio) {
      throw new Error('ApiWrapper: Studio instance is missing');
    }

    /** Create a connection to the Studio Application */
    const client = new studio.api.Client('127.0.0.2:7689');

    /** Update our state with the Studio Application Client */
    this.setState({ client });
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    let { client } = this.state;
    return (
      <div>
        <h1>StudioAPI in React!😎</h1>
        <DisplayValue
          client={client}
          INodeAddress='NMEAGPSApp.NMEAOnSerial.GPGGA_Receive.Latitude'
        />
        <DisplayValue
          client={client}
          INodeAddress='NMEAGPSApp.NMEAOnSerial.GPGGA_Receive.Longitude'
        />
      </div>
    );
  }
}

/** ReactDOM adds the ApiWrapper to the DOM and passes studio as a prop. This exposes the studio API added in the index.html file to React! :) */
ReactDOM.render(
  <ApiWrapper studio={studio} />,
  document.getElementById('root')
);
