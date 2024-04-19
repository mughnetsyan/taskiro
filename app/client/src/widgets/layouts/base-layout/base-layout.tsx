import { ReactNode, useEffect, useState } from 'react'

import { Sidebar } from 'widgets/sidebar'

import { Loader } from './loader'

import styles from './base-layout.module.css'


interface Props {
    children?: ReactNode,
}


export const BaseLayout = ({children}: Props) => {
    return (    
        <>
            <Loader timeout={400} />
            
            <div className={styles.layout}>
                <Sidebar/>
                {children}
            </div>
        </>
    )
}