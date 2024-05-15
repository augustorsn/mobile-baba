import { Button } from "@/components/button"
import { Input } from "@/components/input";
import { InputList } from "@/components/inputList";
import { Item } from "@/components/item";
import { ItemListStore, useItemListStore } from "@/store/item-lista-store";
import { colors } from "@/styles/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router"
import React, { useState } from "react"
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet, FlatList, Alert } from "react-native"

import ActionButton from 'react-native-action-button';
import Icon from '@expo/vector-icons/Ionicons';
import { LogBox } from "react-native"



export default function ListHome() {
    LogBox.ignoreLogs([
        // Exact message
        'Warning: componentWillReceiveProps has been renamed',

        // Substring or regex match
        /GraphQL error: .*/,
    ]);

    // Ignore all log notifications
    LogBox.ignoreAllLogs();
    let [id, setId] = useState(1)
    let [nomePedrinha, setNomePedrinha] = useState("")

    const itemListStore = useItemListStore()
    console.log("items = >", itemListStore.data)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
        },
        item: {

            fontSize: 18,

        },
        logo: {
            width: 110,
            height: 150,
        },
        input: {
            width: "50%",
        },
        actionButtonIcon: {
            fontSize: 20,
            height: 22,
            color: 'white',
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
        setId(id + 1)
        items.nome = `Miss Coelho${id}`
        itemListStore.update(items)
        console.log("nova lista", itemListStore.data)

    }

    function insertPerson() {
        console.log("foi =>", nomePedrinha)
        if (!nomePedrinha.trim()) {
            return Alert.alert("Cadastro", "Preencha o nome da pedra beba!")
        }
       
        itemListStore.save({ id: '1', nome: `${nomePedrinha}` })
        setNomePedrinha('')

        Alert.alert("Cadastro", "Pedra beba adicionada com sucesso!")
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

                <Text className="mt-5 mb-5 p-3 h-11">Lista de Pedras Bebas</Text>
                <View className="flex-row">
                    <InputList >
                        <FontAwesome6
                            name="user-circle"
                            color={colors.gray[200]}
                            size={20}
                        />
                        <Input.Field
                            value={nomePedrinha}
                            placeholder="Pedrinha beba...."
                            onChangeText={setNomePedrinha}

                        />
                    </InputList>

                    <View className="w-2/5">
                        {/* Rest of the app comes ABOVE the action button component !*/}
                        <ActionButton useNativeFeedback={false} renderIcon={active => active ? (<Text>+</Text>) : (<Icon name="person-add-outline" />)} verticalOrientation="up" className="w-full" buttonColor={colors.blue[500]} >
                            <ActionButton.Item buttonColor='#9b59b6' title="Mensalista" className="w-full" onPress={insertPerson}>
                                <Icon name="person-add-outline" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item className="w-full" buttonColor='#3498db' title="Pedrinha" onPress={() => { insertPerson }}>
                                <Icon name="person-add-outline" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                        </ActionButton>
                    </View>

                </View>

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


