import React, { Component } from 'react';
import {
    Container,
    Row,
    Button
} from 'reactstrap';
import SearchableTable from "./SearchableTable";

export default class PickingList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Picking list",
            tableHeaders: [{ name: "Order ID" }, { name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tableData: [[32372, "A001", "Binder", "Corridor 1, Shelf 2, L","153"],
                [31471, "A003", "Stapler", "Corridor 3, Shelf 2, L","50"],
                [12345, "A004", "Calculator", "Corridor 2, Shelf 1, R", "13"]],
            options: {
                link: true,
                search:true,
                print:true
            }
        };
    }

    render() {
        return (<Container>
            <SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={this.state.tableData}></SearchableTable>
            <Row>
                <Button outline color='success' size='lg' className='float-right ml-auto'>Complete picking</Button>
            </Row>
        </Container>)
    }
}