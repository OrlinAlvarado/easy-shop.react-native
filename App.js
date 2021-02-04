import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';


//Navigators
import Main from './navigators/Main';

//Screens
import { Header } from './Shared/Header';

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
          <Header />
          <Main />
      </NavigationContainer>
    </Provider>
  );
}
