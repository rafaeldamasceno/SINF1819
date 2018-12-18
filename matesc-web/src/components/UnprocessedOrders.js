import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import Cookies from 'universal-cookie';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import NavBar from "../NavBar"
import { unprocessedClientOrdersFetch, createPickingWave, clientOrderContent, errorMessage } from '../utils';

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
            updated: false,
            error:false,
            loading:false
        };
        this.checkedHandler = this.checkedHandler.bind(this);
        this.preparePickingWave = this.preparePickingWave.bind(this);

    }

    async componentDidMount() {
        const cookies = new Cookies();

        if(!cookies.get('token')){
            window.location.href = '/login';
          }
        if (!this.state.updated) {
            if (cookies.get('token') !== undefined) {
                console.log(cookies.get('token'));

                let r = await unprocessedClientOrdersFetch(cookies.get('token'));
                r = await r.json();
                console.log(r);
                
                this.setStateTableData(r);
                this.setState({
                    updated: true
                })
                let copy = Object.assign({}, this.state.options);
                copy.loading = false;
                this.setState({ options: copy })
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
                this.setState({ options: copy })
            }
        }

    }

    setStateTableData(response) {
        let a = [];
        if(!response.DataSet){
            this.setState({
                error:true
            })
        }
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

    checkedHandler(checkedOrders) {
        this.setState({
            checkedOrders: checkedOrders
        });
    }

    
    showLoadingOrButton(){
        if(this.state.loading)
            return <div className="loader">Loading...</div>
        else
            return  <Button outline color="primary" size="lg" className="float-right" onClick={this.preparePickingWave}>
                            Create picking wave
                    </Button>
    }

    async preparePickingWave() {
        const cookies = new Cookies();
        if (!this.state.checkedOrders) {
            return;
        }

        if (this.state.checkedOrders.length === 0) {
            return;
        }

        this.setState({
            loading:true
        });

        let orders = [];

        for (let i = 0; i < this.state.checkedOrders.length; i++) {
            let id = this.state.checkedOrders[i];

            let items = await clientOrderContent(cookies.get('token'), id[0], id.substring(1, id.length));
            items = await items.json();

            let order = {};
            order.id = id;
            order.items = items.DataSet.Table;

            orders.push(order);
        }

        let pickingList = await createPickingWave(orders);
        let pickingListInfo = await pickingList.json();
        let pickingListId = await pickingListInfo.id;
        this.setState({
            loading:false
        });

        window.location.href = '/picking-list?id=' + pickingListId;
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Container>
                    {errorMessage(this.state.error)}
                    <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} checkedHandler={this.checkedHandler} />
                    {this.showLoadingOrButton()}
                </Container>
            </React.Fragment>
        );
    }
}