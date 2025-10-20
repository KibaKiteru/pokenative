import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonArtWork } from "@/function/pokemon";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View, type ViewStyle } from "react-native";

type PokeProps = {
    style?: ViewStyle,
    id: number,
    name: string,
}

export function PokemonCard({style, id, name}: PokeProps) {
    const colors = useThemeColors();
    return (
        <Link href={{pathname: "/pokemon/[id]", params: {id: id, name: name}}} asChild>
            <Pressable style={style} android_ripple={{color: colors.tint, foreground: true}}>
                <Card style={[styles.CardContainer]}>
                    <View style={[styles.shadow, {backgroundColor: colors.greyBackground}]}/>
                    <ThemedText style={styles.idPokemon} variant="caption" color="greyMedium">#{id.toString().padStart(3, '0')}</ThemedText>
                    <Image 
                        source={{uri: getPokemonArtWork(id)}}
                        width={72}
                        height={72}
                        />
                    <ThemedText style={styles.styleText}>{name}</ThemedText>
                </Card>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    CardContainer: {
        position: "relative",
        alignItems: "center",
        padding: 4,
    },
    idPokemon: {
        alignSelf: "flex-end",
    },
    shadow: {
        position: "absolute",
        height: 44,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 7,
    },
    styleText: {
        textTransform: "capitalize",
    }
});