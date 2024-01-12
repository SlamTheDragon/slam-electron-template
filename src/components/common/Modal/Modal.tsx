/**
 * This component requires Redux to work.
 * Here is the overview on how this component works:
 * 
 * ### UPON LOAD ###
 * - if (!props.isOpen) return null;
 * Modal wont be displayed unless isOpen turns to be true.
 * - function onInteract()...
 * Modal will finish loading its final state whenever the user starts interacting to it. 
 * This, to prevent locking all elements from being accessible. See modalSlice.ts
*/

import React from 'react';
import style from './modal.module.scss'
import Button, { BtnAccent } from '../Button/Button'

interface ModalProps {
    readonly modalTitle: string
    readonly isOpen: boolean
    readonly children?: React.ReactNode
    readonly selectInterface: number
    readonly selectAction?: number
    readonly onClose: () => void
}

/**
 * Reusable, Single-Plug Modal for React.
 * @param {modalTitle} props.modalTitle - string title
 * @param {isOpen} props.isOpen - boolean, state switcher whether to show the modal or not
 * @param {onClose} props.onClose - void function, requires a function to update `props.isOpen`
 * @param {selectInterface} props.selectInterface - number, select a component in the list by key
 * @param {selectAction} props.selectAction - WIP
 * 
 * @returns Modal, Actions
*/
export default function Modal(props: ModalProps) {
    if (!props.isOpen) return null;

    const childArray = React.Children.toArray(props.children);
    const selectedChild = childArray[props.selectInterface];   
    // console.log(Object.values(selectedChild)[2]);

    function onInteract() {
        document.body.classList.remove('disable-events');
    }

    return (
        <div className={style.modal} onMouseEnter={onInteract}>
            
            <div className={style.modalWrapper}>
                <div className={style.modalHeader}>
                    <h3>{props.modalTitle}</h3>
                    <Button onClick={props.onClose}>✖</Button>
                </div>
                <div className={style.modalContainer}>
                    {selectedChild}
                </div>
                <div className={style.modalAction}>
                    <Button appearance={BtnAccent.primary}>Hello World</Button>
                </div>
            </div>

            <div className={style.modalBackground} onClick={props.onClose} />
        </div>
    );
}