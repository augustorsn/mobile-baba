import { Button } from "@/components/button"
import { Item } from "@/components/item";
import { router } from "expo-router"
import React from "react"
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet, FlatList } from "react-native"

export default function ListHome() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
        logo: {
            width: 110,
            height: 150,
        },

    });

    function goToLogin() {
        router.push("/")
    }

    let dadosLista = [
        { key: 'Guto' },
        { key: 'Alisson Schweinsteiger' },
        { key: 'Icaro' },
        { key: 'Ruan' },
        { key: 'Alan' },
        { key: 'Indio' },
        { key: 'Feinho' },
        { key: 'Adebabol' },
        { key: 'Vinny' },
        { key: 'Sam' },
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Jackson' },
        { key: 'James' },
        { key: 'Joel' },
        { key: 'John' },
        { key: 'Jillian' },
        { key: 'Jimmy' },
        { key: 'Julie' },
        
    ]


    return (
        <View className="flex-1 flex-col w-full">


            <ImageBackground className="flex-1 flex-col p-8" source={require("@/assets/img/fundo.jpg")}>
                <StatusBar barStyle="light-content" />
                <View className="justify-center items-center ">
                    <Image
                        source={require("@/assets/img/icon.png")}

                        style={styles.logo}
                    />

                </View>

                <Text className="mt-5 mb-5" style={styles.item}>Lista de Pedras Bebas</Text>
                <FlatList
                    className="h-10"
                    data={dadosLista}
                    renderItem={({ item }) => <Item item={item.key}></Item>}
                />



                <Button title="Voltar Para Login" onPress={goToLogin} ></Button>


            </ImageBackground>
        </View>
    )

}


