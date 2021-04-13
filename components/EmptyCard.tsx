import { ReactNode } from 'react';
import styles from './EmptyCard.module.scss';

export default function EmptyCard({ content }: { content: ReactNode }) {
	return (
		<div className={styles.EmptyCard}>
			<p className={styles.Content}>{content}</p>
		</div>
	);
}
