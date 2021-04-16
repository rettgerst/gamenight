import styles from './VoteCard.module.scss';
import Image from 'next/image';

export default function VoteCard({
	title,
	image,
	gameName
}: {
	title: string;
	image: string;
	gameName: string;
}) {
	return (
		<div className={styles.VoteCard}>
			<span className={styles.Title}>{title}</span>
			<Image
				className={styles.Image}
				layout="fill"
				objectFit="cover"
				src={image}
			/>
			<span className={styles.GameName}>{gameName}</span>
		</div>
	);
}
