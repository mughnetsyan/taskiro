import { FormEvent } from 'react'
import { Link } from 'atomic-router-react'
import { useForm } from 'effector-forms'

import { AuthForm, AuthInput, AuthButton } from 'shared/ui'

import { $signInForm } from '../model'

import styles from './sign-in.module.css'

import { baseRoutes } from 'shared/routing'


export const SignIn = () => {
    const { fields, submit } = useForm($signInForm)

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        submit()
    }

    return (
        <div className={styles.page}>
            <AuthForm onSubmit={submitHandler}>
                <h1 className={styles.title}>Sign in</h1>
                    <div className={styles.inputs}>
                        <AuthInput 
                            className={styles.input} 
                            placeholder='Login'
                            
                            value={fields.login.value}
                            onChange={(e) => fields.login.onChange(e.target.value)}
                        />
                        <AuthInput 
                            className={styles.input} 
                            placeholder='Password'
                            type='password'

                            value={fields.password.value}
                            onChange={(e) => fields.password.onChange(e.target.value)}
                        />
                    </div>
                    <div className={styles.actions}>
                        <AuthButton type='submit'>Sign in</AuthButton>
                        <p className={styles.link}>Don't have an account? <Link to={baseRoutes.signUp}>Sign up</Link></p>
                </div>
            </AuthForm>  
        </div>
    )
}