import { proxy } from "valtio";
import { Beverage } from "./types";

export interface TapStore {
    taps: Beverage[];
    filteredTaps: Beverage[];
    cart: Beverage[];
    searchText: string;
    alcoholLimit: number;
}

const store = proxy<TapStore>({
    taps: [],
    filteredTaps: [],
    cart: [],
    searchText: "",
    alcoholLimit: 0
});

const filter = () => {
    const searchRE = new RegExp(store.searchText, "i");
    return store.taps
        .filter(
            ({ beverageName, abv }) =>
                beverageName.match(searchRE) && abv <= store.alcoholLimit
        )
        .slice(0, 15);
};

export const load = (client: string): void => {
    fetch(`http://localhost:8080/${client}.json`)
        .then((resp) => resp.json())
        .then((taps: Beverage[]) => {
            console.log(taps);
            console.log(filter());

            store.taps = taps;
            store.filteredTaps = filter();
    });
};

export const setSearchText = (test: string) => {
    store.searchText = test;
    store.filteredTaps = filter();
};

export const setAlcoholLimit = (limit: number) => {
    store.alcoholLimit = limit;
    store.filteredTaps = filter();
};

export const addToCart = (beverage: Beverage) => {
    store.cart.push(beverage);
};

export default store;
