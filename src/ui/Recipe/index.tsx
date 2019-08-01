import styles from './style.module.css'
import { RecipeType, RecipeStep, StepKind } from '../../store'
import { For, Show, } from 'solid-js/dom'
import { createState, createMemo, sample } from 'solid-js';
import Button from '../Button'
import Countdown from '../Countdown';

export default (props: { recipe: RecipeType, onUpdatePercent: (percent: number) => void }) => {
  // @ts-ignore
  const totalTime = createMemo(() => props.recipe.steps.reduce((acc, item) => acc + (item.time || 0), 0))
  const [state, setState] = createState({ activeStep: -1, currentStepCountdown: 0, started: false, stepStartTs: Date.now(), finished: false, paused: false })

  const timeElapsedSoFar = createMemo<number>(() => {
    if (state.activeStep >= 0) {
      let elapsedTime = 0;
      for (let index = 0; index < state.activeStep; index++) {
        // @ts-ignore
        elapsedTime += props.recipe.steps[index].time || 0
      }
      return elapsedTime
    } else {
      return 0
    }
  }, 0)

  const time = createMemo(() => {
    const activeStep = props.recipe.steps[state.activeStep]
    const time = activeStep && activeStep.kind === StepKind.Timed ? activeStep.time * 1e3 : null
    return time
  })

  const onTick = (timeLeft: number) => {
    if (state.started && state.activeStep < props.recipe.steps.length - 1) {
      if (timeLeft <= 0) {
        setState({ activeStep: state.activeStep + 1, stepStartTs: Date.now() })
      } else {
        const timeSoFar = timeElapsedSoFar() + (((time() || 0) - timeLeft) / 1e3)
        const percentSoFar = timeSoFar / totalTime()
        props.onUpdatePercent(percentSoFar);
      }
    } else if (state.started) {
      setState({ finished: true })
      props.onUpdatePercent(1);
    }
  }

  return (
    <div className={styles.recipe}>
      <div className={styles.title}>
        <div><b>{(props.recipe.title)}</b></div>
        <div class={styles.by}><i>by</i></div>
        <div><b>{(props.recipe.author)}</b></div>
      </div>
      <div class={styles.steps}>
        <Show when={(state.started && time() !== null)}>
          <Countdown startTs={(state.stepStartTs)} countdownMs={(time() || 3e3)} paused={(state.paused)} onTick={(onTick)} />
        </Show>
        <Show when={(!state.started || time() === null)}>
          <Countdown startTs={(state.stepStartTs)} countdownMs={(0)} paused={true} />
        </Show>
        <For each={(props.recipe.steps)} fallback={(<p>No Steps in this recipe! :/</p>)}>
          {(step: RecipeStep, i) => (
            <p class={([styles.step, i === state.activeStep ? styles.stepActive : ''].join(' '))}
              onClick={() => {
                setState({ activeStep: i, stepStartTs: Date.now(), started: true })

              }}>
              {(step.directions)}
              <Show when={(step.kind === StepKind.Timed)}>
                <i> for </i> {(step.kind === StepKind.Timed && step.time)}s
              </Show>
            </p>
          )}
        </For>
      </div>
      <div class={styles.controls}>
        <Show when={(state.finished)}>
          <p>Enjoy your tasty coffee!</p>
          <Button onClick={() => setState({ paused: false, finished: false, started: true, activeStep: 0 })}>Restart</Button>
        </Show>
        <Show when={(!state.started)}>
          <Button onClick={() => setState({ activeStep: 0, started: true, stepStartTs: Date.now() })}>Start Recipe</Button>
        </Show>
        <Show when={(state.started && !state.finished)}>
          <Button onClick={() => onTick(0)}>Next Step</Button>
        </Show>
        <Show when={(time() !== null)}>
          <Button onClick={() => setState({ paused: !state.paused })}>{(state.paused ? "Resume" : "Pause")}</Button>
        </Show>
      </div>
    </div>
  )
}
