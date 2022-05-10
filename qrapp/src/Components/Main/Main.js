import React, { useState, useEffect } from 'react';
import s from './Main.module.css';
import { QrReader } from 'react-qr-reader';
import { useModal } from 'react-hooks-use-modal';

export default function Main(){
    const [data, setData] = useState('No result');
    const [ModalSuccess, openSuccess] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    useEffect(()=>{
        if(data === 'Hola'){
            openSuccess();
        }
    },[data, openSuccess]);

    return(
        <div className={s.container}>
            <div className={s.reader}>
                <QrReader videoId='vid' constraints={{ facingMode: 'environment' }}
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
            <ModalSuccess>
                <h1 style={{color: 'yellow'}} >hola eipril gracias</h1>
            </ModalSuccess>

                
        </div>
    )
}