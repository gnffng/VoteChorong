import React from 'react';
import { StyleSheet } from 'react-native';

import Theme from '../utilities/Demensions';
import { baseColor, subColor, selectedColor } from './CommonStyle';

export const utilityStyles = StyleSheet.create({
    backPannel: {
        position: 'absolute',
        width: Theme.deviceWidth,
        height: Theme.deviceHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.35)'
    },

    customPannel: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        top: (Theme.deviceHeight - Theme.deviceWidth * 0.5) / 3,
        left: Theme.deviceWidth * 0.15,
        width: Theme.deviceWidth * 0.7,
        height: Theme.deviceWidth * 0.5
    },

    callAndMessagePannel: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        top: (Theme.deviceHeight - Theme.deviceWidth * 0.5) / 4,
        left: Theme.deviceWidth * 0.15,
        width: Theme.deviceWidth * 0.7,
        height: Theme.deviceWidth
    },

    icon: {
        width: Theme.deviceHeight * 0.35 * 4 / 19
    },

    mainText: {
        fontSize: Theme.fontSizes.fontSizes14,
        color: 'black',
        fontWeight: "800",
        textAlign: 'center'
    },

    subText: {
        fontSize: Theme.fontSizes.fontSizes12 * 0.8,
        color: 'gray',
        fontWeight: "800",
        textAlign: 'center'
    }

});