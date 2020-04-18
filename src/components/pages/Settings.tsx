import React, {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import './Settings.scss';
import {SettingsContext} from "../../contexts/SettingsProvider";

export default function Settings () {

    const authContext:{} = useContext(SettingsContext);

    const onCountdownChange = (event:any, value:any) => {
        // @ts-ignore
        authContext.setCountdown(value);
    }


    const onWordRangeChange = (event:any, value:any) => {
        // @ts-ignore
        authContext.setWordRange(value);
    }


    return (
        <div id="settings">
            <Card  variant="outlined">
                <CardHeader className="CardHeader" title={"Settings"}/>
                <CardContent>
                    <div className="setting">
                        <p>Words range</p>
                        <Slider
                            className="slider"
                            step={null}
                            defaultValue={0}
                            marks={[
                                {value: 0, label: 'all'},
                                {value: -5, label: 'last 5'},
                                {value: -10, label: 'last 10'},
                                {value: -25, label: 'last 25'}
                            ]}
                            min={-25}
                            max={0}
                            onChange={(event,value) => onWordRangeChange(event,value)}

                        />
                    </div>
                    <div className="setting">
                        <p>Countdown secondes</p>
                        <Slider
                            className="slider"
                            step={null}
                            defaultValue={5}
                            marks={[
                                {value: 3, label: '3s'},
                                {value: 5, label: '5s'},
                                {value: 10, label: '10s'},
                                {value: 20, label: '20s'}
                            ]}
                            min={3}
                            max={20}
                            onChange={(event,value) => onCountdownChange(event,value)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}