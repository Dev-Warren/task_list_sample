import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Button, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite'

import Searchbar from './comps/Searchbar';
import Addtask from './comps/Addtask';
import Tasklist from './comps/Tasklist';
import Color from './config/Color';
import { Styles } from './styles/Styles';

const db=SQLite.openDatabase('tasks.db')

export default function App() {
  const [ taskList, setTaskList ] = useState()
  const [ searchTask, setSearchTask ] = useState()
  const [ task, setTask ] = useState('')
  const [ showAddTask, setShowAddTask ] = useState(false)

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INT PRIMARY KEY AUTOINCREMENT, task TEXT, is_done INT)'
      )
    })
    getTasks

  }, [])

  const getTasks = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tasks ORDER BY is_done',
        [],
        (_, { rows}) => setTaskList(rows._array)
      )
    })
  }

  const addTasks = (task) => {
    if (task === null || task === ""){
      return false
    }

    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO tasks (task, is_done) VALUES (?, 0)',
          [task])
        getTasks  
    })

    setShowAddTask(!showAddTask)
  }


  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.title}>
        { showAddTask ?
          <Text 
            style={Styles.btnText} 
            onPress={()=>setShowAddTask(!showAddTask)}
          >
          Cancel
          </Text>
          : 
          <Text 
            style={Styles.titleText}
          >
          TASK LIST
          </Text> 
        }
        
        { showAddTask ?
          <Button 
            color={Color.active} 
            title='Done'
            onPress={addTasks(task)}
          />
          :
          <Button 
            color={Color.active} 
            title='Add' 
            onPress={()=>setShowAddTask(!showAddTask)}
          /> 
        }
      </View>

      { showAddTask ? 
        <Addtask 
          task={task} 
          setTask={setTask}
        />
        : 
        <Searchbar 
          searchTask={searchTask} 
          setSearchTask={setSearchTask}
        />
      }
      
      <Tasklist taskList={taskList}/>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

