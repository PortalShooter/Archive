import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const TrainTimerItem = ({item, index, visibleCheckbox, deleteItem, setDeleteTime}) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (checked) {
            if (deleteItem.indexOf(item.id) === -1) {
                setDeleteTime([...deleteItem, item.id])
            }
        } else {
            const arr = deleteItem.filter(f => f === item.id ? null : f)
            setDeleteTime(arr)
        }
    }, [checked])

    useEffect(() => {
        if (!visibleCheckbox) {
            setChecked(false)
        }
    }, [visibleCheckbox])


    return (
        <View style={styles.itemWrapper} key={index}>
            <Text style={styles.idItem}>#{index + 1}</Text>
            <View style={styles.wrapper}>
                <Text style={styles.time}>Время: {item.elapsed_time.substr(0, 5)}</Text>
                {visibleCheckbox ?
                    <BouncyCheckbox value={checked} onPress={() => setChecked(!checked)} disableText={true}
                                    style={{marginLeft: 10}} iconStyle={{borderRadius: 5, width: 15, height: 15}}
                                    unfillColor={'#F8F8F8'}
                                    fillColor={'#05B9F0'}/> : null}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    idItem: {
        fontFamily: 'Nunito-Light',
        fontSize: 12,
        color: '#05B9F0',
    },
    time: {
        fontFamily: 'Nunito-Light',
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
    }
})
export default TrainTimerItem;