import styles from './RecipeSummary.module.css'
import { RecipeType } from '../../store'
import getColor from '../../util/color'
import { createState } from 'solid-js';
import { Show } from 'solid-js/dom';
import Recipe from '../Recipe';

export default (props: { recipe: RecipeType }) => {
  const [state, setState] = createState({ opened: false })

  return (
    <div class={styles.recipe}>
      <div class={styles.summary} style={{ backgroundColor: getColor(props.recipe.title + props.recipe.author).hex() }}
        onClick={() => setState({ opened: !state.opened })}>
        {(props.recipe.title)} - {(props.recipe.author)}
      </div>
      <Show when={(state.opened)}>
        <div class={styles.fullRecipe}>
          <Recipe recipe={(props.recipe)} />
        </div>
      </Show>
    </div>
  )
}
