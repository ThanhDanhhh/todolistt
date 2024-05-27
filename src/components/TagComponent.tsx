import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { golabalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';
import { colors } from '../contants/colors';

interface Props{
    text: string;
    color?: string;
    tagStyles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
}
const  TagComponent = (props: Props) => {
    const{text,color,tagStyles,textStyles,onPress} = props;
  return (
    <TouchableOpacity 
    onPress={onPress}
    disabled ={!onPress}
    style={[golabalStyles.tag, tagStyles , 
    {backgroundColor: color ?? colors.blue},
    ]}>
      <TextComponent text={text} styles={textStyles}  />
    </TouchableOpacity>
  )
}

export default TagComponent;