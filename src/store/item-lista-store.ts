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
    dataTemp: ItemListStore[]
    teamOne: ItemListStore[]
    teamTwo: ItemListStore[]
    teamThree: ItemListStore[]
    teamFour: ItemListStore[]
    save: (data: ItemListStore) => void
    remove: (id: any) => void;
    update: (data: ItemListStore) => void
    removeAll: () => void
    getItemCount: () => number
    resetAllTeams: () => void
    addGenericList: (data: ItemListStore, nameList: string) => void
}



export const useItemListStore = create(
    persist<StateProps>(
        (set, get) => ({
            data: [],
            dataTemp: [],
            teamOne: [],
            teamTwo: [],
            teamThree: [],
            teamFour: [],
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
                        item.id.trim() === data.id.trim()
                            ? ({ ...item, nome: item.nome } as ItemListStore)
                            : item
                    ),
                }));
            },
            getItemCount: () => get().data.length,

            resetAllTeams: () => {
                set({
                    dataTemp: [],
                    teamOne: [],
                    teamTwo: [],
                    teamThree: [],
                    teamFour: [],
                });
            },

            addGenericList: (data, nameList) => {
                if (nameList === 'teamOne') {
                    set((state) => ({
                        teamOne: [...state.teamOne, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                    }));
                } else if (nameList === 'teamTwo') {
                    set((state) => ({
                        teamTwo: [...state.teamTwo, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                    }));
                } else if (nameList === 'teamThree') {
                    set((state) => ({
                        teamThree: [...state.teamThree, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                    }));
                } else if (nameList === 'teamFour') {
                    set((state) => ({
                        teamFour: [...state.teamFour, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                    }));
                } else if (nameList === 'data') {
                    set((state) => ({
                        data: [...state.data, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                    }));
                } else if (nameList === 'dataTemp') {
                    set((state) => ({
                        dataTemp: [...state.dataTemp, { id: uuid.v4(), nome: data.nome } as ItemListStore],
                    }));
                }
            },



        }), {
        name: "mobile:itemListt",
        storage: createJSONStorage(() => AsyncStorage)
    }))