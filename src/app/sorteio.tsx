import { Button } from "@/components/button"
import { Item } from "@/components/item";
import { ItemListStore, useItemListStore } from "@/store/item-lista-store";

import { router } from "expo-router"
import React, { useState } from "react"
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet, FlatList, Alert, ListRenderItem } from "react-native"

import { LogBox } from "react-native"




export default function Sorteio() {
    LogBox.ignoreLogs([
        // Exact message
        'Warning: componentWillReceiveProps has been renamed',

        // Substring or regex match
        /GraphQL error: .*/,
    ]);

    // Ignore all log notifications
    LogBox.ignoreAllLogs();
    const itemListStore = useItemListStore()


    console.log("Team One = >", itemListStore.teamOne)
    console.log("Team Two = >", itemListStore.teamTwo)
    console.log("Team Three = >", itemListStore.teamThree)
    console.log("Team Four = >", itemListStore.teamFour)

    const styles = StyleSheet.create({
        logo: {
            width: 110,
            height: 150,
        },
    });

    function goToLogin() {
        router.push("/")
    }
    const renderItem: ListRenderItem<ItemListStore> = ({ item }) => (
        <View className="flex-1">
            <Text>{item.nome}</Text>
        </View>
    );

    return (

        <View className="flex-1 flex-col w-full">

            <ImageBackground className="flex-1 flex-col p-8" source={require("@/assets/img/campo_fundo.png")}
                resizeMode="stretch"
            >
                <StatusBar barStyle="light-content" />
                <View className="justify-center items-center ">
                    <Image
                        source={require("@/assets/img/icon.png")}

                        style={styles.logo}
                    />

                </View>

                <Text className="mt-5 mb-5 p-3 h-11">Sorteio</Text>
                <View className="flex-1">
                    <Text className="mt-5 mb-5 p-3 h-11">Time 1</Text>
                    <FlatList

                        data={itemListStore.teamOne}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />


                    <Text className="mt-5 mb-5 p-3 h-11">Time 2</Text>
                    <FlatList

                        data={itemListStore.teamTwo}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />


                    <Text className="mt-5 mb-5 p-3 h-11">Time 3</Text>
                    <FlatList

                        data={itemListStore.teamThree}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />

                    <Text className="mt-5 mb-5 p-3 h-11">Time 4</Text>
                    <FlatList

                        data={itemListStore.teamFour}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />

                </View>


                <Button title="Voltar Para Login" onPress={goToLogin} ></Button>
            </ImageBackground>
        </View>
    )

}


