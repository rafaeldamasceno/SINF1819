import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import NavBar from "../NavBar"
import { unprocessedClientOrdersFetch, createPickingWave, clientOrderContent } from '../utils';

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
                link: '/client-order-content',
                loading: true
            },
            updated: false
        };
        this.checkedHandler = this.checkedHandler.bind(this);
        this.preparePickingWave = this.preparePickingWave.bind(this);        
    }

    async componentDidMount() {
        const cookies = new Cookies();
        if (!this.state.updated) {
                if (cookies.get('token') !== undefined) {                  
                    let r = await unprocessedClientOrdersFetch(cookies.get('token'));
                    r = await r.json();
                    this.setStateTableData(r);
                    this.setState({
                        updated: true
                    })
                    let copy = Object.assign({}, this.state.options);
                    copy.loading = false;
                    this.setState({options:copy})
                }
        }


    }

    async componentDidUpdate() {
        //know if i already updated
        const cookies = new Cookies();
        
        if (!this.state.updated) {
            if (cookies.get('token') !== undefined) {               
                let r = await unprocessedClientOrdersFetch(cookies.get('token'));
                r = await r.json();
                this.setStateTableData(r);
                this.setState({
                    updated: true
                })
                let copy = Object.assign({}, this.state.options);
                copy.loading = false;
                this.setState({options:copy})
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

    async preparePickingWave() {
        const cookies = new Cookies();
        if(!this.state.checkedOrders) {
            return;
        }

        if(this.state.checkedOrders.length === 0) {
            return;
        } 

        let orders = [];

        for(let i = 0; i < this.state.checkedOrders.length; i++) {
            let id = this.state.checkedOrders[i];

            let items = await clientOrderContent(cookies.get('token'), id[0], id.substring(1, id.length));
            items = await items.json();

            orders.push(items.DataSet.Table);
        }

        let pickingList = await createPickingWave(orders);
        console.log(await pickingList.json());
    }

    render() {
        return (        
        <React.Fragment>
        <NavBar/>
            <Container>
                <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} checkedHandler = {this.checkedHandler} />
                <Link to="/picking-list">
                    <Button outline color="primary" size="lg" className="float-right" onClick={this.preparePickingWave}>
                        Create picking wave
                    </Button>
                </Link>
        </Container>
        </React.Fragment> 
        );
    }
}