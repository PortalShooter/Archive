import React from 'react';
import { StyleSheet, Text, ScrollView } from "react-native";
import Header from "../../../components/Header";
import { HelperFunctions } from "../../../components/HelperFunctions";


const PersonalDataProcessing = () => {
  return (
    <Header>
      <ScrollView style={{backgroundColor: '#fff', height: '100%', paddingHorizontal: 12, paddingVertical: 15,}}>
        <Text style={styles.textBold}>Terms & Conditions</Text>
        <Text style={styles.text}>By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to Максим Киктенко.</Text>
        <Text style={styles.text}>Максим Киктенко is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</Text>
        <Text style={styles.text}>The "Развитие воли и самоорганизации" app stores and processes personal data that you have provided to us, to provide my Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the "Развитие воли и самоорганизации" app won’t work properly or at all.</Text>
        <Text style={styles.text}>The app does use third-party services that declare their Terms and Conditions.</Text>
        <Text style={styles.text}>Link to Terms and Conditions of third-party service providers used by the app</Text>
        <Text style={styles.textLink} onPress={() => HelperFunctions.openURLButton('https://policies.google.com/privacy')}>Google Play Services</Text>
        <Text style={styles.text}>You should be aware that there are certain things that Максим Киктенко will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but Максим Киктенко cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</Text>
        <Text style={styles.text}>If you’re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.</Text>
        <Text style={styles.text}>Along the same lines, Максим Киктенко cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Максим Киктенко cannot accept responsibility.</Text>
        <Text style={styles.text}>With respect to Максим Киктенко’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Максим Киктенко accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</Text>
        <Text style={styles.text}>At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for the both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Максим Киктенко does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.</Text>
        <Text style={styles.textBold}>Changes to This Terms and Conditions</Text>
        <Text style={styles.text}>I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page.</Text>
        <Text style={styles.text}>These terms and conditions are effective as of 2032-01-01</Text>
        <Text style={styles.textBold}>Contact Us</Text>
        <Text style={[styles.text, {marginBottom: 45}]}>If you have any questions or suggestions about my Terms and Conditions, do not hesitate to contact me at infosch@развитиеволи.рф.</Text>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  textBold: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  textLink: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: 'blue',
  },
  textLi: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 10,
  }
});

export default PersonalDataProcessing;
