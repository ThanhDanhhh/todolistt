import {View, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {golabalStyles} from '../styles/globalStyles';
import {colors} from '../contants/colors';
import {TouchableOpacity} from 'react-native';

interface Props {
  children: ReactNode;
  bgcolor?: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const CardComponent = (props: Props) => {
  const {children, bgcolor, styles, onPress} = props;
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        golabalStyles.inputContainer,
        {padding: 12, backgroundColor: bgcolor ?? colors.gray},
        styles,
      ]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        golabalStyles.inputContainer,
        {padding: 12, backgroundColor: bgcolor ?? colors.gray},
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CardComponent;
