import { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2";

type API = {
    '/pokemon?[limit]': {
        count: number,
        next: string | null,
        results: {
            name: string, 
            url: string,
        }[]
    },
    '/pokemon/[id]': {
        id: number,
        name: string,
        url: string,
        weight: number,
        height: number,
        moves: { 
            move: { 
                name: string
            } 
        }[],
        stats: { 
            base_stat: number,
            stat: {
                name: string,
            }
        }[],
        cries: {
            latest: string,
        },
        types: {
            type: {
                name: keyof typeof Colors["type"],
            },
        }[],
    },
    "/pokemon-species/[id]": {
        flavor_text_entries: {
            flavor_text: string,
            language: {
                name: string,
            }
        }[],
    },
    "/pokedex/[id]": {
        pokemon_entries: {
            entry_number: number,
            pokemon_species: {
                name: string,
                url: string,
            }
        }[]
    }
};

export function useFetchPokemon<T extends keyof API>(path: T, params?: Record<string, string | number>) {
    const localUrl = endpoint + Object.entries(params ?? {}).reduce((acc, [key, value]) => acc.replace(`[${key}]`, value), path);
    return useQuery({
        queryKey: [localUrl],
        queryFn: async () => {
            // await wait(1);
            return fetch(localUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json() as Promise<API[T]>);

        }
    });
}

export function useInfiniteFetchPokemon<T extends keyof API>(path: T, params?: Record<string, string | number>) {
    const localUrl = endpoint + Object.entries(params ?? {}).reduce((acc, [key, value]) => acc.replace(`[${key}]`, value), path);
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: localUrl,
        queryFn: async ({ pageParam }) => {
            // await wait(1);
            return fetch(pageParam, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json() as Promise<API[T]>);
        },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage) {
                return lastPage.next;
            }
            return null;
        }
    });
}

function wait (secound: number) {
    return new Promise(resolve => setTimeout(resolve, secound*1000));
}