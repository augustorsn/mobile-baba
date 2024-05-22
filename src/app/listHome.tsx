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
import DialogInput from "react-native-dialog-input";



export default function ListHome() {
    LogBox.ignoreLogs([
        // Exact message
        'Warning: componentWillReceiveProps has been renamed',

        // Substring or regex match
        /GraphQL error: .*/,
    ]);

    // Ignore all log notifications
    LogBox.ignoreAllLogs();

    let [nomePedrinha, setNomePedrinha] = useState("")
    const [visibleDialog, setVisibleDialog] = useState(false)
    let [parcialUsuario, setParcialUsuario] = useState<ItemListStore>();
    const itemListStore = useItemListStore()   
    
    console.log("items = >", itemListStore.data)
    console.log("items qtd = >", itemListStore.getItemCount())
    
    
    
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
    function goToSorteio() {
        router.push("/sorteio")
    }



    function removeItemList(items: ItemListStore): void | undefined {
        console.log("foi", items)
        itemListStore.remove(items.id)
        console.log("nova lista", itemListStore.data)

    }

    function goToIncrement() {
        itemListStore.save({ id: '1', nome: `Guto` })

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

    function openDialog(items: ItemListStore) {
        setParcialUsuario(items)
        setVisibleDialog(true)
        
    }

    function updatePerson(nomeString: string) {
        if(parcialUsuario){
            let dataed = itemListStore.data.find((item) => item.id === parcialUsuario.id)
            console.log(dataed)
            if (dataed) {
                dataed.nome = nomeString.trim()
                itemListStore.update(dataed)
            }
        }        
    }
    
    

    return (

        <View className="flex-1 flex-col w-full">
            <DialogInput
                isDialogVisible={visibleDialog}
                title={"Nova pedra beba"}
                message={`Deseja mudar o nome '${parcialUsuario?.nome}?'`}
                hintInput={"Feinho...."}
                initValueTextInput={parcialUsuario?.nome}
                submitInput={(inputText) => {
                    setVisibleDialog(false),
                        updatePerson(inputText);
                }}
                cancelText="cancelar"
                submitText="Enviar"
                closeDialog={() => setVisibleDialog(false)}>
            </DialogInput>

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

                <Text className="mt-5 mb-5 p-3 h-11">Lista de Pedras Bebas qtd itens  </Text>
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

               <Text > Total de pedras bebas na lista = {itemListStore.getItemCount()}  </Text>
                <View className="flex-1">
                    <FlatList

                        data={itemListStore.data}
                        renderItem={({ item }) => <Item openDialog={() => openDialog(item)} removeItemList={() => removeItemList(item)} item={item}></Item>}
                    />

                </View>



                <Button title="Voltar Para Login" onPress={goToLogin} ></Button>
                <Button title="Increment item list" onPress={goToIncrement} ></Button>
                <Button title="Sorteio" onPress={goToSorteio} ></Button>



            </ImageBackground>
        </View>
    )

}


