import { StyleSheet, View, type ViewProps } from "react-native";

type PropsRow = ViewProps & {
    gap?: number,
}
export function Row({style, gap, ...rest}: PropsRow) {
    return <View style={[styles.rowstyle, style, gap? {gap: gap}: undefined]} {...rest}/>
}


const styles = StyleSheet.create({
    rowstyle: {
        flexDirection: "row",
        alignItems: "center",
    }
})