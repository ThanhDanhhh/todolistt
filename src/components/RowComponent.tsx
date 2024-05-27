import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { golabalStyles } from '../styles/globalStyles';

interface Props{
    children: ReactNode,
    justify?: "center" 
    | "flex-start" 
    | "flex-end" 
    | "space-between" 
    | "space-around" 
    | "space-evenly" 
    | undefined;

    onPress?: ()=> void; 
    styles?: StyleProp<ViewStyle>,
    
}
const RowComponent = (props : Props) => {
    const{children, justify, onPress,styles } = props;
    
    const localStyle =[
        golabalStyles.row, 
        {
            justifyContent: justify ?? 'center',
        },
        styles,
    ];
  return onPress ? (<TouchableOpacity style={localStyle} onPress={onPress ? () => onPress : undefined }>
    {children}
  </TouchableOpacity>) :(
    <View
    style={localStyle}> 
     {children}
    </View>
  )
}

export default RowComponent;