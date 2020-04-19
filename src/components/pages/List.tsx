import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useAxios from "axios-hooks";
import './List.scss';
import {useAPI} from "../../utils/useAPI";

export default function List () {

    const [{ data: words },] = useAPI('GET','./api.php');

    if (!words) return null;

    return (
        <div id="list">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>FR</strong></TableCell>
                            <TableCell><strong>EN</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {words.map((row:any) => (
                            <TableRow key={row.name}>
                                <TableCell >{row.fr}</TableCell>
                                <TableCell>{row.en}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}