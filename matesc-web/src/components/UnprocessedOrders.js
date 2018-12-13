import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import { unprocessedClientOrdersFetch } from '../utils';

export default class UnprocessedOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Client Orders",
            headers: [{ name: "Order ID" }, { name: "Client" }, { name: "Deadline" }, { name: "Include" }],
            data: [["A36", "Bertrand NorteShopping", "21/02/2019"],
            ["A12", "FNAC Braga", "12/03/2019"],
            ["A23", "Papelaria Alegria", "04/02/2019"]],
            options: {
                link: '/client-order-content'
            },
            updated: false
        };
        this.checkedHandler = this.checkedHandler.bind(this);
    }

    async componentDidMount() {
        if (!this.state.updated) {
            if (this.props !== undefined) {
                if (this.props.authentication !== undefined) {
                    let r = await unprocessedClientOrdersFetch(this.props.authentication);
                    r = await r.json();
                    this.setStateTableData(r);
                    this.setState({
                        updated: true
                    })
                }
            }
        }


    }

    async componentDidUpdate() {
        //know if i already updated
        if (!this.state.updated) {
            if (this.props.authentication !== undefined) {
                let r = await unprocessedClientOrdersFetch(this.props.authentication);
                r = await r.json();
                this.setStateTableData(r);
                this.setState({
                    updated: true
                })
            }
        }
       
    }

    setStateTableData(response) {
        let a = [];
        //building state with response
        for (let i = 0; i < response.DataSet.Table.length; i++) {
            let data = response.DataSet.Table[i]['Data'];
            data = data.replace("T", " ");
            let line = [response.DataSet.Table[i]['OrderId'], response.DataSet.Table[i]['Nome'], data];
            a.push(line);
        }

        this.setState({
            data: a,
        })
    }

    checkedHandler(checkedOrders){
        this.setState({
            checkedOrders : checkedOrders
        });  
    }

    render() {
        return <Container>
            <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} checkedHandler = {this.checkedHandler} />
            <Link to="/picking-list">
                <Button outline color="primary" size="lg" className="float-right">
                    Create picking wave
              </Button>
            </Link>

        </Container>;
    }
}