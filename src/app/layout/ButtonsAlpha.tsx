import React, { Fragment, useContext } from 'react'
import { Button, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../stores/rootStore';

export const ButtonsAlpha = () => {
    const rootStore = useContext(RootStoreContext);

    const {
        setCharacters,
    } = rootStore.kisekiStore

    return (
        <Segment>
            {
                "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
                    <Button id={letter} onClick={() => {
                        setCharacters(letter)
                    }}>{letter.toUpperCase()}</Button>
                ))
            }
        </Segment>
    )
}
