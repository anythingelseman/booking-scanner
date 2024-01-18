import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {useAuth} from '../context/AuthContext';

const QRCodeScannerScreen = ({navigation}: any) => {
  const {logout} = useAuth();
  const logoutHandler = () => {
    logout();
    navigation.navigate('Login');
  };
  const handleQRCodeScanned = ({data}: any) => {
    // Navigate to a new page with the scanned data
    navigation.replace('PaymentReturn', {paymentId: data});
    console.log(data);
  };

  return (
    <View style={{height: '100%'}}>
      <QRCodeScanner
        onRead={handleQRCodeScanned}
        reactivate={true}
        reactivateTimeout={500}
        topContent={
          <View>
            <TouchableOpacity
              onPress={logoutHandler}
              style={{
                padding: 12,
                backgroundColor: COLORS.Orange,
                marginVertical: 30,
                borderRadius: 6,
                shadowColor: COLORS.Orange,
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                paddingHorizontal: 40,
                marginTop: 2,
              }}>
              <Text
                style={{
                  fontFamily: FONTFAMILY.nunitosans_bold,
                  color: COLORS.White,
                  textAlign: 'center',
                  fontSize: FONTSIZE.size_20,
                }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default QRCodeScannerScreen;
