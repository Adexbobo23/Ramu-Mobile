import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsOfServiceScreen = () => {
  const termsOfServiceData = {
    heading: 'Terms And Conditions',
    // introduction:
    //   'Welcome to our app! By using our app, you agree to abide by the following terms. Please read them carefully.',
    sections: [
      {
        heading: 'ABOUT US',
        content:
          `The agreement between you and Ramu ("Ramu (‘we’, ‘us’ or ‘our’) is a trading name of Ramu
Technologies Ltd",). We refer to all these documents as the "Agreement". You expressly agree to the terms of the Agreement and we will also treat your access to and use of our Services as acceptance of the terms of the Agreement.
You are responsible for checking our website periodically in order to review the current version of the Terms and Conditions. Please contact us if you have any questions. Please contact us by email: support@ramufinance.com`,
      },
      {
        heading: 'TRADING TERMS',
        content:
          `This document forms the basis of the agreement between you and us, Ramu Technologies Ltd (us or we) relating to the provision of certain execution only order transmission services by us to you in the Investments offered via the Ramu App. Where we provide additional services to you, those services will be governed by our other terms as appropriate. These Ramu trading terms will apply to you from the date that you open your Account through the Ramu App when you will accept Ramu trading terms through the Ramu App.
          `,
      },
      {
        heading: 'NO ADVICE',
        content:
          `Ramu offers a non-advised (execution-only) order transmission service in shares and fractions of shares (fractional shares). We do not offer any advice or provide you with any recommendations regarding the suitability or appropriateness of any Investments. When providing our services, we will not assess the suitability or appropriateness of any Investment or service for you. As a result, you will not benefit from the protection of the FCA's rules on assessing appropriateness. Although we may from time to time provide you with factual information about Investments, this information is not, and should not be interpreted as, advice. You are solely responsible for the decisions made in relation to all Orders submitted via our platform. If you are uncertain as to whether an Investment is appropriate for your individual circumstances or needs you should seek independent professional advice.`,
      },
      {
        heading: 'POTENTIAL RISKS OF USING THE RAMU APP',
        content:
          `Ramu provides clients with the ability to buy and sell various Investments on a non-advised (i.e. execution only) basis, and transmits those orders to an Execution Broker via the Ramu App. Trading financial Investments involves an element of risk. The value of your investment may fall as well as rise and you may get back less than your initial investment, and in some cases, you may lose your
entire initial investment. Past performance of an Investment is not an indication of its future performance. Before using the Ramu App to submit Orders in relation to Investments, you should consider whether you have understood the risks detailed in dealing with shares and other multiple assets. If you have any questions or concerns about any of the content of this agreement or any of our other agreements or notices, you should seek independent professional advice before using the Services.
`,
      },
      {
        heading: 'TRANSMITTING YOUR ORDERS',
        content:
          `We will not execute your Orders ourselves, but transmit them to the Execution Broker, who will be
responsible for execution. We cannot control the execution of your Orders once we transmit them to
the Execution Broker and there is no guarantee that either we or the Execution Broker will accept your Order. Your Order might not be accepted if it gives rise to too much risk for the Execution Broker or if trading is no longer available or is suspended in the Investment your Order relates to.
You can only cancel an Order if we and / or the Execution Broker consent to it, and you cannot cancel an Order once it has been executed. This means it is important to ensure that you enter the details of your Order correctly and that you are willing and able to enter into a binding commitment to buy or sell an Investment when you submit your Orders.`,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{termsOfServiceData.heading}</Text>
      {/* <Text style={styles.text}>{termsOfServiceData.introduction}</Text> */}

      {termsOfServiceData.sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.subHeading}>{section.heading}</Text>
          <Text style={styles.text}>{section.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 16,
    marginTop: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#51CC62',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default TermsOfServiceScreen;
