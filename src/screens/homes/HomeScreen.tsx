import {
  Add,
  Edit2,
  Element4,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import CardImageConponent from '../../components/CardImageComponent';
import CicularComponent from '../../components/CicularComponent';
import Container from '../../components/container';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponet';
import SpaceComponent from '../../components/SpaceComponent';
import TagComponent from '../../components/TagComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {fontFamilies} from '../../contants/fontFamilies';
import {golabalStyles} from '../../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import firestore, {onSnapshot} from '@react-native-firebase/firestore';
import {TaskModel} from '../../models/TaskModel';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}: any) => {
  const handleSingout = async () => {
    await auth().signOut();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, settasks] = useState<TaskModel[]>([]);
  useEffect(() => {
    getNewTasks();
  }, []);
  const getNewTasks = () => {
    setIsLoading(true);
    firestore()
      .collection('tasks')
      .orderBy('dueDate')
      .limitToLast(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('tasks not found');
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setIsLoading(false);
          settasks(items);
        }
      });
  };
  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                flex: 1,
              }}>
              <TextComponent text="Hi, Jason" />
              <TitleComponent text="Be Productive today" />
            </View>
            <TouchableOpacity onPress={handleSingout}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[golabalStyles.inputContainer]}
            onPress={() => navigation.navigate('SearchScreen')}
            // onPress={() => console.log('hello baby')}
          >
            <TextComponent color="#696B6F" text="Search task" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent text="30/40 tasks done" />
                <SpaceComponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text="Match 22"
                    onPress={() => console.log('Say Hi!!!')}
                  />
                </RowComponent>
              </View>
              <View>
                <CicularComponent value={80} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowComponent styles={{alignItems: 'flex-start'}}>
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <CardImageConponent
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: tasks[1].id,
                      })
                    }>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={golabalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[0].title} />
                    <TextComponent text={tasks[0].description} size={13} />

                    <View style={{marginVertical: 28}}>
                      <AvatarGroup uids={tasks[0].uids} />
                      {tasks[0].progress && (
                        <ProgressBarComponent
                          percent="70%"
                          color="#0AACFF"
                          size="large"
                        />
                      )}
                    </View>
                    <TextComponent
                      text={`Due ${new Date(tasks[0].dueDate.toDate())}`}
                      size={12}
                      color={colors.desc}
                    />
                  </CardImageConponent>
                )}
              </View>
              <SpaceComponent width={16} />
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <CardImageConponent
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: tasks[1].id,
                        color: 'rgba(33, 150, 243, 0.9)',
                      })
                    }
                    color="rgba(33, 150, 243, 0.9)">
                    <TouchableOpacity
                      onPress={() => {}}
                      style={golabalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[1].title} size={18} />
                    {tasks[1].uids && <AvatarGroup uids={tasks[1].uids} />}
                    {tasks[1].progress && (
                      <ProgressBarComponent percent="40%" color="#A2F068" />
                    )}
                  </CardImageConponent>
                )}

                <SpaceComponent height={16} />
                {tasks[2] && (
                  <CardImageConponent
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: tasks[1].id,
                        color: 'rgba(18, 181, 22, 0.9)',
                      })
                    }
                    color="rgba(18, 181, 22, 0.9)">
                    <TouchableOpacity
                      onPress={() => {}}
                      style={golabalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[2].title} />
                    <TextComponent text={tasks[2].description} size={13} />
                  </CardImageConponent>
                )}
              </View>
            </RowComponent>
          </SectionComponent>
        ) : (
          <></>
        )}

        <SectionComponent>
          <TextComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          <CardComponent>
            <RowComponent>
              <CicularComponent value={40} radius={36} />
              <View
                style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                <TextComponent text="Title of task" />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('AddNewTask')}
          style={[
            golabalStyles.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 12,
              paddingVertical: 14,
              width: '80%',
            },
          ]}>
          <TextComponent text="Add new tasks" />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
