import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';
export const golabalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
    // paddingTop: Platform.OS === 'ios' ? 52 : 42,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },
  documentImg: {
    marginHorizontal: 4,
  },
  inputContainer: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
  },
  setion: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    borderRadius: 100,
    backgroundColor: colors.blue,
  },
  card: {
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 16,
  },
  modal: {
    flex: 1,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
});
