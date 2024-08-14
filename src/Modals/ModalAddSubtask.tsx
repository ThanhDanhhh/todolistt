import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import {golabalStyles} from '../styles/globalStyles';
import RowComponent from '../components/RowComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import {colors} from '../contants/colors';
import {Key} from 'iconsax-react-native';
import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';
import firestore from '@react-native-firebase/firestore';

interface Props {
  visible: boolean;
  subTask?: any;
  onClose: () => void;
  taskId: string;
}
const initValue = {
  title: '',
  description: '',
  isCompleted: false,
};
const ModalAddSubtask = (props: Props) => {
  const {visible, subTask, onClose, taskId} = props;
  const [subTaskForm, setSubTaskForm] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);

  // const handleChangeValue = (key: string, value: string) => {
  //   const data: any = [...subTask];
  //   data[`${key}`] = value;
  //   setSubTaskForm(data);
  // };

  const handleSaveToDatabase = async () => {
    const data = {
      ...subTaskForm,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      taskId,
    };
    setIsLoading(true);
    try {
      await firestore().collection('subTasks').add(data);
      console.log('Done');
      setIsLoading(false);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSubTaskForm(initValue);
    onClose();
  };
  return (
    <Modal
      visible={visible}
      style={golabalStyles.modal}
      transparent
      animationType="slide">
      <View style={[golabalStyles.modalContainer]}>
        <View
          style={[
            golabalStyles.modalContent,
            {backgroundColor: colors.bgcolor},
          ]}>
          <TitleComponent text="Add new SubTask" />
          <View style={{paddingVertical: 16}}>
            <InputComponent
              title="Title"
              placeholder="Title"
              value={subTask.title}
              color={'#212121'}
              // onChange={val => handleChangeValue('title', val)}
              onChange={val => setSubTaskForm({...subTaskForm, title: val})}
              allowClear
            />
            <InputComponent
              title="Description"
              placeholder="Description"
              value={subTask.description}
              // onChange={val => handleChangeValue('description', val)}
              onChange={val =>
                setSubTaskForm({...subTaskForm, description: val})
              }
              color={'#212121'}
              numberOfLine={3}
              multible
              allowClear
            />
          </View>
          <RowComponent>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={handleCloseModal}>
                <TextComponent text="close" flex={0} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <ButtonComponent
                isLoading={isLoading}
                text="Save"
                onPress={handleSaveToDatabase}
              />
            </View>
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddSubtask;
