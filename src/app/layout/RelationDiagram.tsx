import React, { useContext } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import mermaid from 'mermaid'
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

const RelationDiagram = () => {
    const rootStore = useContext(RootStoreContext);

    const {
        selectedCharacter,
        mermaidHTML,
        currentCharacterRelation
    } = rootStore.kisekiStore

    mermaid.initialize({startOnLoad:false});
    return (
        <Segment>
            <h1>
                {`${currentCharacterRelation?.length} | None`}
            </h1>
            <div className="content" dangerouslySetInnerHTML={{__html: mermaidHTML}}></div>

        </Segment>
    )
}

export default observer(RelationDiagram);

