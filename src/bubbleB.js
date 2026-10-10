import React, { Component } from 'react';
import Bubble from './bubble/bubble';

const DEFAULT_BUBBLES = 30;
const MAX_BUBBLES = 200;
const DEFAULT_OPACITY = 0.5;
// Bubbles in the first wave mount at once, so the effect is visible right after
// render; the rest trickle in over the next 25 seconds.
const FIRST_WAVE = 5;

function warn(message) {
	if (typeof console !== 'undefined' && console.warn) {
		console.warn(`BubbleB: ${message}`);
	}
}

// Accepts whatever the host passed as bubblesNum and returns a safe integer count.
// Array(x) throws on a negative or fractional length and silently makes a
// one-element array for a string, so this is the only place the prop is read.
function toBubbleCount(value) {
	if (value === undefined || value === null) return DEFAULT_BUBBLES;
	const number = Number(value);
	if (!Number.isFinite(number) || number < 0) {
		warn(`bubblesNum must be a number from 0 to ${MAX_BUBBLES}, got ${String(value)}; using ${DEFAULT_BUBBLES}`);
		return DEFAULT_BUBBLES;
	}
	if (number > MAX_BUBBLES) {
		warn(`bubblesNum is capped at ${MAX_BUBBLES}, got ${number}`);
		return MAX_BUBBLES;
	}
	return Math.floor(number);
}

function toOpacity(value) {
	if (value === undefined || value === null) return DEFAULT_OPACITY;
	const number = Number(value);
	if (!Number.isFinite(number) || number < 0 || number > 1) {
		warn(`opacity must be a number from 0 to 1, got ${String(value)}; using ${DEFAULT_OPACITY}`);
		return DEFAULT_OPACITY;
	}
	return number;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function toKebab(property) {
	return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

// Builds one @keyframes rule from { '0%': { opacity: 0 }, '20%': { top: '0%' }, ... }.
function keyframesCSS(name, frames) {
	const steps = Object.keys(frames).map((step) => {
		const declarations = Object.keys(frames[step])
			.map((property) => `${toKebab(property)}:${frames[step][property]}`)
			.join(';');
		return `${step}{${declarations}}`;
	}).join('');
	return `@keyframes ${name}{${steps}}`;
}

// The bubble fades in over the first 5% of the cycle, bounces between the top
// and bottom edges, and fades out over the last 5%. Because the animation
// alternates direction, the same short ramps play at both ends of every pass.
function bubbleFrames(peakOpacity) {
	return {
		'0%': { opacity: 0 },
		'5%': { opacity: peakOpacity },
		'20%': { top: '0%', left: `${random(-5, 100)}%` },
		'40%': { top: '100%', left: `${random(-5, 100)}%` },
		'60%': { top: '0%', left: `${random(-5, 100)}%` },
		'80%': { top: '100%', left: `${random(-5, 100)}%` },
		'95%': { opacity: peakOpacity },
		'100%': { opacity: 0 },
	};
}

function buildBubbles(count, idPrefix, peakOpacity) {
	const bubbles = [];
	let css = '';
	for (let i = 0; i < count; i++) {
		const animationName = `${idPrefix}-${i}`;
		css += keyframesCSS(animationName, bubbleFrames(peakOpacity));
		bubbles.push({
			id: i,
			animationName,
			backgroundColor: `#${random(100000, 999999)}`,
			top: random(1, 100),
			left: random(1, 100),
			size: random(100, 1100) / 4,
			durationSeconds: random(90, 200),
			direction: random(1, 2) === 1 ? 'alternate-reverse' : 'alternate',
			mountDelayMs: i < FIRST_WAVE ? 0 : random(100, 25000),
		});
	}
	return { bubbles, css };
}

const layerStyle = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	overflow: 'hidden',
	// The layer is decorative: it must never swallow a click meant for the page.
	pointerEvents: 'none',
};

class BubbleB extends Component {

	constructor(props) {
		super(props);
		// Unique per instance, so two BubbleB components never redefine each other's @keyframes.
		this.idPrefix = `bubble-b-${Math.random().toString(36).slice(2, 8)}`;
		// Bubbles are generated on the client only (componentDidMount): the server
		// renders an empty layer, so SSR never touches the DOM and hydration matches.
		this.state = { bubbles: [], css: '' };
	}

	componentDidMount() {
		this.rebuild();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.bubblesNum !== this.props.bubblesNum || prevProps.opacity !== this.props.opacity) {
			this.rebuild();
		}
	}

	rebuild() {
		this.setState(buildBubbles(
			toBubbleCount(this.props.bubblesNum),
			this.idPrefix,
			toOpacity(this.props.opacity)
		));
	}

	render() {
		const { bubbles, css } = this.state;
		const style = this.props.zIndex === undefined ? layerStyle : { ...layerStyle, zIndex: this.props.zIndex };

		return (
			<div aria-hidden="true" style={style}>
				<style>{css}</style>
				{bubbles.map((bubble) => <Bubble key={bubble.id} {...bubble} />)}
			</div>
		);
	}
}

export default BubbleB;
