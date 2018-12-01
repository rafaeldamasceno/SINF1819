import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';
import SearchableTable from "./SearchableTable";

export default class SupplierOrderContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: { ID: 67326, arrivalDate: "12/01/2019", supplier: "Papalaco & Papeis", total:"782€"},
            title: "Items in order",
            tableHeaders: [{ name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tableData: [["A001", "Binder", "Corridor 1, Shelf 2, L", "153"],
                ["A002", "Crayons", "Corridor 3, Shelf 1, L", "50"],
                ["A004", "Calculator", "Corridor 2, Shelf 2, R", "13"]],
            options:{
                link:false,
                search: true
            }
        };
    }

    render() {
        return (
        <Container>
            <Row>
                <Col>
                    <h1>Supplier order info</h1>
                </Col>
                <Col xs='1' className='ml-auto mr-2'>
                    <Button><i class="fas fa-print"></i> Print</Button>
                </Col>
            </Row>
            <div class='order-info'>
                <p>
                    <span class='font-weight-bold mr-1'>
                        ID:
                    </span>
                    {this.state.orderInfo.ID}
                </p>
                <p>
                    <span class='font-weight-bold mr-1'>
                        Arrival:
                    </span>
                    {this.state.orderInfo.arrivalDate}
                </p>
                <p>
                    <span class='font-weight-bold mr-1'>
                        Supplier:
                    </span>
                    {this.state.orderInfo.supplier}
                </p>
                <p>
                    <span class='font-weight-bold mr-1'>
                        Total:
                    </span>
                    {this.state.orderInfo.total}
                </p>
            </div>
            <SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={this.state.tableData}></SearchableTable>
        </Container>)
    }
}