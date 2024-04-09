import { DetailedHTMLProps, FormHTMLAttributes } from 'react'

import styles from './auth-form.module.css'

import logo from './assets/logo.svg'


interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}


export const AuthForm = ({children, onSubmit}: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <img src={logo} alt='' />
            </div>
            <form className={styles.form} onSubmit={onSubmit}>
               {children}
            </form>
        </div>
    )
}