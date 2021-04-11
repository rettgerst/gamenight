import { formatDistanceToNowStrict } from 'date-fns';
import { useEffect, useState } from 'react';

export default function RelativeTime({ time }: { time: number }) {
	const [str, setStr] = useState(formatDistanceToNowStrict(time));

	useEffect(() => {
		const interval = setInterval(
			() => setStr(formatDistanceToNowStrict(time)),
			1000
		);

		return () => clearInterval(interval);
	}, []);

	return <>{str}</>;
}
