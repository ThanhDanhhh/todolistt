import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/container';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {TaskModel} from '../../models/TaskModel';

const ListTasks = ({navigation, route}: any) => {
  const {tasks}: {tasks: TaskModel[]} = route.params;

  return (
    <Container back>
      <TextComponent text="Hello," />
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginBottom: 24,
              paddingHorizontal: 16,
            }}
            onPress={() => navigation.navigate('TaskDetail', {id: item.id})}
            key={item.id}>
            <TitleComponent text={item.title} />
            <TextComponent text={item.description} line={3} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ListTasks;
