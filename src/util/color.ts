import color from 'color'
import seedrandom from 'seedrandom'

const goldenRatio = 0.618033988749895;

export default function (seed: string, saturation?: number, value?: number) {
  const myrng = seedrandom(seed);
  const r = myrng.quick()

  const hue = (r + goldenRatio) % 1;

  if (typeof saturation !== "number")
    saturation = 0.5;

  if (typeof value !== "number")
    value = 0.95;

  return color({
    h: hue * 360,
    s: saturation * 100,
    v: value * 100
  });
};