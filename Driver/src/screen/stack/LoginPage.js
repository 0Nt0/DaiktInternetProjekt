import React, {
    useState,
    Component,
    useEffect
} from 'react';

import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import {
    getAuth,
    signInWithEmailAndPassword
} from 'firebase/auth';

import CustomTextInput from '../../components/CustomTextInput';

class LoginPage extends Component {
    state = {
        email: "",
        password: "",
    }

    render() {
        const auth = getAuth();

        const loginUser = () => {
            if (this.state.email === "" || this.state.email === null) return;
            if (this.state.password === "" || this.state.password === null) return;

            signInWithEmailAndPassword(auth, this.state.email, this.state.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.props.navigation.navigate('Order');
                })
                .catch(error => {
                    console.log("=== === === === ===");
                    console.log("Error code: " + error.code);
                    console.log("Message: " + error.message);
                    console.log("=== === === === ===");
                });
        }

        return (
            <SafeAreaView style={[styles.safeAreaView]}>
                <View style={[styles.header]}>
                    <Text style={[styles.text]}>Login Page...</Text>
                </View>

                <View style={[styles.body]}>
                    <CustomTextInput
                        title="Email"
                        placeholder="Enter your email..."
                        onChangeText={(value) => this.setState({ email: value })}
                    />

                    <CustomTextInput
                        title="Password"
                        placeholder="Enter your password..."
                        onChangeText={(value) => this.setState({ password: value })}
                    />

                    <TouchableOpacity onPress={() => loginUser()}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },

    header: {
        height: 65,
        backgroundColor: 'sienna',
        justifyContent: 'center',
        alignItems: 'center'
    },

    body: {
        padding: 20
    },

    text: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    hint: {
        fontSize: 12,
        fontStyle: 'italic'
    }
});

export default LoginPage;