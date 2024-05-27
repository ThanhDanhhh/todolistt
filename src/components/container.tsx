import { View, Text, ScrollView } from 'react-native'
import React, { ReactNode } from 'react'
import { golabalStyles } from '../styles/globalStyles';


interface Props{
  title?: string,
  back?: boolean,
  right?: ReactNode,
  children?: ReactNode,

}
const container = (props:Props) => { const{title,back,right,children} = props;
  return <ScrollView style={golabalStyles.container}>{children}</ScrollView>
}

export default container