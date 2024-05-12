import "@/styles/global.css"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useFonts, Roboto_700Bold, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto"
import { Loading } from "@/components/loading"
import React from "react"

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
        Roboto_500Medium,
    });

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <Slot />

    )
}