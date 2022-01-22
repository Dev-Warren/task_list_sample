import React from 'react'
import { FlatList, Text, TouchableHighlight, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

import Color from '../config/Color'
import { Styles } from '../styles/Styles'


const Tasklist = ({
    items,
    showEditBtn,
    checkHandler =()=> {},
    editHandler =() => {}
}) => {

    const renderItem =({item}) => (
        <View style={Styles.listItem}>
            { item.done ? 
                <TouchableHighlight onPress={() => checkHandler(item.id)}>
                    <FontAwesome 
                        name="check-square" 
                        size={20} 
                        color={Color.altactive}
                        style={{paddingLeft: 5}} 
                    />
                </TouchableHighlight>
                :
                <TouchableHighlight onPress={() => checkHandler(item.id)} >
                    <FontAwesome5 
                        name="square" 
                        size={20} 
                        color={Color.disative}
                        style={{paddingLeft: 5}}
                    />
                </TouchableHighlight>
            }
            <Text 
                style={{
                    color: item.done? Color.disative : Color.secondary, marginLeft: 10, 
                    fontSize: 20,
                    width: '75%',
                    }}>
                {item.value}
            </Text>
            
            { showEditBtn ?
                <TouchableHighlight onPress={() => editHandler(item.id)}>
                    <FontAwesome5 
                        name="minus-circle" 
                        size={20} 
                        color={Color.active}
                        style={{paddingLeft: 10}}
                    />
                </TouchableHighlight>
                :
                null
            }

        </View>
    ) 

    return (
        <View style={Styles.list}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Tasklist
