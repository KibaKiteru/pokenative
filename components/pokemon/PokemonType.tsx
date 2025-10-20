import { Colors } from "@/constants/Colors"
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type PropsPokemonType = {
    name: keyof typeof Colors["type"];
}

export function PokemonType({name}: PropsPokemonType) {
    return <View style={[styles.type, {backgroundColor: Colors.type[name]}]}>
        <ThemedText color="greyWhite" variant="subtitle3" style={styles.styleText}>{name}</ThemedText>
    </View>
}

const styles = StyleSheet.create({
    type: {
        flex: 0,
        height: 20,
        paddingHorizontal: 8,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    styleText: {
        textTransform: "capitalize",
    }
})