import { onCleanup, createState, createEffect, createMemo } from "solid-js";
import styles, { countdownS } from './Countdown.module.css'

type Props = {
  startTs: number,
  countdownMs: number
  paused?: boolean,
  onTick?: (msLeft: number) => void,
}

const formatMsToS = (ms: number): string => Math.round(ms / 1000).toFixed(0)

const countdownInterval = 100

export default (props: Props) => {
  const [state, setState] = createState({ currentCountdown: props.countdownMs })

  // For resetting the countdown when the startTs changes
  createEffect((prevStartTs) => {
    if (prevStartTs !== props.startTs) {
      setState({ currentCountdown: props.countdownMs })
    }
    props.startTs
  }
  )

  let id: NodeJS.Timeout | null
  // Create a reference for the Wake Lock.
  let wakeLock: any | null = null;
  createEffect(() => {
    if (state.currentCountdown > 0 && !id) {
      id = setInterval(() => {
        if (!props.paused) {
          setState({ currentCountdown: state.currentCountdown - countdownInterval })
          props.onTick && props.onTick(state.currentCountdown)
        }
        if (state.currentCountdown <= 0) {
          id && clearInterval(id);
          id = null
        }
      }, countdownInterval)

      // create an async function to request a wake lock
      if ("wakeLock" in navigator) {
        // @ts-expect-error not typed
        navigator.wakeLock.request("screen").then((wl) => {
          wakeLock = wl
          // console.log("Wake lock is active")
        }).catch((err: unknown) => {
          console.log(`wakelock err: ${err}`);
        });
      }
    }
  })

  onCleanup(() => {
    id && clearInterval(id)
    wakeLock && wakeLock.release().then(() => {
      // console.log("Wake lock is released")
      wakeLock = null;
    });
  })

  return <div class={styles.countdown}><b class={styles.countdownNumber}>{(formatMsToS(state.currentCountdown))}</b><b class={countdownS}><i>s</i></b></div>
}
