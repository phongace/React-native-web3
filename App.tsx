/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import './global';
import InteractWithWeb3 from './src/InteractWithWeb3';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <InteractWithWeb3 />
    </SafeAreaView>
  );
}

export default App;
