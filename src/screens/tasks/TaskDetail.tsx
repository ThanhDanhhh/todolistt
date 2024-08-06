import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {golabalStyles} from '../../styles/globalStyles';
import SectionComponet from '../../components/SectionComponet';
import TextComponent from '../../components/TextComponent';
import {colors} from '../../contants/colors';
import RowComponent from '../../components/RowComponent';
import {
  AddSquare,
  AlignLeft,
  ArrowDown2,
  ArrowLeft2,
  CalendarEdit,
  Clock,
  DocumentUpload,
  TickCircle,
} from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';
import {TaskModel} from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import AvatarGroup from '../../components/AvatarGroup';
import {HandleDateTime} from '../../utils/handleDateTime';
import CardComponent from '../../components/CardComponent';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from '@react-native-vector-icons/ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {fontFamilies} from '../../contants/fontFamilies';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color}: {id: string; color?: string} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>([]);
  useEffect(() => {}, []);
  const getTaskDetail = () => {
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTaskDetail({
            id,
            ...snap.data(),
          });
        } else {
          console.log(`Tasks Detail not found`);
        }
      });
  };
  return taskDetail ? (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.bgcolor,
        borderColor: colors.gray,
        borderRadius: 20,
      }}>
      <StatusBar barStyle="light-content" />
      <SectionComponet
        styles={{
          backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
          paddingVertical: 20,
          paddingTop: 48,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size={28}
              color={colors.white}
              style={{marginTop: -8, marginRight: 12}}
            />
          </TouchableOpacity>
          <SpaceComponent width={12} />
          <TitleComponent
            size={22}
            text={taskDetail.title}
            flex={1}
            // styles={{marginBottom: 0}}
          />
        </RowComponent>
        <SpaceComponent height={30} />
        <TextComponent text="Due date" />
        <RowComponent styles={{marginTop: 12}}>
          <RowComponent styles={{flex: 1}}>
            <Clock size={18} color={colors.text} />
            <SpaceComponent width={8} />
            <TextComponent
              text={`${HandleDateTime.GetHour(
                taskDetail.start?.toDate(),
              )} - ${HandleDateTime.GetHour(taskDetail.end?.toDate())}`}
            />
          </RowComponent>
          <RowComponent styles={{flex: 1}}>
            <CalendarEdit size={18} color={colors.text} />
            <SpaceComponent width={8} />
            <TextComponent text={`May 29`} />
          </RowComponent>
          <RowComponent styles={{flex: 1}} justify="flex-end">
            <AvatarGroup uids={taskDetail.uids} />
          </RowComponent>
        </RowComponent>
      </SectionComponet>

      <SectionComponet>
        <TitleComponent text="Description" size={22} />
        <CardComponent
          bgcolor={colors.bgcolor}
          styles={{
            borderWidth: 1,
            borderColor: colors.gray,
            borderRadius: 20,
            marginTop: 12,
          }}>
          <TextComponent text={taskDetail.description} />
        </CardComponent>
      </SectionComponet>
      <SectionComponet>
        <CardComponent>
          <RowComponent>
            <TextComponent text="Files & Links" flex={0} />
            <RowComponent styles={{flex: 1}}>
              <Ionicons
                style={golabalStyles.documentImg}
                name="document"
                size={38}
                color={'#0263D1'}
              />
              <AntDesign
                style={golabalStyles.documentImg}
                name="pdffile1"
                size={34}
                color={'#E5252A'}
              />
              <MaterialCommunityIcons
                style={golabalStyles.documentImg}
                name="file-excel"
                size={38}
                color={colors.success}
              />
              <AntDesign
                style={golabalStyles.documentImg}
                name="addfile"
                size={32}
                color={colors.white}
              />
            </RowComponent>
          </RowComponent>
        </CardComponent>
      </SectionComponet>
      <SectionComponet>
        <RowComponent>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: colors.success,
              marginRight: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.success,
                width: 16,
                height: 16,
                borderRadius: 100,
              }}
            />
          </View>
          <TextComponent
            flex={1}
            text="Progress"
            font={fontFamilies.medium}
            size={18}
          />
        </RowComponent>
        <SpaceComponent height={12} />
        <RowComponent>
          <View style={{flex: 1}}>
            <TextComponent text="slide" />
          </View>
          <TextComponent
            text={`70%`}
            font={fontFamilies.bold}
            size={18}
            flex={0}
          />
        </RowComponent>
      </SectionComponet>
      <SectionComponet>
        <RowComponent>
          <TitleComponent flex={1} text="Sub tasks" size={20} />
          <TouchableOpacity>
            <AddSquare size={24} color={colors.success} variant="Bold" />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={12} />
        {Array.from({length: 3}).map((item, index) => (
          <CardComponent key={`subtask${index}`} styles={{marginBottom: 12}}>
            <RowComponent>
              <TickCircle variant="Bold" color={colors.success} size={22} />
              <SpaceComponent width={8} />
              <TextComponent text="fa fa" />
            </RowComponent>
          </CardComponent>
        ))}
      </SectionComponet>
    </ScrollView>
  ) : (
    <></>
  );
};

export default TaskDetail;
