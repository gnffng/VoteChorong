import React from 'react';
import { StyleSheet } from 'react-native';

import Theme from '../utilities/Demensions';
import { baseColor, subColor, selectedColor } from './CommonStyle';

export const detailContactStyles = StyleSheet.create({
    additionalPannel: {
        position: 'absolute',
        backgroundColor: baseColor,
        width: Theme.width * 100,
        height: Theme.height * 130,
        right: 0,
        paddingVertical: 15,
        paddingHorizontal: 20
    },

    additionalPannelItem: {
        flex: 1
    },

    additionalPannelItemText: {
        color: 'white',
        textAlign: 'center',
        fontSize: Theme.fontSizes.fontSizes12 * 1.3,
        borderBottomColor: '#749BFF',
        borderBottomWidth: 2
    },

});