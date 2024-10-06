import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { default as BSToast } from 'react-bootstrap/Toast';
import { getElapsedTime } from '../utils/utils';

const Toast = forwardRef(({title,text,time,css,pos}, ref) => {
    const [show,setShow] = useState(false);
    useImperativeHandle(ref, () => ({
        openToast() { setShow(true); },
        closeToast() { setShow(false); }
    }));

    return (
        <ToastContainer className="p-3" position={pos} style={{position:"absolute",zIndex:1090}} >
            <BSToast show={show} onClose={() => setShow(false)} delay={3000} autohide className="d-inline-block m-1" bg={css}>
                <BSToast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small>{getElapsedTime(time)}</small>
                </BSToast.Header>
                <BSToast.Body className="text-white">{text}</BSToast.Body>
            </BSToast>
        </ToastContainer>
    );
});
export default Toast;