import { useEffect, useState } from 'react'

import logo from '../assets/logo.svg'

import styles from './loader.module.css'


interface Props {
    timeout: number
}


export const Loader = ({timeout}: Props) => {
    const [isLoading, setIsLoading] = useState(true)

    const timeOffset = 50


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, timeout - timeOffset)
    }, [])


    return (
        <>
            { isLoading && (    
                <div className={styles.loader} style={{
                    animationDuration: `${timeout}ms`
                }}>
                    <img src={logo} alt="Logo" />
                </div> 
            )}
        </>
    )
}