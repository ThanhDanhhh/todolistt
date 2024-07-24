import {View, Text, TextStyle, Platform} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../contants/fontFamilies';
import {StyleProp} from 'react-native';
import {golabalStyles} from '../styles/globalStyles';
import {colors} from '../contants/colors';

interface Props {
  text: string;
  font?: string;
  styles?: StyleProp<TextStyle>;
  size?: number;
  color?: string;
  flex?: number;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, styles, color, flex} = props;
  const weight: any =
    Platform.OS === 'ios'
      ? font
        ? {fontWeight: font}
        : {fontWeight: fontFamilies.semibold}
      : {};

  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.semibold}
      color={color}
      text={text}
      styles={[
        golabalStyles.text,
        weight,
        {
          fontFamily: font ?? fontFamilies.bold,
          fontSize: size ?? 16,
          lineHeight: weight ? weight : size ? size + 4 : 20,
          color: color ? color : colors.text,
          flex: flex ?? 0,
        },
      ]}
      flex={flex ?? 1}
    />
  );
};

export default TitleComponent;
