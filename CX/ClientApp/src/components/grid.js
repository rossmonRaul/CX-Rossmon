import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from "react-data-table-component"

export const Grid = ({gridHeading, gridData, selectableRows, pending, setFilaSeleccionada, idBuscar}) => {
    const [id, setId] = useState(-1);
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const onRowSelected = (row) => { 
        if(row.selectedCount == 1)       
            SeleccionarFila(row.selectedRows[0]);
        else
            DesSeleccionarFila(); 
    }

    const onRowClicked = (row) => {
        if(row[idBuscar] != id)
            SeleccionarFila(row);
        else
            DesSeleccionarFila();
    }

    const SeleccionarFila = (fila) => {
        const tempId = fila[idBuscar];
        if(id !== tempId){
            setId(tempId);
            setFilaSeleccionada(fila);
        }        
    }

    const DesSeleccionarFila = () => {
        if(id != -1 ){
            setId(-1);            
            setFilaSeleccionada({})
        }      
    }


    return(
        <>
            <DataTable className='table table-sm'
                columns={gridHeading}
                data={gridData}
                selectableRows={selectableRows}
                selectableRowsSingle
                pagination       
                paginationComponentOptions={paginationComponentOptions}         
                striped
                noHeader
                dense
                noDataComponent="No hay datos para mostrar"
                highlightOnHover
                onRowClicked={onRowClicked}
                onSelectedRowsChange={onRowSelected}
                pointerOnHover
                selectableRowsHighlight
                progressPending={pending}
                progressComponent={<><Spinner animation="border" variant="primary" />&nbsp;Cargando...</>}
                selectableRowSelected={(row) => row[idBuscar] == id}  
                allowRowEvents

            />
        </>
    )
}