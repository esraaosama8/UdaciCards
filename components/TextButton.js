import React from 'react'
import { Text,TouchableOpacity } from 'react-native'

 export default  function TextButton ({onPress,styles,text,color}){
    return (
      <TouchableOpacity onPress={onPress} style={[styles.submitButton,{backgroundColor:color}]}>

        <Text style={styles.text}>
           {text}
        </Text>

      </TouchableOpacity>
    )
}