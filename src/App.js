import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/** Components */
import StudioClient from './components/StudioClient/StudioClient';
import INode from './components/INode/INode';

/** Initialize a HTML element, that we will use to inject our React App into the DOM */
const el = React.createElement;

/**
 * App: This is the root component for our react-app. Here we call the StudioClient component,
 * pass it the studio instance from the <script>-tag and add in any aditional components.
 * @param {studio} studio
 */
function App(props) {
  return (
    <div className='App'>
      <h1>StudioAPI Boilerplate😎</h1>
      <StudioClient
        studio={props.studio}
        studioUrl='127.0.0.2:7689'
        render={client => (
          <React.Fragment>
            <INode
              client={client}
              INodeAddress='NMEAGPSApp.NMEAOnSerial.GPGGA_Receive.Latitude'
            />
            <INode
              client={client}
              INodeAddress='NMEAGPSApp.NMEAOnSerial.GPGGA_Receive.Longitude'
            />
            <INode client={client} INodeAddress='NMEAGPSApp.CPULoad' />
          </React.Fragment>
        )}
      />
    </div>
  );
}

App.propTypes = {
  studio: PropTypes.object.isRequired
};

/** ReactDOM adds the ApiWrapper to the DOM and passes studio as a prop. This exposes the studio API added in the index.html file to React! :) */
ReactDOM.render(<App studio={studio} />, document.getElementById('root'));
