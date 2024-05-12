import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { colors } from "@/styles/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import React from "react"
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet } from "react-native"

export default function Register() {
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
    });

    function registerOnLogin(){
        router.push("/")
    }

    return (
        <View className="flex-1 flex-col">


            <ImageBackground className="flex-1 flex-col p-8 mt-10" source={require("@/assets/img/fundo.jpg")}>
                <StatusBar barStyle="light-content" />
                <View className="justify-center items-center ">
                    <Image
                        source={require("@/assets/img/icon.png")}

                        style={styles.logo}
                    />

                    <Input>

                        <Input.Field
                            placeholder="USUÁRIO"
                        />
                    </Input>


                    <Input >

                        <Input.Field
                            placeholder="SENHA"
                        />
                    </Input>

                    <Button title="Novo Cadastro" onPress={registerOnLogin} ></Button>
                </View>

            </ImageBackground>
        </View>
    )
}


