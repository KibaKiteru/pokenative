import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from '@/components/ThemedText';
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useInfiniteFetchPokemon } from "@/hooks/useFetchQuery";
import { countPokemonNationnal, getPokemonId } from "@/function/pokemon";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { Row } from "@/components/Row";
import { SortButton } from "@/components/SortButton";
import { RootView } from "@/components/RootView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
  const n_nationalPoke = countPokemonNationnal();
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } = useInfiniteFetchPokemon("/pokemon?[limit]", {limit: "limit=21"});
  const [ search, setSearch ] = useState("");
  const [ sortKey, setSortKey ] = useState<"id" | "name">("id");
  const pokemons = data?.pages.flatMap((page) => page.results.map((r) => ({name: r.name, id: getPokemonId(r.url)})) ) ?? [];
  const filteredPokemons = [...(search 
    ? pokemons.filter(
      (pokemon) => 
        pokemon.name.includes(search.toLowerCase()) ||
        pokemon.id.toString() === search
      ) 
    : pokemons
  )].sort((a, b) => (a[sortKey] < b[sortKey]? -1 : 1)).slice(0, 
  n_nationalPoke);

  return (
    <RootView>
      <Row gap={16} style={styles.header}>
        <MaterialCommunityIcons name="pokeball" size={24} color={colors.greyWhite} />
        <ThemedText variant="headLine" color="greyWhite">Pokédex</ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setSearch}/>
        <SortButton value={sortKey} onChange={setSortKey}/>
      </Row>
      <Card style={styles.body}>
        <FlatList 
          data={filteredPokemons} // les données de la liste 
          numColumns={3} // nombre de colone
          columnWrapperStyle={styles.gridGap} //style des colones 
          contentContainerStyle={[styles.gridGap, styles.list]}//style des lignes
          progressViewOffset={30}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint}/> : null
          }
          onEndReached={search ? null : () => fetchNextPage()} //quand on arrive en bas de la liste
          onEndReachedThreshold={0.75} //se déclenche quand on est à 75% de la fin
          renderItem={({item}) => ( //comment afficher les données
            <PokemonCard id={item.id} name={item.name} style={styles.cardPokemon}/>
          )}
          keyExtractor={(item) => item.id.toString()} //clé unique pour chaque élément
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
  },
  body: {
    flex: 1,
  },
  cardPokemon: {
    flex: 1/3,
  },
  gridGap: {
    gap: 8,
  },
  list : {
    padding: 12
  },
  form: {
    padding: 12,
  },
});