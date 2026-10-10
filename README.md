
<h1 align="center">Bubble-b</h1>

[![npm latest package](https://img.shields.io/npm/v/bubble-b/latest.svg)](https://www.npmjs.com/package/bubble-b)

Colorful bubbles that drift across the background of your web app. One component, no configuration required.

## Installation

```sh
npm install bubble-b
```

Requires React 16.8 or newer.

## Usage

```jsx
import BubbleB from 'bubble-b';

<BubbleB bubblesNum={30} />
```

Render it once, near the top of your component tree. The bubbles live in a fixed, full-viewport layer that never captures clicks or keyboard focus, so your page keeps working exactly as before.

## Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `bubblesNum` | number | `30` | How many bubbles to draw, from 0 to 200. Changing it redraws the bubbles. |
| `opacity` | number | `0.5` | How strong the bubbles look, from 0 (invisible) to 1. |
| `zIndex` | number | none | Stacking position of the bubble layer. Leave it out to draw the translucent bubbles over your content, or pass `-1` to draw them behind it. `-1` works when your background colour is on `html` or `body`; a wrapper element with its own opaque background would hide the bubbles. |

## What to expect

* The first five bubbles appear within a few seconds of mounting. The rest drift in over the next 25 seconds.
* Each bubble has a random colour, size and path. It fades in, bounces between the top and bottom of the viewport for a minute or three, and fades out before turning around.
* The layer is decorative: it is `aria-hidden` and lets every click through.
* With server-side rendering the server outputs an empty layer, and the bubbles are generated in the browser after mount, so there is no hydration mismatch.
* Every bubble carries the class `bubble-b__bubble` if you want to restyle it.

<img src="https://github.com/fToledo29/bubble-b/blob/main/example/bubblebExample2.gif">
