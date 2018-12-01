import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTableCheckbox from "./SearchableTableCheckbox";

export default class UnprocessedOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Client Orders",
            headers: [{ name: "Order ID" }, { name: "Client" }, { name: "Deadline" }, { name: "Include" }],
            data: [["A36", "Bertrand NorteShopping", "21/02/2019"],
                ["A12", "FNAC Braga", "12/03/2019"],
                ["A23", "Papelaria Alegria", "04/02/2019"]],
            options:{
                link:'/client-order-content'
            }
        };
    }

    render() {
        return <Container>
            <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} />
            <Link to="/picking-list">
              <Button outline color="primary" size="lg" className="float-right">
                Create picking wave
              </Button>
            </Link>
          </Container>;
    }
}