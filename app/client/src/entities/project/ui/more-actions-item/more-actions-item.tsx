import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

import { cx } from 'class-variance-authority'

import styles from './more-actions-item.module.css'



interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactNode
}

type Ref = HTMLButtonElement

export const MoreActionsItem = forwardRef<Ref, Props>(({children, className, ...props}, ref) => {
    return (
        <button ref={ref} className={cx(styles.moreActionsItem, className)} {...props}>
            {children}
        </button>
    )
})