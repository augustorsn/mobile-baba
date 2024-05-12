import { colors } from "@/styles/colors";
import React from "react";
import { ReactNode } from "react";
import { TextInput, View, TextInputProps, TextProps } from "react-native";


function Input({ children }: { children: ReactNode }) {
    return (
        <View className="w-full h-14 flex-row items-center gap-3 p-3 border border-b-white border-t-0 border-l-0 border-r-0">
            {children}
        </View>
    )
}

function Field({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className="flex-1 text-white text-base font-regular"
            placeholderTextColor={colors.gray[200]}
            {...rest}
        />
    )

}

Input.Field = Field

export { Input }