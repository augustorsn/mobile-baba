import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { colors } from "@/styles/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Redirect, router } from "expo-router"
import React from "react"
import { View, Text, ImageBackground, Image, StatusBar, StyleSheet } from "react-native"

export default function Home() {
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

    function registerUser(){
        router.push("/register")
    }

    function goToList(){
        router.push("/listHome")
    }
    return (
        <View className="flex-1 flex-col">


            <ImageBackground className="flex-1 flex-col p-8" source={require("@/assets/img/fundo.jpg")}>
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

                    <Button title="Login" onPress={registerUser} ></Button>
                    <Button title="ir para listagem" onPress={goToList} ></Button>
                </View>

            </ImageBackground>
        </View>
    )
}

