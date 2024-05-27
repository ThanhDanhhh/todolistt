import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../components/container'
import { golabalStyles } from '../styles/globalStyles'
import RowComponent from '../components/RowComponent'
import SectionComponet from '../components/SectionComponet'
import TitleComponent from '../components/TitleComponent'
import TextComponent from '../components/TextComponent'
import { colors } from '../contants/colors'
import CardComponent from '../components/CardComponent'
import { Element, Element4, Notification, SearchNormal } from 'iconsax-react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import TagComponent from '../components/TagComponent'
import SpaceComponent from '../components/SpaceComponent'
import CicularComponent from '../components/CicularComponent'


function HomeScreen() {
    return (
        <Container>
            <SectionComponet>
            <RowComponent justify='space-between'>
                <Element4 size={24} color={colors.desc } />
                <Notification size={24} color={colors.desc } />
                {/* <IonIcons name='notifications' size={24} color={colors.blue} /> */}
            </RowComponent>
            </SectionComponet>

            <SectionComponet>
                <TextComponent text='Hi. Jason!' />
                <TitleComponent text= "Be Productive today"/>
            </SectionComponet>

            <SectionComponet>
                <RowComponent 
                styles={[golabalStyles.inputContainer]} 
                onPress={()=> console.log("say hi!!!")}>
                    <TextComponent color='#696B6F' text="Search task"/>
                    <SearchNormal size={20} color={colors.desc} />
                </RowComponent>
            </SectionComponet>

            <SectionComponet>
                <CardComponent>
                    <RowComponent>
                   <View style={{flex:1}}>
                    <TitleComponent text='Tasks progress '/>
                   <TextComponent text="30/40 tasks done"/>
                  <SpaceComponent height={12} />
                   <RowComponent justify='flex-start'>
                   <TagComponent text='March 22 ' onPress={() => console.log('Say Hi!')}/>
                   </RowComponent>
                   </View>
                   <View >
                   <CicularComponent value={80} />
                   </View>
                    </RowComponent>
                </CardComponent>
            </SectionComponet>

            
        </Container>

    )
}

export default HomeScreen; 