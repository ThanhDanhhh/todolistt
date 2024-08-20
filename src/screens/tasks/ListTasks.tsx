import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {TaskModel} from '../../models/TaskModel';
import SectionComponet from '../../components/SectionComponet';
import InputComponent from '../../components/InputComponent';
import {SearchNormal, SearchNormal1} from 'iconsax-react-native';
import {colors} from '../../contants/colors';

const ListTasks = ({navigation, route}: any) => {
  const {tasks}: {tasks: TaskModel[]} = route.params;

  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<TaskModel[]>([]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const items = tasks.filter(element =>
        element.title
          .toLocaleLowerCase()
          .includes(searchKey.toLocaleLowerCase()),
      );
      setResults(items);
    }
  }, [searchKey]);

  return (
    <Container back>
      <SectionComponet>
        <InputComponent
          value={searchKey}
          onChange={val => setSearchKey(val)}
          allowClear
          prefix={<SearchNormal1 size={20} color={colors.gray2} />}
          placeholder="Search"
        />
      </SectionComponet>

      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={searchKey ? results : tasks}
        ListEmptyComponent={
          <SectionComponet>
            <TextComponent text="Data not found!!!!" />
          </SectionComponet>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginBottom: 24,
              paddingHorizontal: 16,
            }}
            onPress={() => navigation.navigate('TaskDetail', {id: item.id})}
            key={item.id}>
            <TitleComponent text={item.title} />
            <TextComponent text={item.description} line={2} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ListTasks;
