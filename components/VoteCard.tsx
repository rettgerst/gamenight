import styles from './VoteCard.module.scss';

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
			<img className={styles.Image} src={image} />
			<span className={styles.GameName}>{gameName}</span>
		</div>
	);
}
