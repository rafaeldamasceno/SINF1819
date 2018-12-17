import React, { Component } from 'react';
import {
    Container,
    Row,
    Button
} from 'reactstrap';
import SearchableTable from "./SearchableTable";
import Cookies from 'universal-cookie';
import NavBar from "../NavBar";
import { getPickingWave , getUrlVars} from "../utils";

export default class PickingList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Picking list",
            tableHeaders: [{ name: "Order ID" }, { name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tableData: [["A53", "A001", "Binder", "Corridor 1, Shelf 2, L", "153"],
            ["A43", "A003", "Stapler", "Corridor 3, Shelf 2, L", "50"],
            ["A26", "A004", "Calculator", "Corridor 2, Shelf 1, R", "13"]],
            options: {
                link: '/client-order-content',
                search: true,
                print: true
            },
            updated: false
        };
    }


    async componentDidMount() {
        const cookies = new Cookies();

        if (!cookies.get('token')) {
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            let id = getUrlVars()['id'];
            let r = await getPickingWave(id);
            console.log(r);
            
            r = await r.json();
            console.log(r);
            
            //this.setStateTableData(r);
            this.setState({
                updated: true
            })
        }
    }

    render() {
        return (<Container>
            <NavBar />
            <SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={this.state.tableData}></SearchableTable>
            <Row>
                <Button outline color='success' size='lg' className='float-right ml-auto'>Complete picking</Button>
            </Row>
        </Container>)
    }
}