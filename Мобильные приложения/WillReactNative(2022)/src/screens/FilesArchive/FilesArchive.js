import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Folder from '../../assets/img/Folder';
import Header from '../../components/Header';
import Arrow from '../../components/Arrow';
import {useSelector} from "react-redux";
import AdditionalNavigation from "../Additional/AdditionalNavigation";

const FilesArchive = ({navigation}) => {

  const allTasks = useSelector(state => state.Auth.allTasks);
  const newDate = new Date()
  const linkItem = allTasks.map(m => {
    const date = new Date(m.start_date);
    if (allTasks.length === 1) {
      date.setDate(date.getDate() + ((m.weeks_number * 7) + 7));
      if (newDate > date) {
        return <TouchableNativeFeedback onPress={() => navigation.navigate(m.title, { m, navigation })}>
          <View style={styles.linkWrapper}>
            <Folder />
            <Text style={styles.linkPage}>{m.title}</Text>
            <Arrow rotate={270} />
          </View>
        </TouchableNativeFeedback>
      }
    } else if (allTasks.length > 1) {
      date.setDate(date.getDate() + ((m.weeks_number * 7)));
      if (newDate > date) {
        return <TouchableNativeFeedback onPress={() => navigation.navigate(m.title, { m })}>
          <View style={styles.linkWrapper}>
            <Folder />
            <Text style={styles.linkPage}>{m.title}</Text>
            <Arrow rotate={270} />
          </View>
        </TouchableNativeFeedback>
      }
      // if (m.is_accomplished) {
      //   return <TouchableNativeFeedback onPress={() => navigation.navigate(m.title, { m, navigation })}>
      //     <View style={styles.linkWrapper}>
      //       <Folder />
      //       <Text style={styles.linkPage}>{m.title}</Text>
      //       <Arrow rotate={270} />
      //     </View>
      //   </TouchableNativeFeedback>
      //
      // }
    }
  });
    return (
      <Header>
        <SafeAreaView>
          <ScrollView style={styles.wrapper}>
            <View style={{marginBottom: 130}}>
              {linkItem}
            </View>
          </ScrollView>
          <AdditionalNavigation navigation={navigation}/>
        </SafeAreaView>
      </Header>
    );
  };

  const styles = StyleSheet.create({
    wrapper: {
      height: '100%',
      backgroundColor: '#F8F8F8',
      paddingLeft: 20,
      paddingTop: 25,
    },
    linkWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 61,
      paddingLeft: 20,
      marginRight: 20,

    },
    linkPage: {
      fontSize: 14,
      fontFamily: 'Nunito-SemiBold',
      justifyContent: 'flex-start',
      width: 180,
    },
  });

  export default FilesArchive;

