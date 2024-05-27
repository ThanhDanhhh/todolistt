import { Platform, StyleSheet } from 'react-native';
import { colors } from '../contants/colors';
import { fontFamilies } from '../contants/fontFamilies';
export const golabalStyles = StyleSheet.create ({
     container:{
        flex:1, 
        backgroundColor: colors.bgcolor,
        padding:20,
        paddingTop: Platform.OS === 'ios' ? 52 : 42,
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center', 
        
    },
    text:{
        fontSize:14,
        fontFamily: fontFamilies.regular,
        color: colors.text,
    },
    inputContainer:{
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
        paddingVertical: Platform.OS === 'ios' ?  12 : 10,
          

    },
    setion:{
        marginBottom:16,
    },
    tag:{
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === 'ios' ? 6 : 4,
        borderRadius:100,
        backgroundColor: colors.blue,
    }
})