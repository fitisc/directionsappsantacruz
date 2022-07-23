import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 20,
        backgroundColor: colors.secondary,

    },
    info: {
        marginLeft: 20,
        flex: 1,    
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.text,
    },
    address: {
        fontSize: 14,
        color: colors.text,
    },
});

const PlaceItem = ({ id, title, image, address, onSelect }) =>  {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onSelect(id)}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.address}>{address}</Text>
        </View>
    </TouchableOpacity>
)
}

export default PlaceItem;