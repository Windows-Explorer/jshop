import { Component, memo } from "react"
import React from "react"
import { Button, Pressable, Text, Touchable, TouchableOpacity } from "react-native"

type CButtonProps = {
    title: string,
    onClick: Promise<any>
}

export default class CButton extends Component {

    
    
    render(): React.ReactNode {
        return (
            <Pressable style={{
                backgroundColor: "#6176e6",
                width: "50%",
                padding: 10,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
            }} 
            android_ripple={{
                color: "#fff"
            }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 30,
                        
                    }}
                >Войти</Text>
            </Pressable>
        )
    }

}