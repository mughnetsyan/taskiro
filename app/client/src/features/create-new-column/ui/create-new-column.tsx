import { useUnit } from 'effector-react'
import { useForm } from 'effector-forms'
import { FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { $createNewColumnForm, $isModalOpened, modalToggled } from '../model'

import styles from './create-new-column.module.css'

import crossImg from '../assets/cross.svg'
import createImg from '../assets/create.svg'
import { cx } from 'class-variance-authority'


interface Props {
    className?: string
}


export const CreateNewColumn = ({className}: Props) => {
    const isModalOpened = useUnit($isModalOpened)

    const toggleModal = useUnit(modalToggled)

    const { fields, submit } = useForm($createNewColumnForm)

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        submit()
    }

    return (
        <Dialog.Root open={isModalOpened} onOpenChange={toggleModal}>
            <Dialog.Trigger className={cx(styles.triggerButton, className)}>
                <img src={createImg} alt="Create new column" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay}/> 
                <Dialog.Content className={styles.content}>
                    <div className={styles.header}>
                        <Dialog.Title className={styles.title}>
                            Create new column
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
                        
                        <button type="submit" className={styles.submitButton}>Create</button>
                    </form>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}