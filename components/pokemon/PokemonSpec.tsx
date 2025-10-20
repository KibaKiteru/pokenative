import { type ImageSourcePropType, type ViewProps, Image, StyleSheet, View } from "react-native"
import { Row } from "@/components/Row";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "../ThemedText";

type PropsPokemonSpec = ViewProps & {
    title?: string,
    description?: string,
    image?: ImageSourcePropType,
}

export function PokemonSpec({style, image, title, description, ...rest}: PropsPokemonSpec) {
    const colors = useThemeColors();
    return <View style={[style, styles.spec]} {...rest}>
        <Row style={styles.details}>
            {image && <Image style={styles.image} source={image} width={16} height={16}/>}
            <ThemedText>{title}</ThemedText>
        </Row>
        <ThemedText variant="caption" color="greyMedium">{description}</ThemedText>
    </View>

}

const styles = StyleSheet.create({
    spec: {
        flex: 1,
        gap: 4,
        alignItems: "center",
    },
    image: {
        width: 16,
        height: 16,
    },
    details: {
        height: 32,
        alignItems: "center",
    }
});