import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Categories from '../screens/admin/Categories';
import Order from '../screens/admin/Order';
import Products from '../screens/admin/Products';
import ProductForm from '../screens/admin/ProductForm';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
             <Stack.Screen 
                name="Products"
                component={ Products }
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Categories"
                component={ Categories }
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen 
                name="Orders"
                component={ Order }
                options={{
                    headerShown: true
                }}
            />
           
            <Stack.Screen 
                name="ProductForm"
                component={ ProductForm }
                options={{
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />;
}
