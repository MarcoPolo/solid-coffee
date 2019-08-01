import logo from "./mug.svg"
import { createState } from "solid-js";
import "./App.css";
import Button from "./ui/Button"
import Recipe from './ui/Recipe'
import Countdown from './ui/Countdown'
import RecipeSummary from './ui/RecipeSummary'
import { recipes } from './store'
import { For } from 'solid-js/dom'

function App() {
  const [state, setState] = createState({ count: 0 });
  return (
    <div class="App">
      <header class="App-header">
        <img src={logo} alt={"logo"} class={"appLogo"} />
      </header>
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div class="Recipes">
          <div class="Recipe-header">Recipes</div>
          <For each={(recipes)}>
            {recipe => (
              <>
                <RecipeSummary recipe={recipe} />
              </>
            )}
          </For>
        </div>
        <div style={{ flex: '2' }}></div>
      </div>
    </div>
  );
}

export default App;
