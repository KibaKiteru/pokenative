import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
import { Radio } from "./Radio";

type PropsSortButton = {
    value: "id" | "name",
    onChange: (v: "id" | "name") => void;
}

const options = [
    {label: "Number", value: "id"},
    {label: "Name", value: "name"},
] as const;

export function SortButton({value, onChange}: PropsSortButton) {
    const buttonRef = useRef<View>(null);
    const colors = useThemeColors();
    const [isModalVisible, setModalVisibility] = useState(false);
    const [position, setPosition] = useState<null | {
        top: number;
        right: number;
    }>(null);
    const onButtonPress = () => {
        //messure la position de l'élément dans la fenètre
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height ,
                right: Dimensions.get("window").width - x - width,
            });
        });
        setModalVisibility(true);
    }
    const onClose = () => {
        setModalVisibility(false);
    }
    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View 
                    ref={buttonRef}
                    style={[styles.button, {backgroundColor: colors.greyWhite}]}
                >
                    {(value === "id") 
                    ? <MaterialIcons name="tag" size={16} color={colors.tint}/>
                    : <MaterialIcons name="sort-by-alpha" size={16} color={colors.tint}/>
                    }
                </View>
            </Pressable>
            <Modal 
                animationType="fade"
                transparent 
                visible={isModalVisible} 
                onRequestClose={onClose}
            >
                <Pressable style={styles.backdrop} onPress={onClose}>
                    <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
                        <ThemedText
                        style={styles.title} 
                        variant="subtitle2" 
                        color="greyWhite"
                        >
                            Sort by:
                        </ThemedText>
                        <Card style={styles.card}>
                            {options.map((o) => 
                            <Pressable key={o.value} onPress={() => onChange(o.value)}>
                                <Row gap={8}>
                                    <Radio checked={o.value === value}/>
                                    <ThemedText>{o.label}</ThemedText>
                                </Row>
                            </Pressable>
                        )}
                        </Card>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    popup: {
        position: "absolute",
        width: 113,
        padding: 4,
        paddingTop: 16,
        borderRadius: 12,
        gap: 16,
        ...Shadows.dp2,
    },
    title: {
        paddingLeft: 20,
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
    }
});