import { useEffect, useRef, useState } from "react";

export const useInterval = (callback, delay) => {
	const savedCallback = useRef();
	const [intervalId, setIntervalId] = useState();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			setIntervalId(id);
			return () => clearInterval(id);
		}
	}, [delay]);

	return intervalId;
};
