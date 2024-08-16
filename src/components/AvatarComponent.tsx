import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../contants/colors';
import {Image} from 'react-native-svg';
import {golabalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../contants/fontFamilies';
import {UserDetail} from '../models/UserDetail';

interface Props {
  uid: string;
  index?: number;
}
const AvatarComponent = (props: Props) => {
  const {uid, index} = props;
  const [userDetail, setUserDetail] = useState<UserDetail>();

  useEffect(() => {
    firestore()
      .doc(`users/${uid}`)
      .get()
      .then((snap: any) => {
        snap.exists &&
          setUserDetail({
            uid,
            ...snap.data(),
          });
      })
      .catch(error => console.log(error));
  }, [uid]);
  const imageStyle = {
    with: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };
  return userDetail ? (
    userDetail.imgUrl ? (
      <Image
        source={{uri: userDetail.imgUrl}}
        key={`image${uid}`}
        style={[imageStyle, {marginleft: index && index > 0 ? -10 : 0}]}
      />
    ) : (
      <View
        key={`image${uid}`}
        style={[
          imageStyle,
          {
            marginLeft: index && index > 0 ? -10 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.gray2,
          },
        ]}>
        <Text
          style={[
            golabalStyles.text,
            {fontFamily: fontFamilies.bold, fontSize: 14},
          ]}>
          {userDetail.displayName.substring(0, 1).toUpperCase()}
        </Text>
      </View>
    )
  ) : (
    <></>
  );
};

export default AvatarComponent;
