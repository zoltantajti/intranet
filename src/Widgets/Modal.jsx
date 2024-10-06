import React from 'react';
import {default as BSModal} from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const Modal = ({show, title, text, variant, buttons, closeButton = false}) => {
    return (
        <>
            <BSModal show={show} {...(closeButton ? { closeButton: true } : {})}>
                <BSModal.Header className={`${variant} ${variant === 'bg-danger' ? 'text-white' : ''}`}>
                    <BSModal.Title className={`${variant === 'bg-danger' ? 'text-white' : ''}`}>{title}</BSModal.Title>
                </BSModal.Header>
                <BSModal.Body>
                    <div dangerouslySetInnerHTML={{ __html: text}} />
                </BSModal.Body>
                <BSModal.Footer>
                    <ButtonGroup aria-label="Modal button group">
                        {buttons?.map((btn, index) => {
                            return (
                            <Button key={`modal_btn_${index}`} variant={btn.variant} onClick={btn.clickHandler}>
                                {btn.text}
                            </Button>
                            )
                        })}
                    </ButtonGroup>
                </BSModal.Footer>                
            </BSModal>
        </>
    );
};
export default Modal;