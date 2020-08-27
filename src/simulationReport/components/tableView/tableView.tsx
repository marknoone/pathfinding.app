import React, { useState, useMemo } from 'react';
import { SelectionInput } from '../../../app/components/selectionInput';
import { BaseStyle, HeaderBar, HeaderTitle } from './tableView.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      color: '#464646'
    },
    container: {
        maxHeight: 440,
    },
    headerCell: {
        fontSize: 14,
        fontWeight: 600,
        fontFamily:"'Montserrat', sans-serif",
    }
});

const HeaderTableRow = withStyles((theme) => ({
    head: {
        backgroundColor: '#fff',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)'
    },
    body: {
        fontSize: 14,
    },
}))(TableRow);

type TableProps = { 
    title: string, 
    tables: { 
        [id: number]: { 
            name: string, 
            rows: any[]
        }
    }
};

const TableView: React.FunctionComponent<TableProps> = ({ title, tables }) => {
    const classes = useStyles();
    const [selectedTable, setSelectedTable] = useState<number>(0);
    const options = useMemo( () => Object.keys(tables).map(k => ({
        s: tables[+k].name, value: +k 
    })), []);
    if(tables[selectedTable].rows.length <= 0) return <></>;

    const tableHeaders = Object.keys(tables[selectedTable].rows[0]).map((k:string) => k);
    return <div style={{width: '100%'}}>
        <div style={HeaderBar}>
            <p style={HeaderTitle}>{title}</p>
            {
                options.length <= 1? null:
                <div style={{position: 'absolute', right: '16px', top: '8px'}}>
                    <SelectionInput<number> value={selectedTable}  options={options}
                        onChange={(e: number) => setSelectedTable(e) }/>
                </div>
            }
        </div>
        <div style={{width: '100%'}}>
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} stickyHeader aria-label="simple table">
                    <TableHead>
                        <HeaderTableRow>
                            {
                                tableHeaders.map((k:string, i:number) => 
                                    i===0?
                                    <TableCell className={classes.headerCell}>{k}</TableCell>:
                                    <TableCell className={classes.headerCell} align="right">{k}</TableCell>
                                )
                            }
                        </HeaderTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tables[selectedTable].rows.map((row: any, i: number) => 
                            (
                                <TableRow key={i}>
                                {
                                    tableHeaders.map((k:string, i:number) => (
                                        i===0?
                                        <TableCell component="th" scope="row">{k}</TableCell>:
                                        <TableCell align="right">{row[k]}</TableCell>    
                                    ))
                                }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>;
}


export default TableView;