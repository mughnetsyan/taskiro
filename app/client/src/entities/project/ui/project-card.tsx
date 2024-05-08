import styles from './project-card.module.css'


interface Props {
    name: string,
    description: string
}


export const ProjectCard = ({name, description}: Props) => {
    return (
        <div className={styles.card}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.description}>{description}</p>
        </div>
    )
}