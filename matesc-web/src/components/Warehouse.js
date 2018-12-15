import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
} from 'reactstrap';

import SearchableTable from "./SearchableTable";
import { itemsInStock, itemsOutOfStock, errorMessage } from '../utils';

export default class Warehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableInStock: {
                title: "Items in stock",
                tableHeaders: [{ name: "Code" }, { name: "Name" }, { name: "Location" }, { name: "Quantity" }],
                tableData: [["A003", "Pencil", "Corridor 2, Shelf 1, L", "67"],
                ["A004", "Calculator", "Corridor 2, Shelf 1, R", "13"],
                ["A006", "Stapler", "Corridor 3, Shelf 2, L", "53"]]
            },
            tableOutOfStock: {
                title: "Out of stock items",
                tableHeaders: [{ name: "Code" }, { name: "Name" }, { name: "Location" }],
                tableData: [["A007", "Pen", "Corridor 5, Shelf 1, R"],
                ["A008", "Notebook", "Corridor 1, Shelf 1, L"]]
            },
            options: {
                link: false,
                search: false,
                searchInput: "",
                loading: true
            },
            updated: false,
            error: false
        };
        this.searchInputUpdateHandle = this.searchInputUpdateHandle.bind(this);
    }
    async componentDidMount() {
        if (!this.state.updated) {
            if (this.props !== undefined) {
                if (this.props.authentication !== undefined) {
                    this.setState({
                        updated: true
                    })
                    let r = await itemsInStock(this.props.authentication);
                    r = await r.json();
                    this.setStateItemsInStock(r);

                    r = await itemsOutOfStock(this.props.authentication);
                    r = await r.json();
                    this.setStateItemsOutOfStock(r);
                    let copy = Object.assign({}, this.state.options);
                    copy.loading = false;
                    this.setState({options:copy})
                }
            }
        }


    }
    async componentDidUpdate() {
        //know if i already updated        
        if (!this.state.updated) {
            if (this.props !== undefined) {
                if (this.props.authentication !== undefined) {
                    this.setState({
                        updated: true
                    })
                    let r = await itemsInStock(this.props.authentication);
                    r = await r.json();
                    this.setStateItemsInStock(r);

                    r = await itemsOutOfStock(this.props.authentication);
                    r = await r.json();
                    this.setStateItemsOutOfStock(r);
                    let copy = Object.assign({}, this.state.options);
                    copy.loading = false;
                    this.setState({options:copy})
                }
            }
        }
    }

    setStateItemsInStock(response) {
        if (!response.DataSet) {
            this.setState({
                error: true
            });
            return;
        }
        let a = [];
        //building state with response
        for (let i = 0; i < response.DataSet.Table.length; i++) {
            let lineInfo = response.DataSet.Table[i];
            let code = lineInfo['Artigo'];
            let name = lineInfo['Nome'];
            let location = lineInfo['DescricaoLocalizacao'];
            let quantity = lineInfo['StkActual'];
            let line = [code, name, location, quantity];
            a.push(line);
        }
        let copy = Object.assign({}, this.state.tableInStock);
        copy.tableData = a;

        this.setState({
            tableInStock: copy
        })
    }

    setStateItemsOutOfStock(response) {
        if (!response.DataSet) {
            this.setState({
                error: true
            });
            return;
        }
        let a = [];
        //building state with response
        for (let i = 0; i < response.DataSet.Table.length; i++) {
            let lineInfo = response.DataSet.Table[i];
            let code = lineInfo['Artigo'];
            let name = lineInfo['Nome'];
            let location = lineInfo['DescricaoLocalizacao'];
            let line = [code, name, location];
            a.push(line);
        }
        let copy = Object.assign({}, this.state.tableOutOfStock);
        copy.tableData = a;

        this.setState({
            tableOutOfStock: copy
        })
    }

    searchInputUpdateHandle(event) {
        let copy = Object.assign({}, this.state.options);
        copy.searchInput = event.target.value.toLowerCase()
        this.setState({ options: copy });
    }

    render() {
        return <Container>
            {errorMessage(this.state.error)}
            <Row>
                <Col xs="0" className="ml-auto">
                    <Input type="text" placeholder="Search all products" onChange={this.searchInputUpdateHandle} />
                </Col>
            </Row>
            <SearchableTable options={this.state.options} title={this.state.tableInStock.title} headers={this.state.tableInStock.tableHeaders} data={this.state.tableInStock.tableData} />
            <SearchableTable options={this.state.options} title={this.state.tableOutOfStock.title} headers={this.state.tableOutOfStock.tableHeaders} data={this.state.tableOutOfStock.tableData} />
        </Container>;
    }
}