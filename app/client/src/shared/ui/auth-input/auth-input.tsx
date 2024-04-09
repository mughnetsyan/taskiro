import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { cx } from 'class-variance-authority'

import styles from './auth-input.module.css'


interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

type Ref = HTMLInputElement


export const AuthInput = forwardRef<Ref, Props>(({className, ...props}, ref) => {
    return (
        <>
            <input ref={ref} className={cx(styles.input, className)} {...props}/>
        </>
    )
})