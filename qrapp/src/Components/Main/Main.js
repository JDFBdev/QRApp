import React, { useState, useEffect } from 'react';
import s from './Main.module.css';
import { QrReader } from 'react-qr-reader';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';
import Transition from '../Transition/Transition';

export default function Main(){
    const [data, setData] = useState('No result');
    const [ticket, setTicket] = useState({code: '', time: '', message: '', total: ''});
    const [ModalSuccess, openSuccess, closeSuccess] = useModal('root', { preventScroll: true, closeOnOverlayClick: false});
    const [ModalFake, openFake, closeFake] = useModal('root', { preventScroll: true, closeOnOverlayClick: false});
    const [ModalError, openError, closeError] = useModal('root', { preventScroll: true, closeOnOverlayClick: false});

    useEffect(()=>{

        if(data !== 'No result'){

            let today = new Date();
            let time = today.getHours()+':'+today.getMinutes();

            async function fetchData(){
                let promise = await axios.post('http://localhost:3001/validate',
                    {
                        code: data,
                        time 
                    }
                )
                let response = promise.data;
                if (response.success === 200){
                    setTicket(response);
                    openSuccess();
                }else if (response.success === 300){
                    setTicket(response);
                    openFake();
                }else if (response.success === 400){
                    setTicket(response);
                    openError();
                }
            }
            fetchData();
        }

    },[data, openSuccess, openError, openFake]);

    return(
        <div className={s.container}>
            <div className={s.header}>
                <h1 className={s.title1}>Ticket Express</h1>
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
                <p className={s.statsData}>{ticket.total}</p>
            </div>
            <ModalSuccess>
                <Transition>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle}>{ticket.message}</h1>
                        <p className={s.modalData}>Nº {ticket.code}</p>
                        <button className={s.modalBtn} onClick={()=>{closeSuccess(); setData('No result');}}>Ok!</button>
                    </div>
                </Transition>
            </ModalSuccess>
            <ModalFake>
                <Transition>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle}>{ticket.message}</h1>
                        <p className={s.modalData}>Nº {ticket.code}</p>
                        <p className={s.modalData}>Registered at {ticket.time}</p>
                        <button className={s.modalBtnErr} onClick={()=>{closeFake(); setData('No result');}}>Ok!</button>
                    </div>
                </Transition>
            </ModalFake>
            <ModalError>
                <Transition>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle}>{ticket.message}</h1>
                        <p className={s.modalData}>Ticket data is not<br/> an existing code:</p>
                        <p className={s.modalData}>{ticket.code}</p>
                        <button className={s.modalBtnErr} onClick={()=>{closeError(); setData('No result');}}>Ok!</button>
                    </div>
                </Transition>
            </ModalError>

        </div>
    )
}