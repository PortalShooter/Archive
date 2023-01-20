import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,

} from "react-native";
import Header from '../../components/Header';
import AdditionalNavigation from './AdditionalNavigation';
import { useSelector } from "react-redux";
import DocumentBtn from "../../components/Document/DocumentBtn";

const AboutProject = ({navigation}) => {
  const dataDocuments = useSelector(state => state.Auth.dataDocuments);

  let docsArr;

  if (dataDocuments['Теория к курсу']) {
    docsArr = dataDocuments['Теория к курсу'].map(doc => {
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


          {/*<Text style={styles.text}>*/}
          {/*  «На пороге» - объединение молодых людей, ведущих научно обоснованное*/}
          {/*  саморазвитие. Основной контингент участников – студенты. Начало*/}
          {/*  проекта – 2014 год.*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 20}]}>*/}
          {/*  Виды деятельности – интеллектуальные инновации, саморазвитие, помощь*/}
          {/*  другим в налаживании саморазвития.*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 20}]}>*/}
          {/*  Ключевая идея Проекта – укрепление реальной продуктивной*/}
          {/*  самостоятельности, освоение эффективных способов развития себя и своей*/}
          {/*  жизни.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Для этого разработан способ познания и развития своих качеств. Это -*/}
          {/*  наш авторский метод. {'\n'}*/}
          {/*  Реализуемое нами саморазвитие нацелено на осознанное развитие нужных*/}
          {/*  способностей. Это не привычное освоение тех или иных умений, а, прежде*/}
          {/*  всего,{' '}*/}
          {/*  <Text style={{fontFamily: 'Nunito-Bold'}}>*/}
          {/*    формирование способности «развивать любые способности».*/}
          {/*  </Text>*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 20}]}>*/}
          {/*  Саморазвитие ведется в формате студенческих групп и индивидуально.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>Что мы делаем:</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  - создаем студенческие группы саморазвития и помогаем налаживать их*/}
          {/*  работу;*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  - готовим «ведущих группы саморазвития»;*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  - выступаем на научных международных конференциях и форумах, пишем*/}
          {/*  статьи и читаем лекции;*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 20}]}>*/}
          {/*  - проводим тренинги и разрабатываем специальные программы*/}
          {/*  саморазвития.*/}
          {/*</Text>*/}

          {/*<Text style={styles.text}>В нашем объединении ты можешь:</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  - стать участником, развивать свои способности и качества;*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>- реализовывать свои идеи и проекты;</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  - освоить наш метод, стать ведущим групп и программ, а может, и*/}
          {/*  разработать свои собственные методы продвижения;*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 20}]}>*/}
          {/*  - стать членом актива, принимать участие в управлении молодежным*/}
          {/*  объединением, поддерживать начинающих участников и новые проекты.*/}
          {/*</Text>*/}
          {/*<Text style={styles.text}>*/}
          {/*  Созданы сайты Naporoge.ru, Напороге.рф и сообщества в социальных*/}
          {/*  сетях. Мы развиваем себя сами, помогаем в этом другим.*/}
          {/*</Text>*/}
          {/*<Text style={[styles.text, {marginBottom: 130}]}>Присоединяйся.</Text>*/}
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

export default AboutProject;
