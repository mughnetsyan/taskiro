import { Link } from 'atomic-router-react'
import styles from './project-card.module.css'
import { baseRoutes } from 'shared/routing'


interface Props {
    id: number,
    name: string,
    description: string,
}


export const ProjectCard = ({name, description, id}: Props) => {

    return (
        <Link className={styles.card} to={baseRoutes.projects.project} params={{id}}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.description}>{description}</p>
        </Link>
    )
}