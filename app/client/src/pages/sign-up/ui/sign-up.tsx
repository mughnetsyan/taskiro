import { FormEvent } from 'react'
import { useForm } from 'effector-forms'
import { Link } from 'atomic-router-react'

import { routes } from 'shared/routing'
import { AuthForm, AuthInput, AuthButton } from 'shared/ui'

import { $signUpForm } from '../model'

import styles from './sign-up.module.css'


export const SignUp = () => {
    const { fields, submit } = useForm($signUpForm)

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        submit()
    }

    return (
        <div className={styles.page}>
            <AuthForm onSubmit={submitHandler}>
                <h1 className={styles.title}>Sign up</h1>
                <div className={styles.inputs}>
                    <AuthInput 
                        className={styles.input} 
                        placeholder='Login'
                        
                        value={fields.login.value}
                        onChange={(e) => fields.login.onChange(e.target.value)}
                    />
                    <AuthInput 
                        className={styles.input} 
                        placeholder='Name'
                        
                        value={fields.name.value}
                        onChange={(e) => fields.name.onChange(e.target.value)}
                    />
                    <AuthInput 
                        className={styles.input} 
                        placeholder='Bio'
                        
                        value={fields.bio.value}
                        onChange={(e) => fields.bio.onChange(e.target.value)}
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
                    <AuthButton type='submit'>Sign up</AuthButton>  
                    <p className={styles.link}>Already have an account? <Link to={routes.signInRoute}>Sign in</Link></p>
                </div>
            </AuthForm>
        </div>
    )
}