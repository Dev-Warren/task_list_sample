import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Button } from 'react-native'
import * as SQLite from 'expo-sqlite'

import Searchbar from './comps/Searchbar';
import Tasklist from './comps/Tasklist';
import Addtask from './comps/Addtask';
import Color from './config/Color';
import { Styles } from './styles/Styles';

const db = SQLite.openDatabase('db.db')

const App = () => {
    const [ text, setText ] = useState(null)
    const [ items, setItems ] = useState([])
    const [ loadItems, setLoadItems ] = useState([])
    const [ searchTask, setSearchTask ] = useState('')
    const [ showAddTask, setShowAddTask ] = useState(false)
    const [ showEditBtn, setShowEditBtn ] = useState(false)

    useEffect(() => {
        const loadTasks = async () => {
            try{
                db.transaction((tx) => {
                    tx.executeSql('create table if not exists items ( id integer primary key autoincrement, done int, value text)')
                })

                db.transaction((tx) => {
                    tx.executeSql('select * from items order by done, id desc',[],
                    (_, {rows}) => {
                        setItems(rows._array)
                        setLoadItems(rows._array)
                    })
                })


            } catch (err) {
                console.log(err.message)
            }
        }
        loadTasks()
    }, [])
    
    useEffect(() => {
        setLoadItems((items).filter( i => (i.value).toLowerCase().includes(searchTask.toLowerCase())))
    }, [searchTask])

    const add = (text) => {
        if( text === null || text === ''){
            return false
        }

        db.transaction((tx) => {
            tx.executeSql('insert into items (done, value) values (0, ?)', [text])
            tx.executeSql( 'select * from items order by done, id desc', [], (_, {rows}) => {
                setItems(rows._array)
                setLoadItems(rows._array)
            })
        })
        setShowAddTask(false)
    }

    const checkHandler = (id) => {
        db.transaction((tx) => {
            tx.executeSql('update items set done = 1 where id = ?', [id])
            tx.executeSql( 'select * from items order by done, id desc', [], (_, {rows}) => {
                setItems(rows._array)
                setLoadItems(rows._array)
            })
        })

    }

    const editHandler = (id) => {
        db.transaction((tx) => {
            tx.executeSql('delete from items where id = ?', [id])   
        })

        db.transaction((tx) => {
            tx.executeSql( 'select * from items order by done, id desc', [],
            (_, {rows}) => {
                setItems(rows._array)
                setLoadItems(rows._array)
            })
        })
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
                null
                :
                <View style={{flexDirection: 'row'}}>
                    <Button 
                        color={Color.active} 
                        title='Edit' 
                        onPress={()=>setShowEditBtn(!showEditBtn)}
                    /> 
                    <Button 
                        color={Color.active} 
                        title='Add' 
                        onPress={()=> {
                          setShowAddTask(!showAddTask)
                          setShowEditBtn(false)
                        }}
                    />
                </View> 
                }
            </View>

            {  
              showAddTask ?
                <Addtask
                    text={text}
                    setText={setText}
                    add={add}
                />
                :
                <Searchbar 
                    searchTask={searchTask} 
                    setSearchTask={setSearchTask}
                /> 
            }

            <Tasklist 
                items={loadItems} 
                searchTask={searchTask}
                checkHandler={checkHandler}
                editHandler={editHandler}
                showEditBtn={showEditBtn}
            />

        </SafeAreaView>
    )
}

export default App
