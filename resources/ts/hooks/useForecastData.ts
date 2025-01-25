import { useStore, Store } from "../store";
import { useShallow } from "zustand/shallow";

export default function useForecastData<T>(selector?: (state: Store) => T) {
    return useStore(useShallow(selector!));
}
