import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** DisplayValue:
 * This component uses the client connection to find and subscribe to a
 * particular INode. Using a seperate component per INode prevents us
 * from having to refresh the whole node-tree whenever a value changes and
 * just updates the DOMnode we need
 */
export default class DisplayValue extends Component {
  state = {
    value: 0
  };

  componentWillMount() {
    const { client, INodeAddress } = this.props;
    if (!client || !INodeAddress) {
      throw new Error('DisplayValue: Parameters missing!');
    }

    /** Find the INode we want to connect to */
    client.find(INodeAddress).then(node => {
      console.log(node);

      /** Subscribe to any child values this node has. Whenever there is a change, the acompanying callback will be run */
      node.subscribeToChildValues('Value', value => {
        /** Update state, so that we re-render the component three */
        this.setState({ value, name: node.name() });
      });
    });
  }

  componentWillUnmount() {
    // node.unsubscribeFromValues(valueConsumer)
  }

  render() {
    const { value, name } = this.state;
    return (
      <div>
        {name}: {value}
      </div>
    );
  }
}

DisplayValue.propTypes = {
  client: PropTypes.object.isRequired,
  INodeAddress: PropTypes.string.isRequired
};
