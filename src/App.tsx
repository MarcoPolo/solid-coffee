import logo from "./mug.svg"
import logoFilled from "./mug_fill.svg"
import { createState, createMemo } from "solid-js";
import "./App.css";
import Button from "./ui/Button"
import Recipe from './ui/Recipe'
import Countdown from './ui/Countdown'
import RecipeSummary from './ui/RecipeSummary'
import { recipes } from './store'
import { For } from 'solid-js/dom'
import { stylesFromModule } from "@polymer/polymer/lib/utils/style-gather";

function App() {
  const [state, setState] = createState({ completePercent: 0 });
  const clipPath = createMemo(() => {
    return `inset(${(100 - (state.completePercent * 100))}% 0 0px 0px)`
  })
  return (
    <div class="app">
      <header class="appHeader">
        <div class={"logoWrapper"}>
          <img src={logo} alt={"logo"} class={"appLogo"} />
          <div>
            <img style={({ clipPath: clipPath() })} src={logoFilled} alt={"logo-filled"} class={"appLogoFilled appLogo"} />
          </div>
        </div>
      </header>
      <div>
        <div class="recipes">
          <div class="recipeHeader">Recipes</div>
          <For each={(recipes)}>
            {recipe => (
              <>
                <RecipeSummary onUpdatePercent={(completePercent) => {
                  setState({ completePercent })
                }
                } recipe={recipe} />
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
