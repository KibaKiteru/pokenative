import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from 'react-native-safe-area-context';

type PropsRootView = ViewProps & {
    backgroundColor?: string 
};

export function RootView({style, backgroundColor, ...rest}: PropsRootView) {
    const colors = useThemeColors();
    const progress = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0,1],
                [colors.tint, backgroundColor ?? colors.tint],
            )
        }
    }, [backgroundColor]);

    useEffect(() => {
        progress.value = 0;
        if (backgroundColor) {
            progress.value = withTiming(1, {
                duration: 700,
                easing: Easing.out(Easing.quad),
                reduceMotion: ReduceMotion.System,
            });
        }
    }, [backgroundColor]);

    if (!backgroundColor) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}, style]}{...rest}/>
        );
    }
    return (<Animated.View style={[styles.containerBis, animatedStyle, style]}>
        <SafeAreaView style={styles.container} {...rest} />
    </Animated.View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    containerBis: {
        flex: 1,
    }
})