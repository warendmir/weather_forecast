import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ForecastResponse } from "../types";

type State = ForecastResponse & { isGetFromDb?: boolean };

type Actions = {
    setData: (data: State) => void;
};

export type Store = State & Actions;

const state: State = {
    data: [],
    isGetFromDb: false,
};

export const useStore = create(
    immer<Store>((set) => ({
        ...state,
        setData: (data) =>
            set((state) => ({
                ...state,
                ...data,
            })),
    }))
);
