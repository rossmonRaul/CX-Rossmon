import React from 'react';
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
            <table id="example"
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