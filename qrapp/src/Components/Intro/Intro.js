import React, { useState, useEffect } from "react";
import s from './Intro.module.css';
import logo from '../../img/logo.gif';
import { CSSTransition } from 'react-transition-group';

export default function Intro({loading, promise}){
    const [timer, setTimer] = useState(false);
    const [on, setOn] = useState(true);
  
    useEffect(() => {
      setTimeout(() => setTimer(true), 2700);
    }, []);

    useEffect(() => {
        if (timer && promise.success) setOn(false)
    }, [timer, promise]);

    return(
    <>
        {
        loading && 
        <div className={s.container} style={{display: loading ? "flex" : 'none'}}>
            <CSSTransition
            in={on}
            timeout={500}
            appear={true}
            unmountOnExit
            key={0}
            classNames={{ appear: s.MyClassEnterActive, enterDone: s.MyClassEnterDone, exit: s.exit , exitActive: s.done}}
            >
            <div>
                <img src={logo} alt='logo' className={s.logo}/>
                <h1 className={s.title} >Initializing...</h1>
            </div>
            </CSSTransition>
        </div>
        }
    </>

    )
}