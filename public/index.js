import * as serviceWorker from './serviceWorker';

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
    const client = new studio.api.Client('127.0.0.3:7689');

    /** Update our state with the Studio Application Client */
    this.setState({ client });
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  // render() {
  //   let { client } = this.state;
  //   return (
  //     <div>
  //       <h1>StudioAPI in React!😎</h1>
  //       <DisplayValue
  //         client={client}
  //         INodeAddress="NMEAGPSApp.NMEAOnSerial.GPGGA_Receive.Latitude"
  //       />
  //       <DisplayValue
  //         client={client}
  //         INodeAddress="NMEAGPSApp.NMEAOnSerial.GPGGA_Receive.Longitude"
  //       />
  //     </div>
  //   );
  // }

  render() {
    let { client } = this.state;
    return (
      <div>
        <h1>StudioAPI in React!😎</h1>
        <DisplayValue
          client={client}
          INodeAddress="StudioAPItest.FakeComponent1.Name"
        />
      </div>
    );
  }
}

/** DisplayValue:
 * This component uses the client connection to find and subscribe to a
 * particular INode. Using a seperate component per INode prevents us
 * from having to refresh the whole node-tree whenever a value changes and
 * just updates the DOMnode we need
 */
class DisplayValue extends React.Component {
  state = {
    value: 0,
  };

  componentWillMount() {
    const { client, INodeAddress } = this.props;
    if (!client || !INodeAddress) {
      throw new Error('DisplayValue: Parameters missing!');
    }

    /** Find the INode we want to connect to */
    client.find(INodeAddress).then((node) => {
      console.log(node);

      /** Subscribe to any child values this node has. Whenever there is a change, the acompanying callback will be run */
      node.subscribeToChildValues('Value', (value) => {
        console.log(value);
        /** Update state, so that we re-render the component three */
        this.setState({ value });
      });
    });
  }

  componentWillUnmount() {
    // node.unsubscribeFromValues(valueConsumer)
  }

  render() {
    const { value } = this.state;
    return <div>Value: {value}</div>;
  }
}

/** ReactDOM adds the ApiWrapper to the DOM and passes studio as a prop. This exposes the studio API added in the index.html file to React! :) */
ReactDOM.render(
  <ApiWrapper studio={studio} />,
  document.getElementById('test'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
