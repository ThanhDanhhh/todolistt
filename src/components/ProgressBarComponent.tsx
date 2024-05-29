import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../contants/colors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { DimensionValue } from 'react-native';
import { fontFamilies } from '../contants/fontFamilies';

interface Props {
    size?: 'small' | 'default' | 'large';
    color?: string;
    percent: DimensionValue;
}
const ProgressBarComponent = (props: Props) => {
    const{size, color, percent} = props;

    const heighContent = size === 'small' ? 6 : size === 'large' ? 10 : 8;
  return (
    <View style={{marginTop: 12, marginBottom: 16,}}>
    <View style={{
        height: heighContent,
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        borderRadius:100,
    }}>
     <View style={{
        backgroundColor: color ?? colors.blue,
        width: percent,
        height: heighContent,
        borderRadius: 100,
     }}/>
</View>
   
    <RowComponent styles ={{justifyContent:'space-between', marginTop:4}}>
        <TextComponent text='Progress' size={12}/>
        <TextComponent text={`${percent}`} size={12} flew={0} font={fontFamilies.bold}/>
    </RowComponent>
    </View>
  )
}

export default ProgressBarComponent