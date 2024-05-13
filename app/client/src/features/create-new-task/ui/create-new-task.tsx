import * as Dialog from '@radix-ui/react-dialog'

import { useUnit } from 'effector-react'
import { useForm } from 'effector-forms'
import { FormEvent } from 'react'

import styles from './create-new-task.module.css'

import createImg from '../assets/create.svg'
import closeImg from '../assets/cross.svg'


import { $createNewTaskForm, $isModalOpened, modalToggled } from '../model'

export const CreateNewTask = () => {
    const isModalOpened = useUnit($isModalOpened)

    const toggleModal = useUnit(modalToggled)

    const { fields, submit } = useForm($createNewTaskForm)

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        submit()
    }

    return (
        <Dialog.Root open={isModalOpened} onOpenChange={toggleModal}>
            <Dialog.Trigger className={styles.button}>
                <img src={createImg} alt="" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay}/> 
                <Dialog.Content className={styles.content}>
                    <div className={styles.header}>
                        <Dialog.Title className={styles.title}>
                            Create new task
                        </Dialog.Title>
                        
                        <Dialog.Close className={styles.close}>
                            <img src={closeImg} alt="Close modal" />
                        </Dialog.Close>
                    </div>

                    <form className={styles.form} onSubmit={submitHandler}>
                        <textarea 
                            className={styles.textarea}
                            placeholder="Text"

                            value={fields.text.value}
                            onChange={(e) => fields.text.onChange(e.target.value)}
                        />
                        
                        <button type="submit" className={styles.submitButton}>Create</button>
                    </form>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}