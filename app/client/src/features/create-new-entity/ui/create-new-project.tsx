import { FormEvent, useState } from 'react'

import { useForm } from 'effector-forms'

import * as Dialog from '@radix-ui/react-dialog'

import styles from './create-new-project.module.css'

import createImg from '../assets/create.svg'
import crossImg from '../assets/cross.svg'

import { $createNewProjectForm, $isModalOpened, modalToggled } from '../model'
import { useUnit } from 'effector-react'



export const CreateNewProject = () => {
    const isModalOpened = useUnit($isModalOpened)

    const toggleModal = useUnit(modalToggled)

    const { fields, submit } = useForm($createNewProjectForm)

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        submit()
    }

    return (
        <Dialog.Root open={isModalOpened} onOpenChange={toggleModal}>
            <Dialog.Trigger className={styles.triggerButton}>
                <span className={styles.triggerText}>New project</span>
                <img src={createImg} alt="Create new project" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay}/> 
                <Dialog.Content className={styles.content}>
                    <div className={styles.header}>
                        <Dialog.Title className={styles.title}>
                            Create new project
                        </Dialog.Title>
                        
                        <Dialog.Close className={styles.close}>
                            <img src={crossImg} alt="Close modal" />
                        </Dialog.Close>
                    </div>

                    <form className={styles.form} onSubmit={submitHandler}>
                        <input 
                            className={styles.input} 
                            type="text" 
                            placeholder="Name"

                            value={fields.name.value}
                            onChange={(e) => fields.name.onChange(e.target.value)}
                        />
                        <textarea 
                            className={styles.textarea}
                            placeholder="Description"

                            value={fields.description.value}
                            onChange={(e) => fields.description.onChange(e.target.value)}
                        />
                        
                        <button type="submit" className={styles.submitButton}>Create</button>
                    </form>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}