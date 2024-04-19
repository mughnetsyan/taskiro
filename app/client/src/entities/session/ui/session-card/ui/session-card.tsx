import { useUnit } from 'effector-react'

import { $name, $bio } from 'entities/session/model'

import styles from './session-card.module.css'

import avatarImg from '../assets/avatar.png'

interface Props {


}

// needs refactor, increase size
export const SessionCard = ({}: Props) => {

    const name = useUnit($name)
    const bio = useUnit($bio)

    return (
        <div className={styles.card}>
            <header className={styles.header}>
                <img className={styles.header__img} src={avatarImg} alt="Avatar" />
            </header>
            <div className={styles.content}>
                <h1 className={styles.name}>{name}</h1>
                <h2 className={styles.bio}>{bio}</h2>

                <div className={styles.experience}>
                    <div className={styles.experience__level}>7</div>

                    <div className={styles.experience__progress}>
                        <p className={styles.experience__value}>856 / 1200 xp</p>
                        <progress value={856} max={1200}></progress>
                    </div>
                </div>
            </div>
        </div>
    )
}