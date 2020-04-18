import React from "react";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import './Nav.scss'

export default function Nav () {

    return (
        <nav>
            <Button className="button" component={Link} to="/">play now</Button>
            <Button className="button" component={Link} to="/list">list</Button>
            <Button className="button" component={Link} to="/settings">settings</Button>
        </nav>
    );
}