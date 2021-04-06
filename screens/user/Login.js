import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Error from '../../Shared/Error';
import FormContainer from '../../Shared/form/FormContainer';
import Input from '../../Shared/form/Input';    

//Context
import AuthGlobal from '../../context/store/AuthGlobal';
import { loginUser } from '../../context/actions/Auth.actions';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

const Login = (props) => {
    
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState('oalvaradomorales@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    
    useEffect( () => {
        if( context.stateUser.isAuthenticated ){
            props.navigation.navigate('User Profile');
        }
    }, [context.stateUser.isAuthenticated])
    
    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        
        if(email === "" || password ===""){
            setError("Please fill in your credentials"); 
        } else {
            loginUser(user, context.dispatch);
        }
    }
    
    return (
        <FormContainer title="Login">
            <Input 
                placeholder="Enter Email"
                name="email"
                id="email"
                value={ email }
                onChangeText={ (text) => setEmail(text.toLowerCase()) }
            />
            <Input 
                placeholder="Enter Password"
                name="password"
                id="password"
                secureTextEntry={ true }
                value={ password }
                onChangeText={ (text) =>  setPassword(text) }
            />
            <View style={ styles.buttonGroup }>
                { error ? <Error message={ error } />: null }
                <EasyButton 
                    primary
                    large
                    onPress={ () => handleSubmit() }
                >
                    <Text style={{ color: "white"}}>Login</Text>
                </EasyButton>
            </View>
            <View style={[ { marginTop: 40 }, styles.buttonGroup] }>
                <Text style={ styles.middleText}>Dont't have an account yet?</Text>
                <EasyButton 
                    secondary
                    large
                    onPress={ () =>  props.navigation.navigate('Register') }
                >
                       <Text style={{ color: "white"}}>Register</Text>
                </EasyButton>
            </View>
            
            
        </FormContainer>
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

export default Login
