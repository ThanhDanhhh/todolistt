import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
import ProgressBarComponent from '../../components/ProgressBarComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponet';
import SpaceComponent from '../../components/SpaceComponent';
import TagComponent from '../../components/TagComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import Container from '../../components/container';
import {colors} from '../../contants/colors';
import {fontFamilies} from '../../contants/fontFamilies';
import {TaskModel} from '../../models/TaskModel';
import {golabalStyles} from '../../styles/globalStyles';
import {HandleDateTime} from '../../utils/handleDateTime';
import {monthNames} from '../../contants/appinfos';

const date = new Date();

const HomeScreen = ({navigation}: any) => {
  const user = auth().currentUser;

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [urgentTask, setUrgentTask] = useState<TaskModel[]>([]);

  useEffect(() => {
    getTasks();
    // getUrgentTask();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const items = tasks.filter(element => element.isUrgent);

      setUrgentTask(items);
    }
  }, [tasks]);

  const getTasks = () => {
    setIsLoading(true);

    firestore()
      .collection('tasks')
      .where('uids', 'array-contains', user?.uid)

      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`tasks not found`);
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setTasks(items.sort((a, b) => b.createdAt - a.createdAt));
        }
        setIsLoading(false);
      });
  };

  const handleMoveToTaskDetail = (id?: string, color?: string) =>
    navigation.navigate('TaskDetail', {
      id,
      color,
    });
  function add0Tonumber(arg0: number) {
    throw new Error('Function not implemented.');
  }

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
              <TextComponent text={`hi,${user?.email}`} />
              <TitleComponent text="Be Productive today" />
            </View>
            <TouchableOpacity onPress={async () => auth().signOut()}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[golabalStyles.inputContainer]}
            onPress={() =>
              navigation.navigate('ListTasks', {
                tasks,
              })
            }>
            <TextComponent color="#696B6F" text="Search task" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent
            onPress={() =>
              navigation.navigate('ListTasks', {
                tasks,
              })
            }>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent
                  text={`${
                    tasks.filter(
                      element => element.progress && element.progress === 1,
                    ).length
                  }/${tasks.length}`}
                />
                <SpaceComponent height={12} />
                <RowComponent justify="flex-start">
                  {/* <TagComponent
                    text={`${monthNames[date.getMonth()]} ${add0Tonumber(
                      date.getDate(),
                    )}`}
                    onPress={() => console.log('Say Hi!!!')}
                  /> */}
                </RowComponent>
              </View>
              <View>
                <CicularComponent
                  value={Math.floor(
                    (tasks.filter(
                      element => element.progress && element.progress === 1,
                    ).length /
                      tasks.length) *
                      100,
                  )}
                />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowComponent
              onPress={() =>
                navigation.navigate('ListTasks', {
                  tasks,
                })
              }
              justify="flex-end"
              styles={{marginBottom: 16}}>
              <TextComponent size={16} text="See all" flex={0} />
            </RowComponent>
            <RowComponent styles={{alignItems: 'flex-start'}}>
              <View style={{flex: 1}}>
                {tasks[0] && (
                  <CardImageConponent
                    onPress={() =>
                      handleMoveToTaskDetail(tasks[0].id as string)
                    }>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[0],
                        })
                      }
                      style={golabalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[0].title} />
                    <TextComponent
                      text={tasks[0].description}
                      size={13}
                      line={3}
                    />

                    <View style={{marginVertical: 28}}>
                      <AvatarGroup uids={tasks[0].uids} usersName={[]} />
                      {tasks[0].progress &&
                      (tasks[0].progress as number) >= 0 ? (
                        <ProgressBarComponent
                          percent={`${Math.floor(tasks[0].progress * 100)}%`}
                          color="#0AACFF"
                          size="large"
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                    {tasks[0].dueDate && (
                      <TextComponent
                        text={`Due ${HandleDateTime.DateString(
                          tasks[0].dueDate.toDate(),
                        )}`}
                        size={12}
                        color={colors.desc}
                      />
                    )}
                  </CardImageConponent>
                )}
              </View>
              <SpaceComponent width={16} />
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <CardImageConponent
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[1].id as string,
                        'rgba(33, 150, 243, 0.9)',
                      )
                    }
                    color="rgba(33, 150, 243, 0.9)">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[1],
                        })
                      }
                      style={golabalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[1].title} size={18} />
                    {tasks[1].uids && (
                      <AvatarGroup uids={tasks[1].uids} usersName={[]} />
                    )}
                    {tasks[1].progress ? (
                      <ProgressBarComponent
                        percent={`${Math.floor(tasks[1].progress * 100)}%`}
                        color="#A2F068"
                      />
                    ) : (
                      <></>
                    )}
                  </CardImageConponent>
                )}

                <SpaceComponent height={16} />
                {tasks[2] && (
                  <CardImageConponent
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[2].id as string,
                        'rgba(18, 181, 22, 0.9)',
                      )
                    }
                    color="rgba(18, 181, 22, 0.9)">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[2],
                        })
                      }
                      style={golabalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[2].title} />
                    <TextComponent
                      text={tasks[2].description}
                      line={3}
                      size={13}
                    />
                  </CardImageConponent>
                )}
              </View>
            </RowComponent>
          </SectionComponent>
        ) : (
          <></>
        )}

        <SectionComponent>
          <TitleComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          {urgentTask.length > 0 &&
            urgentTask.map(item => (
              <>
                <CardComponent
                  onPress={() => handleMoveToTaskDetail(item.id as string)}
                  key={`urgentTask${item.id}`}
                  styles={{marginBottom: 12}}>
                  <RowComponent>
                    <CicularComponent
                      value={item.progress ? item.progress * 100 : 0}
                      radius={40}
                    />

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingLeft: 12,
                      }}>
                      <TextComponent text={item.title} />
                    </View>
                  </RowComponent>
                </CardComponent>
              </>
            ))}
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
          onPress={() =>
            navigation.navigate('AddNewTask', {
              editable: false,
              task: undefined,
            })
          }
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
          <TextComponent text="Add new tasks" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
