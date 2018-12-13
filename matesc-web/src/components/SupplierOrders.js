import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import {unprocessedSuppliersOrdersFetch, supplierOrderContent, createReplenishmentWave} from '../utils';

export default class SupplierOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Supplier Orders",
            headers:[{name:"Order ID"},{name:"Supplier"},{name:"Arrival Date"},{name: "Include"}],
            data: [["A27","Sociedade de fornecimento, Lda","21/02/2019"],
                ["A14","Papalaco & Papeis","12/03/2019"],
                ["A19","Recheio","30/01/2019"]],
            options:{
                link:'/supplier-order-content'
            },
            updated: false
        };
        this.checkedHandler = this.checkedHandler.bind(this);
        this.prepareReplenishmentWave = this.prepareReplenishmentWave.bind(this);
    }

    async componentDidMount(){
        if(!this.state.updated){
            if(this.props){
                if(this.props.authentication){
                    let r = await unprocessedSuppliersOrdersFetch(this.props.authentication)
                    r = await r.json();
                    this.setStateTableData(r);
                    this.setState({
                        updated:true
                    })
                }
            } 
        }            
        
    }

    async componentDidUpdate(){
        //know if i already updated
        if(!this.state.updated){
            if(this.props.authentication){
                let r = await unprocessedSuppliersOrdersFetch(this.props.authentication)
                r = await r.json();
                this.setStateTableData(r);
                this.setState({
                    updated:true
                })
            }
        }
    }

    setStateTableData(response){
   
       let a = [];
       //building state with response
        for (let i = 0; i < response.DataSet.Table.length; i++) {
                let data = response.DataSet.Table[i]['DataDoc'];
                data = data.replace("T", " ");
                let line = [response.DataSet.Table[i]['OrderId'],response.DataSet.Table[i]['Nome'],data];
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

    async prepareReplenishmentWave() {
        if(!this.state.checkedOrders) {
            return;
        }

        if(this.state.checkedOrders.length === 0) {
            return;
        } 

        let orders = [];

        for(let i = 0; i < this.state.checkedOrders.length; i++) {
            let id = this.state.checkedOrders[i];

            let items = await supplierOrderContent(this.props.authentication, id[0], id.substring(1, id.length));
            items = await items.json();

            orders.push(items.DataSet.Table);
        }

        let replenishmentList = await createReplenishmentWave(orders);
        console.log(await replenishmentList.json());
    }

    render() {
        return (
        <Container>
            <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} checkedHandler = {this.checkedHandler} />
            <Link to='/replenishment-list'><Button outline color='primary' size='lg' className='float-right' onClick={this.prepareReplenishmentWave}>Put items away</Button></Link>
        </Container>)
    }
}