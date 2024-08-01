import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import Container from '../../components/container';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponet';
import SpaceComponent from '../../components/SpaceComponent';
import {TaskModel} from '../../models/TaskModel';
import DropdownPicker from '../../components/DropdownPicker';
import {SelectModel} from '../../models/SelectModel';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ButtonComponent from '../../components/ButtonComponent';
import TitleComponent from '../../components/TitleComponent';
import {AttachSquare} from 'iconsax-react-native';
import {colors} from '../../contants/colors';
import DocumentPicker, {
  DocumentPickerResponse,
  DocumentPickerOptions,
} from 'react-native-document-picker';
import TextComponent from '../../components/TextComponent';
import storage from '@react-native-firebase/storage';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
  id: '',
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setusersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);
  const [attachmentsUrl, setattachmentsUrl] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

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
            items.push({label: item.data().name, value: item.id});
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
    const data = {
      ...taskDetail,
      fileUrls: attachmentsUrl,
    };
    await firestore()
      .collection('tasks')
      .add(data)
      .then(() => {
        console.log('Nes task added!!');
        navigation.goBack();
      })
      .catch(error => console.log(error));
  };

  const handlePickerDocument = () => {
    DocumentPicker.pick({})
      .then(res => {
        setAttachments(res);
        res.forEach(item => handleUploadFileStorage(item));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleUploadFileStorage = async (item: DocumentPickerResponse) => {
    const filename = item.name ?? `file${Date.now()}`;
    const path = `documents${filename}`;
    const items = [...attachmentsUrl];
    await storage().ref(path).putFile(item.uri);
    await storage()
      .ref(path)
      .getDownloadURL()
      .then(url => {
        items.push(url);
        setattachmentsUrl(items);
      })
      .catch(error => console.log(error));
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
          <RowComponent justify="flex-start" onPress={handlePickerDocument}>
            <TitleComponent text="Attechments" flex={0} />
            <SpaceComponent width={8} />
            <AttachSquare size={20} color={colors.white} />
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
        <ButtonComponent text="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
