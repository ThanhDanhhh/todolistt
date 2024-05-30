import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/container';
import TextComponent from '../../components/TextComponent';

const AddNewTask = () => {
  return (
    <Container back title="Add new task">
      <TextComponent text="Add new task" />
    </Container>
  );
};

export default AddNewTask;
