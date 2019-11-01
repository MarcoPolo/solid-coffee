type Grams = number;
type Celsius = number;
enum AeropressStyle {
  Normal,
  Inverted,
}
enum Filter {
  Paper,
  MetalMesh,
}

export enum StepKind {
  Timed,
  Instruct,
}
type Seconds = number

export type RecipeStep = {
  kind: StepKind.Timed
  time: Seconds,
  directions: string
} | {
  kind: StepKind.Instruct
  directions: string
}


export type RecipeType = {
  title: string,
  author: string,
  coffeeAmt: Grams,
  grind: number,
  waterAmt: Grams,
  waterTmp: Celsius,
  aeropressStyle: AeropressStyle,
  filter: Filter,
  steps: RecipeStep[]
}

const paulinaSteps: Array<RecipeStep> = [
  {
    kind: StepKind.Instruct,
    directions: "Put 35g of coffee into your AeroPress."
  },
  {
    kind: StepKind.Timed,
    time: 15,
    directions: "Add 150g of water"
  },
  {
    kind: StepKind.Timed,
    time: 20,
    directions: "Stir"
  },
  {
    kind: StepKind.Timed,
    time: 30,
    directions: "Put pre-wet filter cap"
  },
  {
    kind: StepKind.Timed,
    time: 30,
    directions: "Flip aeropress and press"
  },
  {
    kind: StepKind.Instruct,
    directions: "(optional) Add 160g - 200g of water"
  },
]

const paulina = {
  title: '2017 WAC',
  author: 'PAULINA MICZKA',
  coffeeAmt: 35,
  grind: 8,
  waterAmt: 370,
  waterTmp: 84,
  aeropressStyle: AeropressStyle.Inverted,
  filter: Filter.Paper,
  steps: paulinaSteps
}

const xiaoboSteps: Array<RecipeStep> = [
  {
    kind: StepKind.Instruct,
    directions: "Add 30g of coffee into chamber."
  },
  {
    kind: StepKind.Timed,
    directions: "Add 100g of water",
    time: 15
  },
  {
    kind: StepKind.Timed,
    directions: "Stir",
    time: 15
  },
  {
    kind: StepKind.Timed,
    directions: "Add 70g of water",
    time: 8
  },
  {
    kind: StepKind.Timed,
    directions: "Add 1g of very finely ground coffee",
    time: 3
  },
  {
    kind: StepKind.Timed,
    directions: "Attach Lid, Flip, and Press",
    time: 45
  },
  {
    kind: StepKind.Instruct,
    directions: "Top up brew with 50g of water"
  },
]

const xiaobo = {
  title: '2018 WAC, 2nd Place',
  author: 'XIAOBO ZHANG',
  coffeeAmt: 31,
  grind: 10,
  waterAmt: 220,
  waterTmp: 80,
  aeropressStyle: AeropressStyle.Inverted,
  filter: Filter.Paper,
  steps: xiaoboSteps
}

const Evgeni = {
  title: '2018 WAC, 3rd',
  author: 'Evgeni Pinchukov, Belarus',
  coffeeAmt: 15,
  grind: 8,
  waterAmt: 230,
  waterTmp: 80,
  aeropressStyle: AeropressStyle.Inverted,
  filter: Filter.Paper,
  steps: [
    {
      kind: StepKind.Instruct,
      directions: "Add 15g of coffee into chamber."
    },
    {
      kind: StepKind.Timed,
      directions: "Add 50g of water",
      time: 10
    },
    {
      kind: StepKind.Timed,
      directions: "Stir",
      time: 30
    },
    {
      kind: StepKind.Timed,
      directions: "Add 180g water & wait",
      time: 25
    },
    {
      kind: StepKind.Timed,
      directions: "Stir",
      time: 5
    },
    {
      kind: StepKind.Timed,
      directions: "Press until coffee grounds are just visible above water",
      time: 5
    },
  ]
}

export const recipes: Array<RecipeType> = [paulina, xiaobo, Evgeni]