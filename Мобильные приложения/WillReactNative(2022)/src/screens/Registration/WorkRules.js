import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import stylesGeneral from './../../assets/stylesGeneral';

import Swiper from 'react-native-swiper';

const SwiperComponent = ({navigation}) => {
  const [show, setShow] = useState(true);
  return (
    <Header>
      <View style={styles.wrapper}>
        <Swiper
          showsButtons={false}
          loop={false}
          showsPagination={show}
          onMomentumScrollEnd={(e, state) => {
            if (state.index === 2) {
              setShow(false);
            } else {
              setShow(true);
            }
          }}
          dot={
            <View
              style={{
                backgroundColor: '#F3F3F3',
                width: 11,
                height: 11,
                borderRadius: 50,
                marginLeft: 6,
                marginRight: 6,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#05B9F0',
                width: 11,
                height: 11,
                borderRadius: 50,
                marginLeft: 6,
                marginRight: 6,
              }}
            />
          }>
          <View style={styles.wrapperSlide}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: '17%'}}>
              <Text style={styles.title}>Важно правильно выбрать Дело!</Text>
              <Text style={styles.text}>
                Дело нужно будет регулярно выполнять в течение 3-х недель. Дело
                должно быть <Text style={styles.subTitle}>явно полезным</Text>.
                И это должно быть такое Дело, которое и желается, но и,
                почему-то, так и не делается (не делалось). Дело должно быть
                новым, непривычным. Легкое и приятное дело не подойдет. {'\n'}
                <Text style={styles.subTitle}>
                  Дело должно быть вполне выполнимым («посильным»).
                </Text>{' '}
                Важно реально понимать, что ничто (кроме чрезвычайного) не может
                помешать его сделать. {'\n'}
                Предлагаются на выбор четыре Дела: «Утренняя пробежка»,
                «Физические упражнения (иные)», «Подведение итогов дня» и
                «Другое дело». {'\n'}
              </Text>
              <Text style={styles.title}>Планирование</Text>
              <Text style={styles.text}>
                Выполнение Дела надо{' '}
                <Text style={styles.subTitle}>
                  планировать понедельно. Заранее.
                </Text>{' '}
                И сразу на неделю.
              </Text>
              <Text style={styles.title}>Минимум выполнения</Text>

              <Text style={styles.text}>
                В плане требуется определять время начала выполнения Дела.{'\n'}
                А также «объем» его выполнения.{'\n'}В зависимости от Дела
                устанавливается продолжительность (пробежки и т.п.), либо объем
                действий (отжиманий, подтягиваний, количество статей, страниц
                при чтении или написании текстов и т.п.).{'\n'}
                {'\n'}
                При определении количественного объема выполнения Дела нужно
                ориентироваться на{' '}
                <Text style={styles.subTitle}>«минимум - 15 минут» </Text>
                (исключение – Итоги дня).{'\n'}
              </Text>
            </ScrollView>
          </View>

          <View style={styles.wrapperSlide}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: '17%'}}>
              <Text style={styles.title}>Воскресенья!</Text>
              <Text style={[styles.text, {marginBottom: 20}]}>
                В данном курсе Дело выполняется 6 дней в неделю. Воскресенье
                остается в виде резерва – для того, чтобы можно было выполнить
                Дело, не сделанное в свой плановый день, осмыслить ход работы.
              </Text>
              <Text style={styles.title}>Учет выполнения дел</Text>
              <Text style={[styles.text, {marginBottom: 20}]}>
                Важно вести учет выполнения Дел. Отмечай в % (так, как ощущаешь
                это) {'\n'}- объем выполнения Дела;{'\n'}- силу нежеланий
                приступать к Делу и выполнять его;{'\n'}- силу желаний
                приступать к Делу;{'\n'}- отмечай сразу (чтобы не забылись) и
                другие важные факты.{'\n'}
                ВАЖНО! Отмечать результаты выполнения НАДО в тот день, когда
                выполнялось дело. Если такой отметки не будет, дело фиксируется
                как невыполненное
              </Text>
            </ScrollView>
          </View>

          <View style={styles.wrapperSlide}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: '4%'}}>
              <Text style={styles.title}>Дневник</Text>
              <Text style={[styles.text, {marginBottom: 20}]}>
                Рекомендуем вести «Дневник» и фиксировать в нем:{'\n'}- что
                сбивало, мешало выполнять план и даже побуждало забросить данный
                курс;{'\n'}- настроения и мысли, которые поддерживали и
                воодушевляли;{'\n'}- важные идеи по улучшению самоорганизации и
                жизни в целом.{'\n'}
                Дневник вести непривычно и трудно. Но именно формулирование
                мыслей помогает выявлять и помнить сбивающие факторы. Опыт
                показывает - если не фиксировать факты, многие из них
                забываются.
              </Text>

              <Text style={styles.title}>Главные условия успеха</Text>
              <Text style={styles.text}>
                - иметь четкий план выполнения Дела{'\n'}- выполнять Дело и
                выявлять, что этому мешает{'\n'}- в день выполнения Дела
                отмечать результаты
              </Text>
            </ScrollView>
            <View style={styles.buttonWrapper}>
              <Text
                style={stylesGeneral.blueButton}
                onPress={() => navigation.navigate('DateStart')}>
                Далеe
              </Text>
            </View>
          </View>
        </Swiper>
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#fff',
  },
  wrapperSlide: {
    paddingHorizontal: 22,
    height: '100%',
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    marginBottom: 25,
    zIndex: 5,
  },
  textSecond: {
    marginTop: '3.5%',
    marginBottom: '8%',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginBottom: 11,
    marginTop: 20,
  },
  subTitle: {
    marginBottom: 2,
    marginTop: 8,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  subtext: {
    marginBottom: 0,
  },
});

export default SwiperComponent;
