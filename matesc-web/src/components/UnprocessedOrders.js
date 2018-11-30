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
            data: [[36272, "Bertrand NorteShopping", "21/02/2019"],
                [62153, "FNAC Braga", "12/03/2019"],
                [24263, "Papelaria Alegria", "04/02/2019"]],
            options:{
                link:true
            }
        };
    }

    render() {
        return <Container>
            <SearchableTableCheckbox title={this.state.title} headers={this.state.headers} data={this.state.data} />
            <Link to="/picking-list">
              <Button outline color="primary" size="lg" className="float-right">
                Create picking wave
              </Button>
            </Link>
          </Container>;
    }
}