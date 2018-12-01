import React, { Component } from 'react';
import {
    Container,
    Row,
    Button
} from 'reactstrap';
import SearchableTable from "./SearchableTable";

export default class ReplenishmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Replenishment list",
            tableHeaders: [{ name: "Order ID" }, { name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tableData: [["A53", "A001", "Binder", "Corridor 1, Shelf 2, L","153"],
                ["A43", "A003", "Stapler", "Corridor 3, Shelf 2, L","50"],
                ["A26", "A004", "Calculator", "Corridor 2, Shelf 1, R", "13"]],
            options: {
                link: '/supplier-order-content',
                search:true,
                print:true
            }
        };
    }

    render() {
        return (<Container>
            <SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={this.state.tableData}></SearchableTable>
            <Row>
                <Button outline color='success' size='lg' className='float-right ml-auto'>Complete Replenishment</Button>
            </Row>
        </Container>)
    }
}