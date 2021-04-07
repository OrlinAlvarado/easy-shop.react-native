import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { Form, Item, Picker } from 'native-base';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FormContainer from '../../../Shared/form/FormContainer';
import Input from '../../../Shared/form/Input';
import { connect } from 'react-redux';
import AuthGlobal from '../../../context/store/AuthGlobal';

const countries = require('../../../assets/data/countries.json');

const Checkout = ( props ) => {
    
    const context = useContext(AuthGlobal);
    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    const [user, setUser] = useState();
    
    useEffect( () => {
        setOrderItems( props.cartItems );
        
        if(context.stateUser.isAuthenticated){
            setUser(context.stateUser.user.userId );
        } else{
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            })
        }
        return () => {
            setOrderItems();
        }
    }, [])
    
    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            zip
        }
        
        props.navigation.navigate("Payment", { order });
    }
    
    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={ true }
            extraHeight={ 200 }
            enableOnAndroid={ true }
        >
            <FormContainer title="Shipping Address">
                <Input
                    placeholder= "Phone" 
                    name= "phone"
                    value={ phone }
                    keyboardType= "numeric" 
                    onChangeText={ (text) => setPhone(text) }
                />
                <Input
                    placeholder= "Shipping Addres 1" 
                    name= "ShippingAddress1"
                    value={ address }
                    onChangeText={ (text) => setAddress(text) }
                />
                <Input
                    placeholder= "Shipping Addres 2" 
                    name= "ShippingAddress2"
                    value={ address2 }
                    onChangeText={ (text) => setAddress2(text) }
                />
                <Input
                    placeholder= "City" 
                    name= "city"
                    value={ city }
                    onChangeText={ (text) => setCity(text) }
                />
                <Input
                    placeholder= "Zip Code" 
                    name= "zip"
                    value={ zip }
                    keyboardType= "numeric" 
                    onChangeText={ (text) => setZip(text) }
                />
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={ <Icon name="arrow-down" color= "#007aff" />}
                        // style={{ width: undefined }}
                        selectedValue={ country }
                        placeholder="Select your country"
                        placeholderStyle={{ color: '#007aff'}}
                        placeholderIconColor={{ color: '#007aff' }}
                        onValueChange={ (e) => setCountry(e) }
                    >
                        {
                            countries.map( (c) => {
                                return <Picker.Item 
                                            key={ c.code } 
                                            label={ c.name } 
                                            value={ c.name }
                                        />
                            })
                        }
                    </Picker>
                </Item>
                <View style={{ width: '80%', alignItems:"center" }}>
                    <Button title="Confirm" onPress={ () => checkOut()} />
                </View>
            </FormContainer>            
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems
    }
}

export default connect(mapStateToProps)(Checkout);
