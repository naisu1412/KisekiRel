import mermaid from 'mermaid';
import React, { useContext } from 'react'
import { Button, List } from 'semantic-ui-react'
import { Characters } from '../models/Kiseki'
import { RootStoreContext } from '../stores/rootStore';
import cheerio from 'cheerio';
import { observer } from 'mobx-react-lite';
import convertToMermaidCode from '../utils/convertToMermaidCodeGraph';
import agent from '../api/agent';

interface IProps {
    character: Characters
}

const CharacterPill: React.FC<IProps> = ({ character }) => {
    const rootStore = useContext(RootStoreContext);

    const {
        setSelectedCharacter,
        setMermaidHTML,
        setCurrectCharacterRelation,
        selectedCharacter
    } = rootStore.kisekiStore

    return (
        <List.Item>
            <List.Content floated='right'>
                <Button onClick={async () => {
                    await setSelectedCharacter(character);
                    await setCurrectCharacterRelation(character.name);

                    function mermaidApiRenderCallback(graph: any) {
                        setMermaidHTML(graph);
                    }

                    const c = await agent.kisekiReq.getCharacterRelations(character?.name.split(' ').join('_'));        //should not be here, should be in rootStore

                    var graphDefinition = await convertToMermaidCode(character, c);

                    mermaid.render("mermaid", graphDefinition, mermaidApiRenderCallback);
                }}>Add</Button>
            </List.Content>
            <List.Content>{character.name}</List.Content>
        </List.Item>
    )


}

export default observer(CharacterPill);

