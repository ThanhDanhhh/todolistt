import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../contants/fontFamilies';

interface Props {
  text: string;
  font?: string;
  size?: number;
  color?: string;
  flex?: number;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color, flex} = props;

  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.semibold}
      color={color}
      text={text}
      flex={flex ?? 1}
    />
  );
};

export default TitleComponent;
