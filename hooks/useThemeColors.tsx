import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";


export function useThemeColors () {
    const theme = useColorScheme() ?? "ligth";
    return Colors[theme];
}