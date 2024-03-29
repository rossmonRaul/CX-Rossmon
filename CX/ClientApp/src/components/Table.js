﻿import React from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"



export const Table = ({ tableHeading, body }) => {

    return (
        <>
            <table id="tbl_table_mantenimiento"
                className="table" >
                <thead >
                    <tr style={{ backgroundColor: "#126677", color: "white",paddingRight:"30px" }}>
                        {
                            tableHeading.map(header => {
                                return <th>{header}</th>
                            })
                        }
                    </tr >
                </thead>
                <tbody >
                    {
                        body
                    }
                </tbody>
            </table >
        </>
    )
}

export const Table2 = ({ tableHeading, body }) => {

    return (
        <>
            <table id="tbl_table_mantenimiento2"
                className="table" >
                <thead >
                    <tr style={{ backgroundColor: "#126677", color: "white" }}>
                        {
                            tableHeading.map(header => {
                                return <th>{header}</th>
                            })
                        }
                    </tr >
                </thead>
                <tbody >
                    {
                        body
                    }
                </tbody>
            </table >
        </>
    )
}
export const Table3 = ({ tableHeading, body }) => {

    return (
        <>
            <table id="tbl_table_mantenimiento3"
                className="table" >
                <thead >
                    <tr style={{ backgroundColor: "#126677", color: "white" }}>
                        {
                            tableHeading.map(header => {
                                return <th>{header}</th>
                            })
                        }
                    </tr >
                </thead>
                <tbody >
                    {
                        body
                    }
                </tbody>
            </table >
        </>
    )
}

export const Table4 = ({ tableHeading, body }) => {

    return (
        <>
            <table id="tbl_table_mantenimiento4"
                className="table" >
                <thead >
                    <tr style={{ backgroundColor: "#126677", color: "white" }}>
                        {
                            tableHeading.map(header => {
                                return <th>{header}</th>
                            })
                        }
                    </tr >
                </thead>
                <tbody >
                    {
                        body
                    }
                </tbody>
            </table >
        </>
    )
}