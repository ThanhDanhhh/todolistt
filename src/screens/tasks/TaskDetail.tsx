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
  ArrowDown2,
  ArrowLeft2,
  CalendarEdit,
  Clock,
} from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';
import {TaskModel} from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import AvatarGroup from '../../components/AvatarGroup';
import {HandleDateTime} from '../../utils/handleDateTime';
import CardComponent from '../../components/CardComponent';

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
        <CardComponent bgcolor={colors.bgcolor}>
          <TextComponent text={taskDetail.description} />
        </CardComponent>
      </SectionComponet>
    </ScrollView>
  ) : (
    <></>
  );
};

export default TaskDetail;
