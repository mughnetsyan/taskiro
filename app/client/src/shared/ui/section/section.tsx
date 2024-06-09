import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react'

import { cx } from 'class-variance-authority'

import styles from './section.module.css'


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    children?: React.ReactNode
}

type Ref = HTMLDivElement

export const Section = forwardRef<Ref, Props>(({title, children, className, ...props}, ref) => {
    return (
        <div className={cx(styles.section, className)} ref={ref} {...props}>
            {title && <h2 className={styles.title}>{title}</h2>}

            {children}
        </div>
    )
})