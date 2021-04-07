import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Error from '../../Shared/Error';
import FormContainer from '../../Shared/form/FormContainer';
import Input from '../../Shared/form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseUrl';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
const Register = (props) => {
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = () => {
        let user = {
            name,
            email,
            password,
            phone,
            isAdmin: false
        }
        if(email === "" || 
            name ==="" || 
            phone ==="" || 
            password ==="" || 
            password2 ==="" 
        ){
            setError("Please fill in the form correctly"); 
        } else if( password !== password2){
            setError("Passwords does not match"); 
        }
        else {
            setError();
            axios
                .post(`${ baseURL }users/register`, user )
                .then((res) => {
                    if(res.status == 201){
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: 'Register succeeded',
                            text2: 'Please login into your account'
                        })
                        setTimeout(() => {
                            props.navigation.navigate("Login");
                        }, 500);
                    }
                })
                .catch((error) => {
                    console.log('error');
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: 'Something went wrong',
                        text2: 'Please try again'
                    })
                })
        }
    }
    
    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={ true }
            extraHeight={ 200 }
            enableOnAndroid={ true }
        >
        <FormContainer title="Register">
            <Input 
                placeholder="Enter Email"
                name="email"
                id="email"
                value={ email }
                onChangeText={ (text) => setEmail(text.toLowerCase()) }
            />
            <Input 
                placeholder="Enter Name"
                name="name"
                id="name"
                value={ name }
                onChangeText={ (text) => setName(text) }
            />
            <Input 
                placeholder="Enter Phone"
                name="phone"
                id="phone"
                value={ phone }
                onChangeText={ (text) => setPhone(text) }
                keyboardType="numeric"
            />
            <Input 
                placeholder="Enter Password"
                name="password"
                id="password"
                secureTextEntry={ true }
                value={ password }
                onChangeText={ (text) =>  setPassword(text) }
            />
            <Input 
                placeholder="Repeat Password"
                name="password2"
                id="password2"
                secureTextEntry={ true }
                value={ password2 }
                onChangeText={ (text) =>  setPassword2(text) }
            />
            <View style={ styles.buttonGroup }>
                { error ? <Error message={ error } />: null }
                <EasyButton 
                    large
                    primary
                    onPress={ () => handleSubmit() } 
                >
                    <Text style={{ color: "white"}}>Register</Text>
                </EasyButton>
            </View>
            <View style={[ { marginTop: 40 }, styles.buttonGroup] }>
                <Text style={ styles.middleText}>Already registered?</Text>
                <EasyButton 
                    large
                    secondary
                    onPress={ () =>  props.navigation.navigate('Login') } 
                >
                    <Text style={{ color: "white"}}>Back to ogin</Text>
                </EasyButton>
            </View>
            
            
        </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: 'center'
    }
})

export default Register
