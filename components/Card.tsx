import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View, type ViewProps } from "react-native";

type Props = ViewProps;

export function Card({style, ...rest}: Props) {
    const colors = useThemeColors();
    return <View style={[style, styles.CardContainer, {backgroundColor: colors.greyWhite}]} {...rest}/>;
}


const styles = StyleSheet.create({
    CardContainer: {
        overflow: "hidden",
        borderRadius: 8,
        ...Shadows.dp2,
    },
});