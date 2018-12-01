import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
} from 'reactstrap';

import SearchableTable from "./SearchableTable";

export default class Warehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableInStock: {
                title:"Items in stock",
                tableHeaders:[{ name: "Code" }, { name: "Name" }, { name: "Location" }, { name: "Quantity" }],
                tableData: [["A003", "Pencil", "Corridor 2, Shelf 1, L", "67"],
                    ["A004", "Calculator", "Corridor 2, Shelf 1, R", "13"],
                    ["A006", "Stapler", "Corridor 3, Shelf 2, L", "53"]]},
            tableOutOfStock: {
                title: "Out of stock items",
                tableHeaders: [{ name: "Code" }, { name: "Name" }, { name: "Location" }],
                tableData: [["A007", "Pen", "Corridor 5, Shelf 1, R"],
                    ["A008", "Notebook", "Corridor 1, Shelf 1, L"]]
            },
            options:{
                link:false,
                search:false 
            }
        };
    }
    render() {
        return <Container>
            <Row>
              <Col xs="0" className="ml-auto">
                <Input type="text" placeholder="Search all products" />
              </Col>
            </Row>
            <SearchableTable options={this.state.options} title={this.state.tableInStock.title} headers={this.state.tableInStock.tableHeaders} data={this.state.tableInStock.tableData} />
            <SearchableTable options={this.state.options} title={this.state.tableOutOfStock.title} headers={this.state.tableOutOfStock.tableHeaders} data={this.state.tableOutOfStock.tableData} />
          </Container>;
    }
}