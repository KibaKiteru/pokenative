import { StyleSheet, View, ViewProps } from "react-native"
import { Row } from "@/components/Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

type PorpsPokemonStat = ViewProps & {
    name: string,
    value: number,
    color: string,
}

function statShortName(name: string):string {
    return name.replaceAll("special", "S").replaceAll("-","").replaceAll("attack","ATK").replaceAll("defense","DEF").replaceAll("speed","SPD").toUpperCase();
}


export function PokemonStat({style, name, color, value, ...rest}: PorpsPokemonStat) {
    const colors = useThemeColors();
    name = statShortName(name);
    const sharedValue = useSharedValue(value);
    const barInnerStyle = useAnimatedStyle(() => {
        return {
            flex: sharedValue.value
        }
    });
    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
            flex: 255 - sharedValue.value
        }
    });


    useEffect(() => {
        sharedValue.value = withSpring(value);
    }, [value]);



    return <Row gap={8} style={[style]} {...rest} >
        <View style={[styles.name, {borderColor: colors.greyLight}]}>
            <ThemedText variant="subtitle3" style={{color: color}}>{name}</ThemedText>
        </View>
        <View  style={styles.number}>
            <ThemedText color="greyDark">{value.toString().padStart(3,'0')}</ThemedText>
        </View>
        <Row style={styles.bar}>
            <Animated.View style={[styles.barInner, {backgroundColor: color}, barInnerStyle]}/>
            <Animated.View style={[styles.barBackground, {backgroundColor: color}, barBackgroundStyle]}/>
        </Row>
    </Row>
}

const styles = StyleSheet.create({
    name: {
        width: 40,
        borderRightWidth: 1,
        borderStyle: "solid",
        paddingRight: 8,
    },
    number: {
        width: 23,
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 4,
        overflow: "hidden",
    },
    barInner: {
        height: 4,
    },
    barBackground: {
        height: 4,
        opacity:0.24,
    },
});