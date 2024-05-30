import {View, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {golabalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  bgcolor?: string;
  styles?: StyleProp<ViewStyle>;
}
const CardComponent = (props: Props) => {
  const {children, bgcolor, styles} = props;
  return (
    <View style={[golabalStyles.inputContainer, {padding: 12}, styles]}>
      {children}
    </View>
  );
};

export default CardComponent;
