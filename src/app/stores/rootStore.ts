import { configure } from "mobx";
import { createContext } from "react";
import KisekiStore from "./KisekiStore";


configure({ enforceActions: 'always' });

export class RootStore {
    kisekiStore: KisekiStore;
    constructor() {
        this.kisekiStore = new KisekiStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());