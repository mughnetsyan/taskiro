import { useEffect, useState } from 'react'

import styles from './current-date.module.css'


export const CurrentDate = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => clearInterval(interval)
    })

    // something weird
    const hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()

    const day = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: "long",
        day: 'numeric'
    })

    return (
        <div className={styles.date}>
            <p className={styles.time}>
                {`${hours}:${minutes}`}
            </p>
            <p className={styles.day}>
                {day}
            </p>
        </div>
    )
}