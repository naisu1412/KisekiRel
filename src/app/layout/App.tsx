import { Divider, Grid, Segment } from 'semantic-ui-react';
import CharacterNavigator from './CharacterNavigator';
import RelationDiagram from './RelationDiagram';

function App() {

  return (
    <Segment className="App">
      <Grid columns={2} relaxed='very'>
        <Grid.Column>
          <RelationDiagram />
        </Grid.Column>
        <Grid.Column>
          <CharacterNavigator />
        </Grid.Column>
      </Grid>

      <Divider vertical />
    </Segment>
  );
}

export default App;
