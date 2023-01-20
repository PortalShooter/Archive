import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ChoiceBtns = ({title, value, setValue}) => {
    return (
        <>
            <Text style={stylesChoiceBtns.title}>{title}</Text>
            <View style={stylesChoiceBtns.wrapper}>
                <View style={stylesBtn.wrapper}>
                    <TouchableOpacity onPress={() => {
                        setValue(0)
                    }}>
                        <View style={[stylesBtn.btn, value === 0 && {backgroundColor: '#58D181'}]} />
                    </TouchableOpacity>
                    <Text style={[stylesBtn.text, {opacity: 1}]}>0</Text>
                </View>

                <View style={stylesBtn.wrapper}>
                    <TouchableOpacity onPress={() => {
                        setValue(25)
                    }}>
                        <View style={[stylesBtn.btn, value === 25 && {backgroundColor: '#58D181'}]} />
                    </TouchableOpacity>
                    <Text style={[stylesBtn.text, value === 25 && {opacity: 1} ]}>Слабая</Text>
                </View>

                <View style={stylesBtn.wrapper}>
                    <TouchableOpacity onPress={() => {
                        setValue(50)
                    }}>
                        <View style={[stylesBtn.btn, value === 50 && {backgroundColor: '#58D181'}]} />
                    </TouchableOpacity>
                    <Text style={[stylesBtn.text, value === 50 && {opacity: 1} ]}>Средняя</Text>
                </View>

                <View style={stylesBtn.wrapper}>
                    <TouchableOpacity onPress={() => {
                        setValue(100)
                    }}>
                        <View style={[stylesBtn.btn, value === 100 && {backgroundColor: '#58D181'}]} />
                    </TouchableOpacity>
                    <Text style={[stylesBtn.text, value === 100 && {opacity: 1} ]}>Большая</Text>
                </View>
            </View>
        </>
    )
};

const stylesBtn = StyleSheet.create({
    wrapper: {
        alignItems: "center"
    },
    btn: {
        backgroundColor: '#F8F8F8',
        width: 34,
        height: 34,
        borderRadius: 100,
        marginBottom: 13,
    },
    text: {
        fontSize: 12,
        fontFamily: 'Nunito-SemiBold',
        opacity: 0,
    }

})

const stylesChoiceBtns = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Nunito-Light',
        fontSize: 14,
        marginBottom: 20,
    }

})

export default ChoiceBtns;

