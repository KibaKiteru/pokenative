import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type PropsSearchBar = {
    value: string,
    onChange: (text: string) => void,
}


export function SearchBar({value, onChange}: PropsSearchBar) {
    const colors = useThemeColors();
    const logoHeight = 16;
    return (
        <Row gap={8} style={[styles.wrapper, {backgroundColor: colors.greyWhite}]}>
            <MaterialIcons name="search" size={24} color={colors.tint} />
            <TextInput style={styles.input} onChangeText={onChange} value={value}/>
        </Row>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12,
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 13,
        lineHeight: 16,
        // backgroundColor: "#000"
    }
})