import React, {useEffect, useState} from 'react';
import Container from '../components/container';
import TextComponent from '../components/TextComponent';
import SectionComponent from '../components/SectionComponet';
import TitleComponent from '../components/TitleComponent';
import RowComponent from '../components/RowComponent';
import InputComponent from '../components/InputComponent';
import {Lock, Sms} from 'iconsax-react-native';
import {colors} from '../contants/colors';
import {Text, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {golabalStyles} from '../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import {HanhdleUser} from '../utils/handleUser';

const SigninScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorText('Please enter your email and password!!!');
    } else {
      setErrorText('');
      setIsLoading(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          HanhdleUser.SaveToDatabase(user);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setErrorText(error.message);
          setIsLoading(false);
        });
    }
  };

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     setErrorText('Please enter your email and password!!!');
  //   } else {
  //     setErrorText('');
  //     setIsLoading(true);
  //     await auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then(userCredential => {
  //         const user = userCredential.user;

  //         if (user) {
  //           console.log(user);
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(error => {
  //         setErrorText(error.message);
  //         setIsLoading(false);
  //       });
  //   }
  // };
  return (
    <Container>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <RowComponent styles={{marginBottom: 16}}>
          <TitleComponent text="LOGIN" size={32} flex={0} />
        </RowComponent>
        <InputComponent
          title="Email"
          value={email}
          onChange={val => setEmail(val)}
          placeholder="Email"
          prefix={<Sms size={22} color={colors.gray2} />}
          allowClear
          type="email-address"
        />
        <InputComponent
          title="Password"
          isPassword
          value={password}
          onChange={val => setPassword(val)}
          placeholder="Password"
          prefix={<Lock size={22} color={colors.gray2} />}
        />
        <ButtonComponent
          isLoading={isLoading}
          text="Login"
          onPress={handleLogin}
        />

        <RowComponent styles={{marginTop: 20}}>
          <Text style={[golabalStyles.text]}>
            You don't have an account?{' '}
            <Text
              style={{color: 'coral'}}
              onPress={() => navigation.navigate('LoginScreen')}>
              Create an account
            </Text>
          </Text>
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default SigninScreen;