import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Header from '../../components/Header';
import AdditionalNavigation from './AdditionalNavigation';
import DocumentBtn from "../../components/Document/DocumentBtn";
import { useSelector } from "react-redux";


const StrategicObjective = ({navigation}) => {
  const dataDocuments = useSelector(state => state.Auth.dataDocuments);

  let docsArr;

  if (dataDocuments['Формы документов']) {
    docsArr = dataDocuments['Формы документов'].map(doc => {
      return (
        <DocumentBtn navigation={navigation} data={doc} />
      )
    })
  }

  return (
    <Header>
      <SafeAreaView>
        <ScrollView style={styles.wrapper}>

          {docsArr}

          {/*<Text style={styles.bold}>*/}
          {/*  Почему именно решили создать объединение молодежного саморазвития?*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Опыт студенческих групп саморазвития показал, что современным молодым*/}
          {/*  людям <Text style={styles.bold}>чрезмерно</Text> трудно самим начинать*/}
          {/*  познавать и менять себя. Без помощи извне, как правило, не получается.*/}
          {/*  Отвлекают привычные желания.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Для того, чтобы развить волю и другие важные способности, в первую*/}
          {/*  очередь требуются собственные регулярные усилия, то есть, воля. {'\n'}{' '}*/}
          {/*  А ее как раз и нужно развить. {'\n'} Упираемся в «стену».*/}
          {/*</Text>*/}
          {/*<Text style={[styles.bold, {marginBottom: 20}]}>*/}
          {/*  «Замкнутый круг начала саморазвития».*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Причем, ситуация становится все более проблемной.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Роль сферы развлечений в жизни молодых людей растет стремительно.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Школьникам и студентам все труднее противостоять этому и приступать к*/}
          {/*  важным для своего будущего делам.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  В обществе нет саморазвития как ценной социальной нормы. Молодой*/}
          {/*  человек не видит вокруг себя примеров увлеченного познания и развития*/}
          {/*  себя. Нет «действующих образцов». Куда идти, чем пользоваться?*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Ни в школах, ни в вузах этому не учат. Учителей и родителей самих*/}
          {/*  этому не учили.*/}
          {/*  <Text style={styles.bold}>*/}
          {/*    {' '}*/}
          {/*    Это – еще один «замкнутый круг начала саморазвития».*/}
          {/*  </Text>*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 20}]}>*/}
          {/*  Мы смогли преодолеть эти трудности, потому что объединили силы и*/}
          {/*  сформировали первую студенческую группу саморазвития. И в помощь всем*/}
          {/*  создали Проект «На пороге».*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Одних только наших сил для снятия замкнутых кругов мало. Полагаем, что*/}
          {/*  в современной культуре жизни требуется выделять*/}
          {/*  <Text style={styles.bold}> специальный этап – переход</Text> молодых*/}
          {/*  людей от сложившегося способа жизни (в котором еще во многом сильны*/}
          {/*  привычные желания и стереотипы), к настоящей взрослости.*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 30}]}>*/}
          {/*  Тогда в школах и вузах учащиеся могли бы получать понятную информацию*/}
          {/*  о том, что это такое – сознательное самоуправление, и как крепить эту*/}
          {/*  способность. Саморазвитие стало бы необходимостью и ценной нормой. А*/}
          {/*  возможность реально проверить свои сознательные силы и укрепить их*/}
          {/*  предоставляли бы группы научно обоснованного саморазвития. Здесь уже*/}
          {/*  все по-взрослому, здесь каждый один на один со своими трудными*/}
          {/*  взрослыми ситуациями. А группа сверстников, включая ведущего,*/}
          {/*  поддерживает мотив продвинуться.*/}
          {/*</Text>*/}
          {/*<Text style={[{marginBottom: 130}, styles.bold]}>*/}
          {/*  Включайся в решение этой задачи!*/}
          {/*</Text>*/}
        </ScrollView>
        <AdditionalNavigation navigation={navigation} />
      </SafeAreaView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8F8F8',
    paddingTop: 29,
    paddingHorizontal: 20,
    height: '100%'
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  bold: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
});

export default StrategicObjective;
