import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTableCheckbox from "./SearchableTableCheckbox";

export default class SupplierOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Supplier Orders",
            headers:[{name:"Order ID"},{name:"Supplier"},{name:"Arrival Date"},{name: "Include"}],
            data: [["A27","Sociedade de fornecimento, Lda","21/02/2019"],
                ["A14","Papalaco & Papeis","12/03/2019"],
                ["A19","Recheio","30/01/2019"]],
            options:{
                link:'/supplier-order-content'
            }
        };
    }


    render() {
        return (
        <Container>
            <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} />
            <Link to='/replenishment-list'><Button outline color='primary' size='lg' className='float-right'>Put items away</Button></Link>
        </Container>)
    }
}