import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** We can use an array to store all the signals we would like to view. We can then pass this to a component in order to
 * automatically generate react components for the values we want to display using Array.map(). Here we import the array
 * and then we will use that to render INode components for every entry. We could also have refactored INodeSchema to
 * take this schema as a prop*/
import INode from '../INode/INode';
import Schema from './schema';

/** Takes the client object and a list, and displays the values for all INodes in the list
 * @param {object} client Client connection initialized in the StudioClient component
 */
export default class INodeSchema extends Component {
  render() {
    const { client } = this.props;
    const INodes = Schema.map((node, index) => (
      <INode key={index} client={client} INodeAddress={node.address} />
    ));
    return <React.Fragment>{INodes}</React.Fragment>;
  }
}

INodeSchema.propTypes = {
  client: PropTypes.object.isRequired
};
