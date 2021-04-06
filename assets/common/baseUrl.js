import { Platform } from 'react-native';

// let baseUrl = 'https://easy-shop-server-hn.herokuapp.com/api/v1/';

{Platform.OS == 'android'
    ? baseUrl = 'http://192.168.1.35:3000/api/v1/'
    : baseUrl = 'http://localhost:3000/api/v1/'
}

export default baseUrl;