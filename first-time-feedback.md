# Feedback from my first Solid project

## Env Setup
* Took me a while to figure out how to setup a TS environment. Maybe where the `create solid app` is mentions `create solid app-ts` should also be mentioned

* If I put things in `src/elements/` things just stop working.
  * Oh, it is something magical happening where it expects things in src/elements
  * Yeah, I have to customElement. I guess src/elements expects items to be webcomponents. Could there be more documentation instead of failing with component-register error?

## Usage

* Debugging weird signals is tricky. I'm getting this issue where I see a wrong number for just a frame. Probably due to a wrong initial value somewhere.
    * Yep, that was it. Not too bad. Easy enough to breakpoint debug in the console.

* Hmm got a runaway clock error. Not sure how to debug.

* Preferred way to style things?
  * Answered: Same as create-react-app:
    * https://facebook.github.io/create-react-app/docs/adding-a-stylesheet
    * https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet



## Things I wished I had:

* I would love a storybook version of Solid
    * It's very common for me (and a lot of folks I know) to make their UI components in storybook before building it together in their app
