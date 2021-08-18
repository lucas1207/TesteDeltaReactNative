import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Menu from '../pages/Menu';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Menu" component={Menu} />
    <Screen name="Home" component={Home} />

  </Navigator>
);

export default AppRoutes;
