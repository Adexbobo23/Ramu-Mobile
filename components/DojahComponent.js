import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const DojahWidget = () => {
  const webViewRef = useRef(null);

  const handleConnect = () => {
    const connectScript = `
      const connect = new Connect(${JSON.stringify(options)});
      connect.setup();
      connect.open();
    `;
    webViewRef.current.injectJavaScript(connectScript);
  };

  const handleSuccess = (response) => {
    console.log('Success', response);

    if (response.status) {
      handleSuccessfulVerification(response);
    }
  };

  const handleSuccessfulVerification = (response) => {
    const {
      verificationId,
      verificationUrl,
      referenceId,
      verificationType,
      verificationValue,
      verificationMode,
    } = response;

    // TODO: Send the verification details to your server
    // Example:
    // fetch('your_server_url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(response),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
  };

  const options = {
    app_id: '6556335e2636950040452590',
    p_key: 'prod_pk_HKhtL4iV4t9jBjPAK5pWzBv5P',
    type: 'custom',
    user_data: {
      first_name: 'John',
      last_name: 'Doe',
      dob: '1990-01-01',
      residence_country: 'NG',
      email: 'john.doe@example.com',
    },
    metadata: {
      user_id: '12xxxxsxsxsxssx1',
    },
    config: {
      widget_id: '6556747ca31eee0040986e1a',
      webhook: true,
    },
    onSuccess: handleSuccess,
    onError: (err) => console.log('Error', err),
    onClose: () => console.log('Widget closed'),
  };

  const htmlContent = `
    <html>
      <head>
        <script src="https://widget.dojah.io/widget.js"></script>
      </head>
      <body>
        <button id="button-connect" onclick="handleConnect()">Complete Your KYC</button>
        <script>
          function handleConnect() {
            const connect = new Connect(${JSON.stringify(options)});
            connect.setup();
            connect.open();
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text>Complete Your KYC</Text>
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        onMessage={(event) => console.log('WebView Message:', event.nativeEvent.data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    padding: 10,
    backgroundColor: '#51CC62',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default DojahWidget;
