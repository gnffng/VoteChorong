import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainScreen';
import VoteConfigScreen from './VoteConfigScreen';
import VoteScreen from './VoteScreen';
import VoteResultScreen from './VoteResultScreen';
import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

export default function Navigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="MAIN"
                    component={MainScreen}
                    options={{
                        title: '메인화면',
                        headerShown: false}} />

                <Stack.Screen
                    name="VOTECONFIG"
                    component={VoteConfigScreen}
                    options={{
                        title: '투표설정',
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="VOTE"
                    component={VoteScreen}
                    options={{
                        title: '투표',
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="RESULT"
                    component={VoteResultScreen}
                    options={{
                        title: '투표결과',
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="DETAIL"
                    component={DetailScreen}
                    options={{
                        title: '투표결과상세',
                        headerShown: false
                    }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}