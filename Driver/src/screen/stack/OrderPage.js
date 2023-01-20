import React, {
    useState,
    useEffect
} from 'react';

import {
    View,
    Text,
	Button,
    FlatList,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import {
    ref,
    onValue
} from 'firebase/database';

import {
    db
} from '../../config';

function OrderPage({ navigation: { navigate } }) {
    const [driverOrders, setDriverOrders] = useState([]);
    const driverReference = ref(db, '/DriversOrders');

    useEffect(() => {
        onValue(driverReference, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const driverKey = childSnapshot.key;
                const driverData = childSnapshot.val();
				
                const driverOrder = {
                    id: driverKey,
                    driver: driverData.driver,
                    usersOrderId: driverData.usersOrderId
                };

                setDriverOrders(emptyArray => [...emptyArray, driverOrder]);
            })
        })
    }, []);

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Order Page</Text>
            </View>

            <FlatList
                style={styles.list}
                data={driverOrders}
                renderItem={(item) => {
                    return (
                        <View style={styles.row}>
                            <Text style={styles.rowTitle}>Order Id:</Text>
							<Text style={styles.rowData}>{item.item.usersOrderId}</Text>
							<Button title='Go to order' style={styles.buttonStyle} onPress={() => navigate('Info', { id: item.item.usersOrderId })} />
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
                scrollEnabled={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: 'silver'
	},
	
    header: {
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'peru',
    },

    headerText: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    list: {
        padding: 15
    },

    row: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        marginBottom: 5,
        backgroundColor: '#ffffff'
    },

    rowTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
	
	rowData: {
		color: 'black',
		fontSize: 16,
		marginBottom: 15
	},
	
	buttonStyle: {
		alignSelf: 'Center'
	}
});

export default OrderPage;
