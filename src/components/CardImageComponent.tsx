import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

interface Props{
    children: ReactNode,
    color?: string;
}
const CardImageComponent = (props: Props) => {
    const{children,color} = props;
  return (
    <View>
      <Text>CardImageComponent</Text>
    </View>
  )
}

export default CardImageComponent