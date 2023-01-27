import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Button({ onPress, isSelected, text }: { onPress: () => void; isSelected: boolean; text: string }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonContainer, isSelected ? styles.selectedButton : styles.notSelectedButton]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#FFFFFF80',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginHorizontal: 5,
    },
    selectedButton: {
        borderColor: 'white',
    },
    notSelectedButton: {
        borderColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Button;
