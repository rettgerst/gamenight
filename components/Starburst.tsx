import { HTMLProps } from 'react';
import styles from './Starburst.module.scss';

export default function Starburst({
	className,
	children,
	...props
}: HTMLProps<HTMLDivElement>) {
	return (
		<div {...props} className={`${styles.starburst} ${className}`}>
			{children}
		</div>
	);
}
