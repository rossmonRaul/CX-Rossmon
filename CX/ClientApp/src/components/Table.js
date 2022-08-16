import React from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

export const Table = ({ tableHeading, body }) => {

    //const body = () => {
    //    return tableData.map((item, index) => {
    //        return <tr key={index}>
    //            <td> {item.categoria}</td>
    //            <td> {item.rango}</td>
    //            <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
    //                {item.estado === true ? "Activo" : "Inactivo"}</td>
    //            <td style={{ display: "flex", padding: "0.5vw" }}>

    //                <Button color="primary" onClick={() => onclickactualizar(item.idCategoria)} style={{ marginRight: "1vw" }}>Editar
    //                </Button>

    //                <Button color={item.estado === true ? "danger" : "success"} onClick={() => onclickinactivar(item.idCategoria)}> {item.estado === true ? "Inactivar" : "Activar"}
    //                </Button>
    //            </td>

    //        </tr>
    //    })
    //}

    return (
        <>
            <table id="tblCategorias"
                class="display" >
                <thead >
                    <tr >
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