import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from "react-native-reanimated";
import { Button, Pressable, Text, Touchable, View } from "react-native";
import React from "react";
import { Swipeable } from "react-native-gesture-handler";

export default function AnimatedButton() {
    const scaleShared = useSharedValue(1)
    const elevationShared = useSharedValue(3)
    const borderRadiusShared = useSharedValue(0)

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            elevation: elevationShared.value,
            transform: [{ scale: scaleShared.value }]
        }
    }, [])

    function playAnimation() {
        scaleShared.value = scaleShared.value === 1 ? withSpring(2, { damping: 3, mass: 1.1 }) : withSpring(1)
    }

    return (
        <View style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Animated.View style={[{
                backgroundColor: "white",
                borderRadius: 6
            }, reanimatedStyle]}>
                <Pressable onPress={playAnimation} style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }} android_ripple={{
                    color: "gray",
                    radius: 80,
                    borderless: true
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>CLICK</Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}