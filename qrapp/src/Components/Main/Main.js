import React, { useState, useEffect } from 'react';
import s from './Main.module.css';
import { QrReader } from 'react-qr-reader';
import { useModal } from 'react-hooks-use-modal';

export default function Main(){
    const [data, setData] = useState('No result');
    const [ModalSuccess, openSuccess] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalFail, openFail] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});

    useEffect(()=>{
        let localstream;
        if (navigator.mediaDevices.getUserMedia !== null) {
            
            var options = { 
                video:true
            };  
            navigator.getUserMedia(options, function(stream) { 
                let vid = document.getElementById('vid');
                vid.srcObject = stream;
                localstream = stream;
                vid.play();
                console.log(stream,"streaming");
            }, function(e) { 
                console.log("background error : " + e.name);
            }); 
            }  
    },[])

    useEffect(()=>{
        if(data === 'Hola'){
            open();
        }
    },[data]);


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
                <h1>Juan fernandez validado correctamente</h1>
            </ModalSuccess>
        </div>
    )
}