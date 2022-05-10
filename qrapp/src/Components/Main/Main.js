import React, { useState, useEffect } from 'react';
import s from './Main.module.css';
import { QrReader } from 'react-qr-reader';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';
import Transition from '../Transition/Transition';

export default function Main(){
    const [data, setData] = useState('No result');
    const [ticket, setTicket] = useState({});
    const [ModalSuccess, openSuccess, closeSuccess] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalFake, openFake, closeFake] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalError, openError, closeError] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    useEffect(()=>{

        if(data !== 'No result'){
            async function fetchData(){
                let promise = await axios.post('http://localhost:3001/test',
                    {
                        n: data
                    }
                )
                let response = promise.data;
                if (response.succes){
                    openSuccess();
                }else{
                    openError();
                }
            }
            fetchData();
        }

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
            </div>
            <ModalSuccess>
                <Transition>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle}>Ticket successfully registered</h1>
                        <p className={s.modalData}>Nº 345829</p>
                        <button className={s.modalBtn} onClick={()=>{closeSuccess(); setData('No result');}}>Ok!</button>
                    </div>
                </Transition>
            </ModalSuccess>
            <ModalFake>
                <Transition>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle}>Ticket has already been registered</h1>
                        <p className={s.modalData}>Nº 345829</p>
                        <p className={s.modalData}>Registered at 23:19</p>
                        <button className={s.modalBtnErr} onClick={()=>{closeFake(); setData('No result');}}>Ok!</button>
                    </div>
                </Transition>
            </ModalFake>
            <ModalError>
                <Transition>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle}>Ticket does not exist</h1>
                        <p className={s.modalData}>Ticket data is not<br/> an existing code:</p>
                        <p className={s.modalData}>{data}</p>
                        <button className={s.modalBtnErr} onClick={()=>{closeError(); setData('No result');}}>Ok!</button>
                    </div>
                </Transition>
            </ModalError>

        </div>
    )
}