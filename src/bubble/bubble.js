import React, { useEffect, useState } from 'react';

const Bubble = ({ animationName, backgroundColor, top, left, size, durationSeconds, direction, mountDelayMs }) => {

	const [mounted, setMounted] = useState(mountDelayMs === 0);

	useEffect(() => {
		if (mountDelayMs === 0) return undefined;
		const timeout = setTimeout(() => setMounted(true), mountDelayMs);
		return () => clearTimeout(timeout);
	}, [mountDelayMs]);

	if (!mounted) return null;

	return <div
		className="bubble-b__bubble"
		style={{
			position: 'absolute',
			top: `${top}%`,
			left: `${left}%`,
			width: size,
			height: size,
			borderRadius: '50%',
			backgroundColor,
			// Hidden until the animation's first frame runs; the keyframes own opacity after that.
			opacity: 0,
			filter: 'brightness(300%)',
			animationName,
			animationDuration: `${durationSeconds}s`,
			animationTimingFunction: 'ease-out',
			animationIterationCount: 'infinite',
			animationDirection: direction,
		}} />;
};

export default Bubble;
