import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import React, { Component, PropsWithChildren, PropsWithoutRef } from "react"
import CButton from "../components/c-button.component"

export default class AuthentificationScreen extends Component {

    render(): React.ReactNode {
        return (
            <View
                style={{ flex: 0, justifyContent: "center", alignItems: "center", gap: 30,  }}
            >
                <Text style={{ fontSize: 36, fontFamily: "Roboto" }}>Вход</Text>
                <CButton />
            </View>
        )
    }
}