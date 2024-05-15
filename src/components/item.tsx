import React from "react";
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet, SectionList } from "react-native"
import { Button } from "./button";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemListStore } from "@/store/item-lista-store";

type Props = {
    item: ItemListStore
    removeItemList?: () => void
    updateItemList?: () => void
}



export function Item({ removeItemList,updateItemList, item }: Props) {
    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
        },
        tinyLogo: {
            width: 50,
            height: 50,
        },
        logo: {
            width: 110,
            height: 150,
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
    });
    return (
        <View className="flex-row items-center w-full flex-wrap justify-between bg-gray-400">
            <Text  style={styles.item}>{item.nome}</Text>
            <View className="flex-row items-end">
                <Button onPress={removeItemList} title="Remover" className="w-20" />
                <Button onPress={updateItemList} title="Editar" className="w-20" />
            </View>



        </View>

    )
}