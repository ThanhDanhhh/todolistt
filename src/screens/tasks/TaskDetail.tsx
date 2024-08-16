import firestore from '@react-native-firebase/firestore';
import {
  AddSquare,
  ArrowLeft2,
  CalendarEdit,
  Clock,
  DocumentCloud,
  TickCircle,
  TickSquare,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponet from '../../components/SectionComponet';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {fontFamilies} from '../../contants/fontFamilies';
import {Attachment, SubTask, TaskModel} from '../../models/TaskModel';
import {golabalStyles} from '../../styles/globalStyles';
import {HandleDateTime} from '../../utils/handleDateTime';
import ButtonComponent from '../../components/ButtonComponent';
import {Slider} from '@miblanchard/react-native-slider';
import UploadFileComponent from '../../components/UploadFileComponent';
import {calcFileSize} from '../../utils/calcFileSize';
import ModalAddSubtask from '../../Modals/ModalAddSubtask';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color}: {id: string; color?: string} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isVisibleModalSubTask, setIsVisibleModalSubTask] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    getTaskDetail();
    getSubTaskById();
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setProgress(taskDetail.progress ?? 0);
      setAttachments(taskDetail.attachments);
      setIsUrgent(taskDetail.isUrgent);
    }
  }, [taskDetail]);

  useEffect(() => {
    if (
      progress !== taskDetail?.progress ||
      attachments.length !== taskDetail.attachments.length
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [progress, taskDetail, attachments]);

  useEffect(() => {
    if (subTasks.length > 0) {
      const completedPercent =
        subTasks.filter(element => element.isCompleted).length /
        subTasks.length;

      setProgress(completedPercent);
    }
  }, [subTasks]);

  const getTaskDetail = () => [
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTaskDetail({
            id,
            ...snap.data(),
          });
        }
      }),
  ];

  const handleUpdateUrgentState = () => {
    firestore().doc(`tasks/${id}`).update({
      isUrgent: !isUrgent,
      updatedAt: Date.now(),
    });
  };

  const getSubTaskById = () => {
    firestore()
      .collection('subTasks')
      .where('taskId', '==', id)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('Data not found');
        } else {
          const items: SubTask[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setSubTasks(items);
        }
      });
  };

  const handleUpdateTask = async () => {
    const data = {...taskDetail, progress, attachments, updateAt: Date.now()};
    await firestore()
      .doc(`tasks/${id}`)
      .update(data)
      .then(() => {
        Alert.alert('Task Updated');
      })
      .catch(error => console.log(error));
  };

  const handleUpdateSubTask = async (id: string, isCompleted: boolean) => {
    try {
      await firestore()
        .doc(`subTasks/${id}`)
        .update({isCompleted: !isCompleted});
    } catch (error) {
      console.log(error);
    }
  };
  return taskDetail ? (
    <>
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
            {/* <SpaceComponent width={12} /> */}
            <TitleComponent
              line={1}
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
              borderRadius: 12,
              marginTop: 12,
            }}>
            <TextComponent
              text={taskDetail.description}
              styles={{textAlign: 'justify'}}
            />
          </CardComponent>
        </SectionComponet>
        <SectionComponet>
          <RowComponent onPress={handleUpdateUrgentState}>
            <TickSquare
              variant={isUrgent ? 'Bold' : 'Outline'}
              size={24}
              color={colors.white}
            />
            <SpaceComponent width={8} />
            <TextComponent
              flex={1}
              text={`Is Urgent`}
              font={fontFamilies.bold}
              size={18}
            />
          </RowComponent>
        </SectionComponet>
        <SectionComponet>
          <RowComponent>
            <TitleComponent text="File & lịnk" flex={1} />
            <UploadFileComponent
              onUpload={file => file && setAttachments([...attachments, file])}
            />
          </RowComponent>
          {attachments.map((item, index) => (
            <View
              style={{justifyContent: 'flex-start', marginBottom: 8}}
              key={`attachment${index}`}>
              <TextComponent flex={0} text={item.name} />
              <TextComponent
                flex={0}
                text={calcFileSize(item.size)}
                size={12}
              />
            </View>
          ))}
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
              <Slider
                disabled
                value={progress}
                onValueChange={val => setProgress(val[0])}
                thumbTintColor={colors.success}
                thumbStyle={{
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
                maximumTrackTintColor={colors.gray2}
                minimumTrackTintColor={colors.success}
                trackStyle={{height: 10, borderRadius: 100}}
              />
            </View>
            <TextComponent
              text={`${Math.floor(progress * 100)}%`}
              font={fontFamilies.bold}
              size={18}
              flex={0}
            />
          </RowComponent>
        </SectionComponet>
        <SectionComponet>
          <RowComponent>
            <TitleComponent flex={1} text="Sub tasks" size={20} />
            <TouchableOpacity onPress={() => setIsVisibleModalSubTask(true)}>
              <AddSquare size={24} color={colors.success} variant="Bold" />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent height={12} />
          {subTasks.length > 0 &&
            subTasks.map((item, index) => (
              <CardComponent
                key={`subtask${index}`}
                styles={{marginBottom: 12}}>
                <RowComponent
                  onPress={() =>
                    handleUpdateSubTask(item.id, item.isCompleted)
                  }>
                  <TickCircle
                    variant={item.isCompleted ? 'Bold' : 'Outline'}
                    color={colors.success}
                    size={22}
                  />
                  <View style={{flex: 1, marginLeft: 12}}>
                    {' '}
                    <TextComponent text={item.title} />
                    <TextComponent
                      size={12}
                      color={'#e0e0e0'}
                      text={HandleDateTime.DateString(new Date(item.createdAt))}
                    />
                  </View>
                  {/* <SpaceComponent width={8} /> */}
                </RowComponent>
              </CardComponent>
            ))}
        </SectionComponet>
      </ScrollView>
      {isChanged && (
        <View style={{position: 'absolute', bottom: 20, right: 20, left: 20}}>
          <ButtonComponent text="Update" onPress={handleUpdateTask} />
        </View>
      )}
      <ModalAddSubtask
        visible={isVisibleModalSubTask}
        onClose={() => setIsVisibleModalSubTask(false)}
        taskId={id}
      />
    </>
  ) : (
    <></>
  );
};

export default TaskDetail;
