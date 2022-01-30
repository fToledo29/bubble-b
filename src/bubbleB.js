import React from 'react';
import Keyframes from '@keyframes/core';
import './bubbleB.css';
import { Component } from 'react';
import Bubble from './bubble/bubble';

class BubbleB extends Component {

	constructor(props) {
		super(props);

		this.isSupported = false;

		this.cssframeArr = [];

		this.stylesConfig = [];

		this.random = this.random.bind(this);

		this.setBubbleCSSFram = this.setBubbleCSSFram.bind(this);

		this.getCSSFrame = this.getCSSFrame.bind(this);

		this.setBubbleCSSFram();

	}

	random(max, min) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	setupStylesConfig(index) {
		const height = (this.random(100, 1100) / 4);
		const alternate = this.random(1, 2);
		const animation = this.getCSSFrame(alternate, index + 1);
		return {
			backgroundColor: `#${this.random(100000, 999999)}`,
			top: this.random(1, 100),
			left: this.random(1, 100),
			animationClass: 'bubble-' + this.random(1, 10),
			delay: index < 5 ? this.random(100, 1) : this.random(25000, 100),
			alternate: alternate,
			cssAnimation: animation,
			width: height,
			height,
			index
		};
	}
	
	setBubbleCSSFram() {

		this.stylesConfig = [];

		this.isSupported = Keyframes.isSupported();

		this.cssframeArr = Array(this.props.bubblesNum);

		if (this.isSupported) {

			let bubbleCSSFrame = '';

			for (let i = 0; i < this.cssframeArr.length; i++) {

				bubbleCSSFrame = (i % 2 === 0 ) ? Keyframes.defineCSS([{
					name: `move-bubble-${(i + 1)}`,
					'0%':   {
						opacity: 0,
					},
					'20%':  {
						opacity: 0.5,
						top: `0%`, 
						left: `${this.random(-5, 100)}%`,
					},
					'40%':  {
						top: `100%`, 
						left: `${this.random(-5, 100)}%`,
					},
					'60%':  {
						top: `0%`, 
						left: `${this.random(-5, 100)}%`,
					},
					'80%':  {
						top: `100%`,
						left: `${this.random(-5, 100)}%`,
					},
					'100%': {
						opacity: 0,
					}
				}]) :  Keyframes.defineCSS([{
					name: `move-bubble-${(i + 1)}`,
					'100%':   {
						opacity: 0,
					},
					'80%':  {
						opacity: 0.5,
						top: `0%`, 
						left: `${this.random(-5, 100)}%`,
					},
					'60%':  {
						top: `100%`, 
						left: `${this.random(-5, 100)}%`,
					},
					'40%':  {
						top: `0%`, 
						left: `${this.random(-5, 100)}%`,
					},
					'20%':  {
						top: `100%`,
						left: `${this.random(-5, 100)}%`,
					},
					'0%': {
						opacity: 0,
					}
				}]) ;
				
				this.cssframeArr[i] = bubbleCSSFrame;
				this.stylesConfig.push(this.setupStylesConfig(i));
			}

			return this.cssframeArr;

		}
	
	}

	getCSSFrame(alternate, animationNum) {

		return {
			animationName: `move-bubble-${animationNum}`,
			animationDuration: `${this.random(200, 90)}s`,
			animationTimingFunction: 'ease-out',
			animationDelay: `${this.random(0, 30)}s`,
			animationIterationCount: 'infinite',
			animationDirection: alternate === 1 ? 'alternate-reverse' : 'alternate',
		};
	}

	render() {
		
		return (
			<div>
				<style>
					{this.cssframeArr.map((x) => x)}
				</style>

				{this.isSupported ? this.stylesConfig.map((configuration, index) => {

					return  <Bubble
					key={index} 
					configuration={configuration} 
					delayedTime={configuration.delay}
					random={this.random} />;

				}) : null}
			</div>
		);
	}
}

export default BubbleB;
