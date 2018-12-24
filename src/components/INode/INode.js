import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** INode:
 * This component uses the client connection to find and subscribe to a
 * particular INode. Using a seperate component per INode prevents us
 * from having to refresh the whole node-tree whenever a value changes and
 * just updates the DOMnode we need
 * @param {object} client Client connection initialized in the StudioClient component
 * @param {string} INodeAddress INode Address from where to get the value to display
 */
export default class INode extends Component {
  state = {
    value: 0
  };

  componentWillMount() {
    const { client, INodeAddress } = this.props;
    if (!client || !INodeAddress) {
      throw new Error('INode: Parameters missing!');
    }

    /** Find the INode we want to connect to */
    client.find(INodeAddress).then(node => {
      /** Subscribe to any child values this node has. Whenever there is a change, the acompanying callback will be run */
      node.subscribeToChildValues('Value', value => {
        /** Update state, so that we re-render the component three */
        this.setState({ value, name: node.name() });
      });
    });
  }

  componentWillUnmount() {
    client.find(INodeAddress).then(node => {
      node.unsubscribeFromValues('Value');
    });
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

INode.propTypes = {
  client: PropTypes.object.isRequired,
  INodeAddress: PropTypes.string.isRequired
};
