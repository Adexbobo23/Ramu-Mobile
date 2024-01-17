import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  const privacyPolicyData = {
    heading: 'Privacy Policy',
    introduction: `We know you care about your personal information. When you share that information with Ramu, we want you to be reassured that it’ll be safe and used only in ways you’d reasonably expect. In this privacy notice - we explain what information we collect, why we collect it, the legal basis for our processing, and who we may share information with. We also explain how you can exercise your rights under data protection law, and how you can contact us if you have any questions or concerns.
    
We thank you for the trust you place in us when you visit our sites or utilize our products or services, and we take our responsibility to protect your information seriously.
`,

    sections: [
      {
        heading: 'About Us',
        content:
          `Ramu (‘we’, ‘us’ or ‘our’) is a trading name of Ramu Technologies Ltd, a financial services company
registered in Nigeria under company number 6932070, authorized and regulated by the Corporate Affairs Commission under the Companies and Allied Matters Act 2020. Our registered address is 2 New dairy farm private Estate, Agege, Lagos state, Nigeria. We apply the same data privacy standards to protect and secure your personal data wherever we provide online trading products or services to you, and act as individual data controllers of your personal information in relation to specific services or
products we provide. Any reference to “you” or “your” in this policy is a reference to any of our clients, potential clients or people visiting our websites as the context requires unless otherwise stated.`,
      },
      {
        heading: 'WHAT PERSONAL DATA DO WE PROCESS AND HOW DO WE COLLECT IT?',
        content:
          `As part of providing our products and services to you, we are required by law to execute Know Your Customer (KYC) checks in order to verify your identity before we set you up as a client and we use those details to effectively manage your account with us to ensure that you get the best possible service.
We may collect, use, store and transfer different kinds of personal data for a variety of purposes.
In this section, we provide information about what personal data we process, categorized by where we got it from.
Data collected from direct interactions with us. We collect data you provide us with when you use our
Services or engage or communicate with us, for example when you create an account or participate in research.
- Identity Data. This includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.
- Contact Data. This includes billing address, delivery address, email address and telephone numbers. - Due Diligence Data. This may include copies of identification document(s), nationality, national insurance number (or other government issued identification number), your image and other data we
may need to successfully verify users.
- Financial Data. This may include open banking data, bank account and payment card details.
- Customer Interactions. This includes responses to surveys, research, promotions, customer support conversations and history (including interactions made on the Shares app, via social media and email). Data collected from automated technologies or interactions. As you interact with our Services, we may automatically collect certain Usage Data and Technical Data about your equipment, browsing actions
and patterns. We collect this personal data using cookies, web beacons, pixel tags, server logs and other similar technologies, which are sometimes provided by a third party.
We may also receive Technical Data about you if you visit other web services employing our cookies.
- Transaction Data. This includes details about payments to and from you and other details of products
and services you have purchased from us, including the value and currency of your activity.
- Device Data. This includes internet protocol (IP) address, your login data, browser type and version,
time zone setting and location, browser plug-in types and versions, operating system and platform and
other technology on the devices you use to access the Services.
- Location Data. We may collect geolocation data from your device, where you have set permissions that
allow this.
- Profile Data. This includes your username and password, pin, profile photo, bio, settings and
preferences.
- Usage Data. This includes information about how you use our Services, including your browsing habits,
profit and usage statistics.
Data collected from third parties. We collect personal data from third parties, who you may or may not
have a direct relationship with. Some of the data we collect from you may be shared with vendors and
other service providers who help us improve the Services we provide.
- Third Party Technical Data. We may collect personal data such as inferred data, website usage data and
demographic data from relevant third parties, including analytics providers and advertising networks.
- Marketing and Communications Data. This includes your preferences in receiving promotional and
marketing material from us and our third parties, or any other communication preferences you’ve
expressed.
- Partners and Vendors Data. We may collect personal data from third parties if we enter into a
partnership or when we’re seeking to verify your identity as part of our regulatory requirements. We
rely on third parties such as identity verification agencies, credit referencing agencies, anti-money
laundering solution providers and others. This data may include:
. Contact data . Publicly available information from searches
. Data from providers of technical, payment and delivery services
. Data from data brokers or aggregators
Additional points to note…`,
      },
      {
        heading: 'Aggregated Data ',
        content:
          `We also collect, use and share Aggregated Data such as statistical or demographic data for any purpose. Aggregated Data may be based on personal data, but it’s not considered personal data by law as the data does not directly or indirectly reveal your identity. For example, we may tot up your Usage Data to calculate the percentage of users accessing a specific feature. If we combine or connect Aggregated Data with your personal data in a way that can directly or indirectly identify you, we process it as Personal Data and in accordance with this privacy policy. If you fail to provide personal data Sometimes, we need to collect personal data by law. Sometimes, we need to collect personal data under the terms of a contract we have with you. Should you fail to provide this data when requested, we may not be able to perform the contract we have or are trying to enter into with you (for example, to provide you with our Services). `,
      },
      {
        heading: 'HOW AND WHY WE USE YOUR PERSONAL INFORMATION',
        content:
          `We only use your personal information if we have a legal reason for doing so, such as:
• to comply with our legal and regulatory obligations;
• for the performance of our contract with you or to take steps at your request before entering into a contract;
• for our legitimate interests or those of a third party; or
• where you have given consent. A legitimate interest is when we have a business or commercial reason to use your information, so long as this is not overridden by your own rights and interests.`,
      },
      {
        heading: 'HOW TO CONTACT US',
        content:
          `If you have concerns about any aspect of our privacy practices, questions about this privacy policy, want to exercise your rights or wish to make a complaint, you can contact us by mail, email or phone using the following
contact details:
EMAIL: support@ramufinance.com`,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{privacyPolicyData.heading}</Text>
      <Text style={styles.text}>{privacyPolicyData.introduction}</Text>

      {privacyPolicyData.sections.map((section, index) => (
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
    lineHeight: 20, 
    letterSpacing: 0.5,
    textAlign: 'left'
  },
  
});

export default PrivacyPolicyScreen;
