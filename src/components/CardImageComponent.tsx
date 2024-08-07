import {View, Text, ImageBackground} from 'react-native';
import React, {ReactNode} from 'react';
import {golabalStyles} from '../styles/globalStyles';
import {TouchableOpacity} from 'react-native';

interface Props {
  children: ReactNode;
  color?: string;
  onPress?: () => void;
}
const CardImageComponent = (props: Props) => {
  const {children, color, onPress} = props;

  const renderCard = (
    <ImageBackground
      imageStyle={{borderRadius: 12}}
      source={require('../assets/images/card-bg.png')}
      style={[golabalStyles.card]}>
      <View
        style={[
          // golabalStyles.card,
          {
            // position:'absolute',
            // top:0,
            // bottom:0,
            // right:0,
            // left:0,
            backgroundColor: color ?? 'rgba(113, 77, 217, 0.85)',
            borderRadius: 12,
            padding: 12,
            flex: 1,
          },
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderCard}</TouchableOpacity>
  ) : (
    renderCard
  );
};

export default CardImageComponent;
