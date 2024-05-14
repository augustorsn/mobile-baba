import { Button } from "@/components/button"
import { Item } from "@/components/item";
import { ItemListStore, useItemListStore } from "@/store/item-lista-store";
import { router } from "expo-router"
import React, { useState } from "react"
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet, FlatList } from "react-native"



export default function ListHome() {
    let [id,setId] = useState(1)
    
    const itemListStore = useItemListStore()
    console.log("items = >", itemListStore.data)        
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


    function removeItemList(items: ItemListStore): void | undefined {
        console.log("foi", items)
        itemListStore.remove(items.id)
        console.log("nova lista", itemListStore.data)

    }

    function goToIncrement() {        
        itemListStore.save({ id: '1', nome: `Guto` })
      
    }
    function updateItemList(items: ItemListStore): void | undefined {
        console.log("foi", items)
        setId(id+1)
        items.nome = `Miss Coelho${id}`
        itemListStore.update(items)
        console.log("nova lista", itemListStore.data)

    }

    

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
                    data={itemListStore.data}
                    renderItem={({ item }) => <Item updateItemList={() => updateItemList(item)} removeItemList={() => removeItemList(item)} item={item}></Item>}
                />



                <Button title="Voltar Para Login" onPress={goToLogin} ></Button>
                <Button title="Increment item list" onPress={goToIncrement} ></Button>
                


            </ImageBackground>
        </View>
    )

}


