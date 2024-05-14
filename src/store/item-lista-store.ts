import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from 'react-native-uuid';

export type ItemListStore = {
    id: string,
    nome: string,
}

type StateProps = {
    data: ItemListStore[]
    save: (data: ItemListStore) => void
    remove: (id: any) => void;
    // remove: () => void
    update: (data: ItemListStore) => void
    removeAll: () => void
}


export const useItemListStore = create(
    persist<StateProps>(
        (set) => ({
            data: [],
            save: (data) => {
                set((state) => ({
                    data: [...state.data, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                }));
            },

            removeAll: () => {
                set({
                    data: [],

                });
            },
            remove: (id) => {
                set((state) => ({
                    data: state.data.filter((item) => item.id !== id),
                }));
            },
            update: (data) => {
                set((state) => ({
                    data: state.data.map((item) =>
                        item.id === data.id
                            ? ({ ...item, nome: item.nome } as ItemListStore)
                            : item
                    ),
                }));
            },

        }), {
        name: "mobile:itemList72",
        storage: createJSONStorage(() => AsyncStorage)
    }))