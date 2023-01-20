import React, { 
	useState,
	useEffect
} from 'react';

import {
    SafeAreaView,
	StyleSheet,
    Text,
    View
} from 'react-native';

import {
    ref,
    onValue
} from 'firebase/database';

import {
    db
} from '../../config';

function InfoPage({ route, navigation}) {
    const [id, setId] = useState("");
    const [user, setUser] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userCode, setUserCode] = useState("");
    const [userHouse, setUserHouse] = useState("");
    const [userStreet, setUserStreet] = useState("");
    const [itemId, setItemId] = useState("");
	
	console.log(route);

    const orderId = route.params;

    const reference = ref(db, '/OrderInfo/' + orderId.id);

    useEffect(() => {
        onValue(reference, (snapshot) => {
            const key = snapshot.key;
            const data = snapshot.val();

            setId(key);
            setUser(data.user);
            setUserCity(data.userCity);
            setUserCode(data.userCode);
            setUserHouse(data.userHouse);
            setUserStreet(data.userStreet);
            setItemId(data.itemID);
        })
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Info Page</Text>
            </View>
            <View style={styles.body}>
				<View style={styles.bodyHeader}>
					<Text style={styles.bodyHeaderText}>Ordered by: {user}</Text>
				</View>
                <Text style={styles.bodyText}>{userCity}, {userStreet}, {userHouse}</Text>
                <Text style={styles.bodyText}>User code: {userCode}</Text>
                <Text style={styles.bodyText}>Item bought: {itemId}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: 'peru',
        justifyContent: 'center',
        alignItems: 'center'
    },
	
	headerText: {
		fontSize: 22,
		fontWeight: 'bold'
	},
	
	body: {
		margin: 10,
		backgroundColor: 'wheat'
	},
	
	bodyHeader: {
		alignItems: 'center',
		backgroundColor: 'tan',
		paddingBottom: 10
	},
	
	bodyHeaderText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	
	bodyText: {
		fontSize: 20,
		paddingLeft: 15,
		marginBottom: 10
	}
});

export default InfoPage;