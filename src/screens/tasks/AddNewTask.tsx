import React, {useEffect, useState} from 'react';
import {Alert, Button, View} from 'react-native';
import Container from '../../components/container';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponet';
import SpaceComponent from '../../components/SpaceComponent';
import {Attachment, TaskModel} from '../../models/TaskModel';
import DropdownPicker from '../../components/DropdownPicker';
import {SelectModel} from '../../models/SelectModel';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ButtonComponent from '../../components/ButtonComponent';
import storage from '@react-native-firebase/storage';
import UploadFileComponent from '../../components/UploadFileComponent';
import {fontFamilies} from '../../contants/fontFamilies';
import auth from '@react-native-firebase/auth';
import TextComponent from '../../components/TextComponent';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: undefined,
  start: undefined,
  end: undefined,
  uids: [],
  attachments: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isUrgent: false,
};

const AddNewTask = ({navigation, route}: any) => {
  const {editable, task}: {editable: boolean; task?: TaskModel} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setusersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const user = auth().currentUser;

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    user && setTaskDetail({...taskDetail, uids: [user.uid]});
  }, [user]);

  useEffect(() => {
    task &&
      setTaskDetail({
        ...taskDetail,
        title: task.title,
        description: task.description,
        uids: task.uids,
      });
  }, [task]);

  const handleGetAllUsers = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log(`Users data not found `);
        } else {
          const items: SelectModel[] = [];
          snap.forEach(item => {
            items.push({
              label: item.data().displayName,
              value: item.id,
            });
          });
          setusersSelect(items);
        }
      })
      .catch((error: any) => {
        console.log(`Can not users, ${error.message}`);
      });
  };

  const handleChangeValue = (id: string, value: string | string[] | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    if (user) {
      const data = {
        ...taskDetail,
        attachments,
        createdAt: task ? task.createdAt : Date.now(),
        updatedAt: Date.now(),
      };

      if (task) {
        await firestore()
          .doc(`tasks/${task.id}`)
          .update(data)
          .then(() => {
            console.log('Task updated!!');
            navigation.goBack();
          });
      } else {
        await firestore()
          .collection('tasks')
          .add(data)
          .then(() => {
            console.log('New task added!!');
            navigation.goBack();
          })
          .catch(error => console.log(error));
      }
    } else {
      Alert.alert('You not login!!!');
    }
  };

  // console.log(attachmentsUrl);
  return (
    <Container back title="Add new task">
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChange={val => handleChangeValue('description', val)}
          title="Description"
          allowClear
          placeholder="Content"
          multible
          numberOfLine={3}
        />

        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
          placeholder="Choice"
          type="date"
          title="Due date"
        />

        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              type="time"
              onSelect={val => handleChangeValue('start', val)}
              title="Start"
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={val => handleChangeValue('end', val)}
              title="End"
              type="time"
            />
          </View>
        </RowComponent>
        <DropdownPicker
          selected={taskDetail.uids}
          items={usersSelect}
          onSelect={val => handleChangeValue('uids', val)}
          multible
          title="Members"
        />

        <View>
          <RowComponent
            styles={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <TextComponent
              text="Attechments"
              flex={0}
              font={fontFamilies.bold}
              size={16}
            />
            <SpaceComponent width={8} />
            <UploadFileComponent
              onUpload={file => file && setAttachments([...attachments, file])}
            />
          </RowComponent>
          {attachments.length > 0 &&
            attachments.map((item, index) => (
              <RowComponent
                key={`attachment${index}`}
                styles={{paddingVertical: 12}}>
                <TextComponent text={item.name ?? ''} />
              </RowComponent>
            ))}
        </View>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text={task ? 'Update' : 'Save'}
          onPress={handleAddNewTask}
        />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
