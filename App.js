import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message';

//Context API
import Auth from './context/store/Auth';

//Navigators
import Main from './navigators/Main';

//Screens
import { Header } from './Shared/Header';

export default function App() {
  return (
    <Auth>
      <Provider store={ store }>
        <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref) } />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
