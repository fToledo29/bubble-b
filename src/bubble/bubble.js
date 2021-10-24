import React, { useEffect, useState } from 'react';

const Bubble = ({ configuration, delayedTime, random }) => {

        const [delayed, setDelayed] = useState(true);

        const { animationClass,
                index,
                height,
                width,
                top,
                left,
                cssAnimation,
                alternate } = configuration;

	const animationDirection = alternate === 1 ? 'alternate-reverse' : 'alternate';

	const WebkitAnimationDirection = alternate === 1 ? 'alternate-reverse' : 'alternate';

        useEffect(() => {
                const timeout = setTimeout(() => setDelayed(false), delayedTime);
                return () => clearTimeout(timeout);
        }, [setDelayed, delayedTime]);

        return delayed ? null : <div
                className={`${animationClass} bubble`}
                key={index}
                style={
                        {
                                borderRadius: '50%',
                                backgroundColor: `#${random(100000, 999999)}`,
                                height: height,
                                width: width,
                                top: `${top}%`,
                                left: `${left}%`,
                                position: 'fixed',
                                opacity: 0.5,
				animationName: cssAnimation.animationName,
				animationDuration: cssAnimation.animationDuration,
				animationTimingFunction: cssAnimation.animationTimingFunction,
				animationDelay: cssAnimation.animationDelay,
				animationIterationCount: cssAnimation.animationIterationCount,
                                animationDirection: animationDirection,
                                WebkitAnimationDirection: WebkitAnimationDirection,
                        }} ></div>;
};

export default Bubble;