import React, { useState } from 'react'
import { View, TextInput, Text, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Styles } from '../styles/Styles'
import Color from '../config/Color'

const Searchbar = ({
    searchTask,
    setSearchTask
}) => {

    const [ showingCancel, setShowingCancel ] = useState(false)

    return (
        <View style={Styles.inputWrapper}>
            <AntDesign 
                name="search1" 
                size={20} 
                color={Color.disative} 
                style={{paddingLeft: 5}} 
            />
            <TextInput
                placeholder={'Search'}
                placeholderTextColor={Color.disative}
                selectionColor={Color.active}
                onChangeText={(t) => setSearchTask(t)}
                // onSubmitEditing={() => {
                //     setSearchTask('')
                // }}
                onFocus={() => {
                    setSearchTask('')
                    setShowingCancel(true)
                }}
                value={searchTask}
                style={Styles.searchInput}
            />

            {
                showingCancel?
                <View style={{flexDirection: 'row'}}>
                    <AntDesign 
                        name="closecircle" 
                        size={20} 
                        color={Color.disative} 
                        style={{paddingRight: 15}}
                        onPress={() => setSearchTask('')}
                    />
                    <Text 
                        style={Styles.btnText} 
                        onPress={() => {
                            setSearchTask('')
                            setShowingCancel(false)
                            Keyboard.dismiss()
                        }}
                    >
                        Cancel</Text>
                </View>
                :
                null
            }
      </View>
    )
}

export default Searchbar
