import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import React, { Component, PropsWithChildren, PropsWithoutRef, useEffect } from "react"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { withRepeat } from "react-native-reanimated"
import MaskedView from "@react-native-masked-view/masked-view"
import AnimatedButton from "../components/animated-button.component"


export default function AuthentificationScreen() {

    return (
        <View>
            <AnimatedButton />
        </View>
    )
}