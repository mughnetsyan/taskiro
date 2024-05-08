import { ReactNode } from 'react'
import { cx } from 'class-variance-authority'

import { Sidebar } from 'widgets/sidebar'

import { Loader } from './loader'

import styles from './base-layout.module.css'



interface Props {
    title: string,
    className?: string,
    children?: ReactNode,
}


export const BaseLayout = ({title, className, children}: Props) => {
    return (    
        <>
            <Loader timeout={400} />
            
            <div className={styles.layout}>
                <Sidebar/>
                <div className={styles.container}>
                    <h1 className={styles.title}>{title}</h1>
                    
                    <div className={cx(styles.content, className)}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}