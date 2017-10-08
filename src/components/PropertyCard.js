import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { iconsMap, iconsLoaded } from './../utils/AppIcons';
import ProgressiveImage from './ProgressiveImage';
const { width } = Dimensions.get('window');

const Wrapper = styled.View`
  height: 280px;
  width: 220px;
  width: ${props => props.fullWidth ? width : '220px'};
  margin: ${props => props.fullWidth ? 0 : '5px'};
  border: 1px solid #E3E3E3;
`;

const PropertyCard = ({ property, onCardPress, fullWidth }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableWithoutFeedback onPress={() => onCardPress(property)}>
                <Wrapper fullWidth={fullWidth}>
                    <ProgressiveImage
                        source={{ uri: property.thumbnail }}
                        thumbnail={require('../images/house_placeholder.png')}
                        style={{ width: '100%', height: 160 }} />

                    <Text></Text>
                    <Text>{property.post_title}</Text>
                </Wrapper>
            </TouchableWithoutFeedback>
            <Image
                style={{ height: 30, width: 30, tintColor: 'red', position: 'absolute', top: 20, right: 20 }}
                source={(Platform.OS === 'ios') ? iconsMap['ios-heart'] : iconsMap['md-heart']}
            />
        </View>
    );
};

PropertyCard.propTypes = {
    property: PropTypes.object.isRequired,
    onCardPress: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
};

export default PropertyCard;