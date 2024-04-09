import { forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

import { cx } from 'class-variance-authority'

import styles from './auth-button.module.css'


interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactNode
}

type Ref = HTMLButtonElement


export const AuthButton = forwardRef<Ref, Props>(({children, className, ...props}, ref) => {
    return (
        <button ref={ref} className={cx(styles.button, className)} {...props}>
            {children}
        </button>
    )
})