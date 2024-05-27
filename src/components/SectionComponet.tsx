import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { golabalStyles } from '../styles/globalStyles';

interface Props {
    children: ReactNode,
}
const SectionComponet = (props: Props) => {
    const {children} = props;
  return (
    <View style={[ golabalStyles.setion ]}>
    {children}
    </View>
  )
}

export default SectionComponet;