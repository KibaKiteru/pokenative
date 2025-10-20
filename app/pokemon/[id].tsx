import { Card } from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { formatSize, formatWeight, getPokemonArtWork, basePokemonStats } from "@/function/pokemon";
import { useFetchPokemon } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { Audio } from 'expo-av';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams()as {id: string, name: string};
    const { data: pokemon } = useFetchPokemon("/pokemon/[id]", {id: params.id});
    const { data: species } = useFetchPokemon("/pokemon-species/[id]", {id: params.id});
    const id = parseInt(params.id, 10);
    const mainType = pokemon?.types?.[0].type.name;
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const types = pokemon?.types ?? [];
    const bio = species?.flavor_text_entries?.find(({language}) => language.name === "en") ?.flavor_text.replaceAll("\n",". ");


    const stats = pokemon?.stats ?? basePokemonStats;

    const onImagePress = async() => {
        const cry = pokemon?.cries.latest;
        if (!cry) return;
        const { sound } = await Audio.Sound.createAsync({
            uri: cry
        }, { shouldPlay: true });
        sound.playAsync();
    }

    const onPrevius = () => {
        let pokeId = Math.max(id - 1, 1);
        router.replace({pathname: "/pokemon/[id]", params: {id: pokeId}});
    }
    const onNext = () => {
        let pokeId = Math.min(id + 1, 1025);
        router.replace({pathname: "/pokemon/[id]", params: {id: pokeId}});
    }


    return (
        <RootView backgroundColor={colorType}>
            <View>
                <Image style={styles.pokeball} source={require("@/assets/images/Pokeball_big.png")} width={208} height={208}/>
                {/*header*/}
                <Row style={styles.header}>
                    <Row gap={8}>
                        <Pressable onPress={router.back}>
                            <MaterialIcons name="arrow-back" size={24} color={colors.greyWhite} />
                        </Pressable>
                        <ThemedText color="greyWhite" variant="headLine" style={styles.styleText}>{pokemon?.name}</ThemedText>
                    </Row>
                    <ThemedText color="greyWhite" variant="subtitle2">#{params.id.padStart(3, '0')}</ThemedText>
                </Row>
                <View style={styles.body}>
                    <Row style={styles.imgRow}>
                        {id === 1 ? <View/> : <TouchableOpacity onPress={onPrevius}>
                            <MaterialIcons name="chevron-left" size={24} color={colors.greyWhite} />
                        </TouchableOpacity> }
                        <TouchableOpacity onPress={onImagePress}>
                            <Image
                                style={styles.artwork}
                                source={{uri: getPokemonArtWork(Number.parseInt(params.id))}}
                                width={200}
                                height={200}
                            />
                        </TouchableOpacity>
                        {id === 1025 ? <View/> : <TouchableOpacity onPress={onNext}>
                            <MaterialIcons name="chevron-right" size={24} color={colors.greyWhite} />
                        </TouchableOpacity>}
                    </Row>
                        {/*body*/}
                    <Card style={styles.card}>
                        <Row gap={16} style={styles.types}>
                            {types.map(type => <PokemonType name={type.type.name} key={type.type.name}/>)}
                        </Row>
                        {/*About*/}
                        <ThemedText variant="subtitle1" style={{color: colorType}}>About</ThemedText>
                        <Row>
                            <PokemonSpec style={[styles.styleSpec, {borderColor: colors.greyLight}]} title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/weight.png")}/>
                            <PokemonSpec style={[styles.styleSpec, {borderColor: colors.greyLight}]} title={formatSize(pokemon?.height)} description="Size" image={require("@/assets/images/straighten.png")}/>
                            <PokemonSpec title={pokemon?.moves.slice(0, 2).map(m => m.move.name).join("\n")} description="Moves"/>
                        </Row>
                        <ThemedText>{bio}</ThemedText>
                        {/*Base stats*/}
                        <ThemedText variant="subtitle1" style={{color: colorType}}>Base stats</ThemedText>
                        <View style={styles.styleBaseStat}>
                            {stats.map(stat => <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType}/>)}
                        </View>
                    </Card>
                </View>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
    },
    pokeball: {
        opacity: 0.1,
        position: "absolute",
        right: 8,
        top: 8,
    },
    imgRow: {
        position:"absolute",
        top: -140,
        justifyContent:"space-between",
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        zIndex: 2,
    },
    artwork: {},
    body: {
        marginTop: 144,
    },
    card: {
        paddingTop: 56,
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        gap: 16,
    },
    styleText: {
        textTransform: "capitalize",
    },
    styleSpec: {
        borderStyle: "solid",
        borderRightWidth: 1,
    },
    styleBaseStat: {
        alignSelf: "stretch",
    },
    types: {
        height: 20,
    }
})
