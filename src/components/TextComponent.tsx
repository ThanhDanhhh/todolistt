import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {golabalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../contants/fontFamilies';
import {colors} from '../contants/colors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  line?: number;
}

const TextComponent = (props: Props) => {
  const {text, font, size, color, flex, styles, line} = props;

  return (
    <Text
      numberOfLines={line}
      style={[
        golabalStyles.text,
        {
          flex: flex ?? 1,
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          textAlign: 'justify',
          color: color ?? colors.desc,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
