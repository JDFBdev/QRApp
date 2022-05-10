import React, { useState, useEffect } from 'react';
import s from './Main.module.css';
import { QrReader } from 'react-qr-reader';
import { useModal } from 'react-hooks-use-modal';

export default function Main(){
    const [data, setData] = useState('No result');
    const [ModalSuccess, openSuccess, closeSuccess] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalFake, openFake, closeFake] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalError, openError, closeError] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    useEffect(()=>{



    },[data]);

    return(
        <div className={s.container}>
            <div className={s.header}>
                <h1 className={s.title1}>LABA</h1>
                <h2 className={s.title2}>Graduation Party</h2>
            </div>
            <div className={s.videoContainer}>
                <QrReader className={s.video} videoId='vid' constraints={{ facingMode: 'environment' }}
                    onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
            </div>
            <div className={s.stats}>
                <h3 className={s.statsTitle}>Registered Tickets</h3>
                <p className={s.statsData}>75/650</p>
                <button onClick={openSuccess}>Success</button>
                <button onClick={openFake}>Fake</button>
                <button onClick={openError}>Error</button>
            </div>
            <ModalSuccess>
                <div className={s.modal}>
                    <h1 className={s.modalTitle}>Ticket successfully registered</h1>
                    <p className={s.modalData}>Nº 345829</p>
                    <button className={s.modalBtn} onClick={closeSuccess}>Ok!</button>
                </div>
            </ModalSuccess>
            <ModalFake>
                <div className={s.modal}>
                    <h1 className={s.modalTitle}>Ticket has already been registered</h1>
                    <p className={s.modalData}>Nº 345829</p>
                    <p className={s.modalData}>Registered at 23:19</p>
                    <button className={s.modalBtnErr} onClick={closeFake}>Ok!</button>
                </div>
            </ModalFake>
            <ModalError>
                <div className={s.modal}>
                    <h1 className={s.modalTitle}>Ticket does not exist</h1>
                    <p className={s.modalData}>Ticket data is not<br/> an existing code:</p>
                    <p className={s.modalData}>asdflieuadf</p>
                    <button className={s.modalBtnErr} onClick={closeError}>Ok!</button>
                </div>
            </ModalError>

        </div>
    )
}