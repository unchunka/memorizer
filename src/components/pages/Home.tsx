import React, {useContext, useEffect, useRef, useState} from "react";
import './Home.scss';
import useAxios from 'axios-hooks'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {SettingsContext} from "../../contexts/SettingsProvider";

export default function Home () {

    // @ts-ignore
    const {wordRange:wordRangeFromContext, countdown:countdownFromContext} = useContext(SettingsContext);

    const [index, setIndex] = useState(0);

    const [hiddenEn, setHiddenEn] = useState(true);

    const [timerStarted, setTimerStarted] = useState(false);
    const timerStartedRef = useRef(timerStarted);
    timerStartedRef.current = timerStarted;

    const [countdownDefault,] = useState(countdownFromContext);

    const [countdownToDisplay, setCountdownToDisplay] = useState(5);

    const [wordRange,] = useState(wordRangeFromContext);

    let countdown = 5;

    var URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;

    const [{ data: words },] = useAxios(
        {
            url: URL,
            method: 'GET'
        }
    );

    const nextWord = () => {
        let newIndex = index;
        while(index === newIndex) {
            newIndex = words.length - 1 + Math.floor(Math.random() * wordRange);
        }
        setIndex(newIndex);
        setHiddenEn(true);
    }

    const revealEn = () => {
        setHiddenEn(false);
    }

    const doTimerLoop = () => {

        setCountdownToDisplay(countdown);

        setTimeout(() => {
            if (timerStartedRef.current) {
                countdown -= 1;
                if (countdown == 0) {
                    nextWord();
                    countdown = countdownDefault;
                    doTimerLoop();
                }
                else {
                    doTimerLoop();
                }
            }
        },1000);

    }

    const startTimer = () => {
        setTimerStarted(true);
    }

    useEffect(() => {
        if (timerStarted) {
            countdown = countdownDefault;
            doTimerLoop();
        }
    }, [timerStarted])

    const stopTimer = () => {
        setTimerStarted(false);
    }

    if (!words) return null;

    return (
        <div id="home">
            <div id="controls">
                <Button className="next" onClick={() => nextWord()}>suivant</Button>
                <Button className="solution" onClick={() => revealEn()}>solution</Button>
                {timerStarted ?
                    <Button className="timer" onClick={() => stopTimer()}>stop timer</Button>
                    :
                    <Button className="timer" onClick={() => startTimer()}>start timer</Button>
                }
                {timerStarted && <span id="countdown">{countdownToDisplay + "s"}</span>}
            </div>

            <div id="en">
                <Card>
                    <CardHeader className="CardHeader"/>
                    <CardContent>
                        <span>{ hiddenEn ? "?" : words[index].en}</span>
                    </CardContent>
                </Card>
            </div>
            <div id="fr">
                <Card>
                    <CardHeader className="CardHeader"/>
                    <CardContent>
                        <span>{words[index].fr}</span>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}