import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Near Me</Text>
      </View>
    );
  }
}

searchPage.propTypes = {
  search: PropTypes.object.isRequired,
};

export default searchPage;
