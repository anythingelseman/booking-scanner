import axios from 'axios';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthContextProps {
  user: any;
  login: (email: any, password: any, navigation: any) => any;
  logout: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const checkStorage = async () => {
      try {
        const storedUser = await EncryptedStorage.getItem('USER');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
        }
      } catch (error) {
        console.error('Error checking storage:', error);
      }
    };
    checkStorage();
  }, []);

  const login = async (email: any, password: any, navigation: any) => {
    if (!email) {
      ToastAndroid.show('Please enter email', 2000);
      return;
    }

    if (!password) {
      ToastAndroid.show('Please enter password', 2000);
      return;
    }

    const formData = {
      employeeNo: email,
      password: password,
    };

    try {
      const response = await axios.post(
        // `http://cinemawebapi.ddns.net:8001/api/identity/token/`,
        // `http://192.168.124.47:8001/api/identity/token`,
        `http://cinephilewebapi.southeastasia.cloudapp.azure.com/api/identity/token`,

        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = response.data;
      if (result.data.role === 'Customer') {
        ToastAndroid.show('Bạn không phải là admin', 2000);
        return;
      }

      if (result.succeeded == true) {
        await EncryptedStorage.setItem('USER', JSON.stringify(result.data));
        setUser(result.data);
        ToastAndroid.show('Đăng nhập thành công', 2000);
        navigation.navigate('QRScan');
      }
    } catch (error: any) {
      ToastAndroid.show(error.response.data.messages[0], 2000);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('USER');
      ToastAndroid.show('Log out successfully', 2000);
    } catch (error: any) {
      ToastAndroid.show(error, 2000);
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
