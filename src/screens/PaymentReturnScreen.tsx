import {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {getBookingById} from '../services/getBookingById';
import {SafeAreaView} from 'react-native-safe-area-context';
import apiClient from '../services/apiClient';

const PaymentReturnScreen = ({navigation, route}: any) => {
  const [booking, setBooking] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('route: ', route.params.paymentId);
    getBookingById(route.params.paymentId)
      .then(data => {
        setBooking(data);
      })
      .catch((error: any) => console.log('error ', error.response));
  }, [route.params.paymentReturnUrl]);

  const seats = useMemo(() => {
    if (!booking || !booking.tickets) return '';

    return booking.tickets.map((t: any) => t.seatCode).join(',');
  }, [booking]);

  const transformDate = (dateObject: Date) => {
    return dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!booking) {
    return (
      <ScrollView
        style={{
          display: 'flex',
          flex: 1,
          backgroundColor: COLORS.Black,
        }}
        contentContainerStyle={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  const useTicket = async () => {
    setIsLoading(true);
    await apiClient.patch(
      '/booking/update-usage-status',
      JSON.stringify({
        id: booking.id,
        usageStatus: 'used',
      }),
    );

    getBookingById(route.params.paymentId)
      .then(data => {
        setBooking(data);
      })
      .catch((error: any) => console.log('error ', error.response));

    setIsLoading(false);
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: COLORS.Grey,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 6,
          paddingHorizontal: 14,
          paddingVertical: 20,
        }}>
        <Text
          style={{
            color: COLORS.Orange,
            textAlign: 'center',
            fontSize: 26,
            fontFamily: FONTFAMILY.nunitosans_bold,
          }}>
          Chi tiết vé
        </Text>

        <View style={{marginTop: 6}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Phim
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
                maxWidth: '60%',
              }}>
              {booking.filmName}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Ngày chiếu
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              {transformDate(new Date(booking.startTime))}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Rạp
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
                maxWidth: '60%',
              }}>
              {booking.cinemaName}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Phòng
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              {booking.roomName}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Ghế
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              {seats}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Giờ đặt
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              {transformDate(new Date(booking.bookingDate))}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Tổng tiền
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(booking.totalPrice)}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              Trạng thái
            </Text>
            <Text
              style={{
                color: COLORS.White,
                fontSize: FONTSIZE.size_14,
                fontFamily: FONTFAMILY.nunitosans_semibold,
              }}>
              {booking.usageStatus}
            </Text>
          </View>

          {booking.usageStatus === 'Chờ sử dụng' && (
            <TouchableOpacity
              disabled={isLoading}
              onPress={useTicket}
              style={{
                padding: 6,
                backgroundColor: COLORS.Orange,
                marginVertical: 18,
                marginBottom: 10,
                borderRadius: 6,
                shadowColor: COLORS.Orange,
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.3,
                shadowRadius: 6,
              }}>
              <Text
                style={{
                  fontFamily: FONTFAMILY.nunitosans_bold,
                  color: COLORS.White,
                  textAlign: 'center',
                  fontSize: FONTSIZE.size_18,
                }}>
                Sử dụng vé
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('QRScan');
            }}
            style={{
              padding: 6,
              backgroundColor: COLORS.Orange,
              marginVertical: 18,
              borderRadius: 6,
              shadowColor: COLORS.Orange,
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.3,
              shadowRadius: 6,
            }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.nunitosans_bold,
                color: COLORS.White,
                textAlign: 'center',
                fontSize: FONTSIZE.size_18,
              }}>
              Quay lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentReturnScreen;
