import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { month } from "../../assets/data/date";
import { declOfNum } from "../../components/HelperFunctions";
import stylesGeneral from "../../assets/stylesGeneral";


const HomePageResultWindow = ({
                                startDate,
                                date,
                                sunDay,
                                checkingTheCompletedInTheWeek,
                                dayNowId,
                                totalDays,
                                tasksActual,
                                navigation,
                                present,
                                connected,
                                setOpenSetResult,
                                indexAtTheMoment,
                              }) => {
  const windowItem = () => {
    if (!dayNowId && startDate > 0 && startDate < tasksActual.task_days.length) {
      return <View>
        <Image
          source={require("../../assets/clock.png")}
          style={[styles.img]}
        />
        <Text style={styles.grayText}>
          День осмыслений и отдыха.
        </Text>
      </View>;
    }
    // ожидание курса
    else if (startDate <= 0) {
      return <View style={{marginBottom: 20}}>
        <Text style={styles.text}>
          Старт {date.getDate()} {month[date.getMonth()]} (через{" "}
          {startDate < 0 ? Math.abs(startDate) : startDate} {declOfNum(startDate < 0 ? Math.abs(startDate) : startDate, ["день", "дня", "дней"])})
        </Text>
        <Image
          source={require("../../assets/clock.png")}
          style={styles.img}
        />
        <Text style={styles.grayText}>
          Здесь ты будешь вести учет выполнения своего дела.
        </Text>
      </View>;
    }
    // ввод результатов в течении недели
    else if (startDate >= 0 && !totalDays && sunDay !== 0 && (startDate > tasksActual.task_days.length && !dayNowId ? false : dayNowId.start_time === null || undefined)) {
      return <View>
        <Text style={[stylesGeneral.blueButton, connected ? null : { backgroundColor: "#BCBCBC" }]}
              onPress={connected ? () => setOpenSetResult(true) : undefined}>Ввести результаты</Text>
      </View>;
    }
    // результаты сохранены
    else if (startDate >= 0 && !totalDays && (startDate > tasksActual.task_days.length ? false : dayNowId && dayNowId.start_time !== null || undefined)) {
      return <Text style={styles.greenText}>Результаты сохранены!</Text>;
    }
    // заполнение воскресенья
    else if (sunDay === 0 && checkingTheCompletedInTheWeek.length !== 0 && (startDate > tasksActual.task_days.length? false : dayNowId.start_time === null || undefined)) {
      return <View>
        <Text style={{ fontSize: 12, fontFamily: "Nunito-Regular", marginVertical: 19, width: 290 }}>Пропущенное
          дело можно выполнить в свой выходной день.</Text>
        <Text style={[stylesGeneral.blueButton, connected ? null : { backgroundColor: "#BCBCBC" }]}
              onPress={connected ? () => setOpenSetResult(true) : undefined}>Ввести результаты</Text>
      </View>;
    }
    // воскресенье, не последнее
    else if (sunDay === 0 && (checkingTheCompletedInTheWeek.length === 0 && dayNowId.start_time !== null || undefined) && indexAtTheMoment < tasksActual.task_days.length && !totalDays) {
      return <View>
        <Image
          source={require("../../assets/clock.png")}
          style={[styles.img]}
        />
        <Text style={styles.grayText}>
          День осмыслений и отдыха.
        </Text>
      </View>;
    }
    // конец курса
    if (totalDays) {
      return <View style={styles.textWrapper}>
        {(startDate > tasksActual.task_days.length? false : dayNowId.start_time !== null || undefined)? <Text style={styles.greenText}>Результаты сохранены!</Text> : null}
        <Text style={[stylesGeneral.blueButton, { marginBottom: 13 }]}
              onPress={() => navigation.navigate("Total", { tasksActual, navigation, present })}>
          Итоги работы
        </Text>
        {/*{present >= 0? <Text style={styles.blueText}>Срок активации бонуса*/}
        {/*  - {present} {declOfNum(present, ["день", "дня", "дней"])}</Text> : null}*/}
      </View>;
    }
  };
  return (

    <View style={[styles.beforeTheBeginning, {paddingHorizontal: startDate < 0? 0 : 20,}]}>
      {windowItem()}
    </View>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  beforeTheBeginning: {
    backgroundColor: "#fff",
    borderRadius: 5,

  },
  textMin: {
    fontFamily: "Nunito-Light",
    fontSize: 14,
  },
  disconnectWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 46,
    marginVertical: 19,
    marginHorizontal: 20,
  },
  disconnectText: {
    color: "rgba(255, 68, 64, 1)",
    marginLeft: 32,
    fontFamily: "Nunito-Bold",
  },
  title: {
    fontSize: 16,
    color: "#05B9F0",
    lineHeight: 19.5,
    height: 22,
    marginTop: 37,
    fontFamily: "Nunito-Bold",
  },
  text: {
    height: 19,
    marginLeft: 23,
    fontFamily: "Nunito-Bold",
    marginTop: 28,
    fontSize: 14,
  },
  img: {
    marginTop: 19,
    width: 212,
    height: 114,
    marginLeft: 19,
  },
  grayText: {
    color: "#B0B0B0",
    fontSize: 14,
    marginTop: 17,
    height: 47,
    width: 278,
    marginLeft: 20,
    fontFamily: "Nunito-SemiBold",
  },
  actualStartTime: {
    backgroundColor: "#58D181",
    height: 42,
    borderRadius: 37,
    display: "flex",
    flexDirection: "row",
    marginVertical: 24,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actualStartTimeText: {
    color: "#fff",
    fontFamily: "Nunito-SemiBold",
    fontSize: 12,
  },
  sliderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    paddingLeft: 30,
    backgroundColor: "#58D181",
    borderRadius: 50,
    height: 34,
  },
  sliderTitle: {
    fontFamily: "Nunito-Light",
    fontSize: 12,
    marginLeft: 21,
    marginBottom: 10,
  },
  sliderDescr: {
    fontFamily: "Nunito-Light",
    fontSize: 10,
    color: "#499563",
    marginLeft: 22,
    marginTop: 5,
    marginBottom: 23,
  },
  valueSlider: {
    fontSize: 12,
    fontFamily: "Nunito-SemiBold",
    right: 35,
  },
  moodWrapper: {
    marginTop: 25,
  },
  moodFlex: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 35,
  },
  moodItem: {
    fontSize: 14,
    fontFamily: "Nunito-SemiBold",
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
  },
  moodItemActive: {
    fontSize: 14,
    fontFamily: "Nunito-SemiBold",
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#58D181",
    color: "#fff",
  },
  modalBg: {
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    zIndex: 11,
  },
  modalWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    height: 210,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
  },
  modalTitle: {
    width: 253,
    textAlign: "center",
    display: "flex",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 33,
    marginBottom: 22,
    fontFamily: "Nunito-Regular",
  },
  remindLater: {
    color: "#C4C4C4",
    fontSize: 14,
    fontFamily: "Nunito-Regular",
  },
  modalWarningWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    height: 171,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
  },
  modalBgBot: {
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 11,
  },
  modalDisconnectWrapper: {
    width: "100%",
    padding: 20,
    height: 111,
    marginBottom: 99,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "space-evenly",
  },
  modalDisconnectTitle: {
    width: 253,
    color: "rgba(255, 66, 66, 1)",
    display: "flex",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 19,
    fontFamily: "Nunito-Regular",
  },
  textInputWrapper: {
    marginTop: 26,
  },
  textInput: {
    paddingHorizontal: 21,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 23,
    textAlignVertical: "top",
    fontFamily: "Nunito-Light",
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
  },

  greenText: {
    fontFamily: "Nunito-SemiBold",
    color: "#58D181",
    marginBottom: 19,
    marginLeft: 4,
  },
  blueText: {
    color: "#05B9F0",
    fontSize: 12,
    fontFamily: "Nunito-SemiBold",
  },
  textWrapper: {
    marginBottom: 30,
  },
  video: {
    width: 260,
    height: 150,
    backgroundColor: "#C4C4C4",
    // marginRight: 20,
    left: 0,
  },
});

export default HomePageResultWindow;
