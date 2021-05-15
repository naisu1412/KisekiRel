import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react'
import { Container, Input, List, Segment } from 'semantic-ui-react'
import { RootStoreContext } from './../stores/rootStore'
import { ButtonsAlpha } from './ButtonsAlpha';
import CharacterPill from './CharacterPill';

const CharacterNavigator = () => {
    const rootStore = useContext(RootStoreContext);

    const {
        setCharacters,
        characters
    } = rootStore.kisekiStore

    useEffect(() => {
        setCharacters("A");
    }, [setCharacters])


    return (
        <Segment>
            <Container>
                <ButtonsAlpha />
                <List divided verticalAlign='middle'>
                    {
                        characters.map((character) => (
                            <CharacterPill
                                key={character.name}
                                character={character} />
                        ))
                    }
                </List>
            </Container>
        </Segment>
    )
}

export default observer(CharacterNavigator);
