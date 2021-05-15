import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import agent from './../api/agent';
import { Characters, Relation } from './../models/Kiseki'

export default class KisekiStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    @observable characters: Characters[] = []
    @observable selectedCharacter: Characters | null = null;
    @observable mermaidHTML: any = null;
    @observable currentCharacterRelation: Relation[] | null = null;

    @action setCurrectCharacterRelation = async (charactername: string) => {
        try {
            const c = await agent.kisekiReq.getCharacterRelations(charactername?.split(' ').join('_'));
            runInAction(() => {
                console.log(c);
                this.currentCharacterRelation = c;
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
            })
        }
    }

    @action setCharacters = async (startingLetter: string) => {

        try {
            const c = await agent.kisekiReq.getAllCharacters(startingLetter);
            runInAction(() => {
                this.characters = c;
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
            })
        }
    }

    @action setSelectedCharacter = (char: Characters) => {
        this.selectedCharacter = char;
        console.log(this.selectedCharacter.name)
    }

    @action setMermaidHTML = (m: HTMLElement) => {
        runInAction(() => {
            this.mermaidHTML = m;
        })
    }

}