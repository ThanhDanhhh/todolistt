import {View, Text, Image} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
// import { Image } from 'react-native-svg'
import {colors} from '../contants/colors';
import {TextalignJustifycenter} from 'iconsax-react-native';
import {fontFamilies} from '../contants/fontFamilies';

interface Props {
  uids: string[];
}

const AvatarGroup = (props: Props) => {
  const {uids} = props;
  const uidsLenght = 10;
  const imageUrl = `https://gamek.mediacdn.vn/133514250583805952/2022/5/18/photo-1-16528608926331302726659.jpg`;
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderColor: colors.white,
  };
  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
      {Array.from({length: 10}).map(
        (item, index) =>
          index < 3 && (
            <Image
              source={{uri: imageUrl}}
              key={`image${index}`}
              style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
            />
          ),
      )}
      {uidsLenght > 5 && (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: 'coral',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}>
          <TextComponent
            flex={0}
            styles={{
              lineHeight: 19,
            }}
            font={fontFamilies.semibold}
            text={`+${uidsLenght - 3 > 9 ? 9 : uidsLenght - 3}`}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarGroup;
