import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTable from './SearchableTable';

export default class SupplierOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Supplier Orders",
            tableHeaders:[{name:"Order ID"},{name:"Supplier"},{name:"Arrival Date"}],
            tableData: [["A27","Sociedade de fornecimento, Lda","21/02/2019"],
                ["A14","Papalaco & Papeis","12/03/2019"],
                ["A19","Recheio","30/01/2019"]],
            options:{
                link:true,
                search:true
            
            }
        };
    }


    render() {
        return (
        <Container>
            <SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={this.state.tableData}></SearchableTable>
            <Link to='/picking-list'><Button outline color='primary' size='lg' className='float-right'>Put items away</Button></Link>
        </Container>)
    }
}