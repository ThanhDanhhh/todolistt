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
import { Add, Edit2, Element, Element4, Notification, SearchNormal } from 'iconsax-react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import TagComponent from '../components/TagComponent'
import SpaceComponent from '../components/SpaceComponent'
import CicularComponent from '../components/CicularComponent'
import CardImageComponent from '../components/CardImageComponent'
import AvatarGroup from '../components/AvatarGroup'
import ProgressBarComponent from '../components/ProgressBarComponent'
import { fontFamilies } from '../contants/fontFamilies'


function HomeScreen() {
    return (
        <View style={{flex:1}}>
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


            <SectionComponet>
                <RowComponent styles={{alignItems:'flex-start'}}>
                    <View style={{flex:1}}>
                        {/* <TextComponent text='coll'/> */}
                        <CardImageComponent>
                            <TouchableOpacity 
                            onPress={()=>{}} 
                            style={golabalStyles.iconContainer}>
                                <Edit2 size={20} color={colors.white}/>
                            </TouchableOpacity>
                            <TitleComponent text='Ux Design'/>
                            <TextComponent text='Task Managements mobile app' size={13}/>
                            <View style={{marginVertical: 28}}>
                                <AvatarGroup/>
                                <ProgressBarComponent percent="70%" color='#0AACFF' size='large'/>
                            </View>
                            <TextComponent text='Due, 2023 march 03' size={12} color={colors.desc}/>
                        </CardImageComponent>
                    </View>
                    <SpaceComponent width={16}/>
                    <View style={{flex:1}}>
                        <CardImageComponent color="rgba(33, 150, 243, 0.9)">
                        <TouchableOpacity 
                            onPress={()=>{}} 
                            style={golabalStyles.iconContainer}>
                                <Edit2 size={20} color={colors.white}/>
                            </TouchableOpacity>
                            <TitleComponent text='API Payment' size={18}/>
                            <AvatarGroup/>
                            <ProgressBarComponent percent="40%" color='#A2EE69'/>
                        </CardImageComponent>
                        <SpaceComponent height={16}/>
                        <CardImageComponent color="rgba(18, 181, 22, 0.9)">
                        <TouchableOpacity 
                            onPress={()=>{}} 
                            style={golabalStyles.iconContainer}>
                                <Edit2 size={20} color={colors.white}/>
                            </TouchableOpacity>
                            <TitleComponent text='Update Work'/>
                            <TextComponent text='Revision home page' size={13}/>
                        </CardImageComponent>
                    </View>
                </RowComponent>
            </SectionComponet>
            {/* <SpaceComponent height={16}/> */}

           <SectionComponet>
            <TextComponent 
            flew={1} 
            font={fontFamilies.bold}
            size={21}
            text='Urgents task'/>
            <CardComponent>
            <RowComponent>
                <CicularComponent value={40} radius={36}/>
                <View style={{flex:1, justifyContent:'center', paddingLeft:12}}>
                    <TextComponent text='Title off task'/>
                </View>
                </RowComponent>
            </CardComponent>
           </SectionComponet>
           
        </Container>
        <View style={{
                position:'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                padding:20,
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity 
                activeOpacity={1}
                style={[
                    golabalStyles.row, 
                    {backgroundColor: 'coral',
                    padding:10,
                    borderRadius:100,
                    width:"80%",
                    }]}>
                    <TextComponent text='ADD New Task' flew={0}/>
                    <Add size={22} color={colors.white}/>
                </TouchableOpacity>
            </View>
        </View>
      

    )
}

export default HomeScreen; 