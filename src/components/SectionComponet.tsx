import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {golabalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}
const SectionComponet = (props: Props) => {
  const {children, styles} = props;
  return <View style={[golabalStyles.setion, styles]}>{children}</View>;
};

export default SectionComponet;
