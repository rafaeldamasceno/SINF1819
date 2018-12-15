import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import {unprocessedSuppliersOrdersFetch,createVGR,supplierOrderInfoContent} from '../utils';

export default class SupplierOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Products to Reallocate",
            headers:[{name:"Product ID"},{name:"Product Name"},{name:"Quantity"},{name: "Include"}],
            data: [["A27","Sociedade de fornecimento, Lda","21/02/2019"],
                ["A14","Papalaco & Papeis","12/03/2019"],
                ["A19","Recheio","30/01/2019"]],
            options:{
                link:'/supplier-order-content',
                loading: true
            },
            updated: false
        };
        this.checkedHandler = this.checkedHandler.bind(this);
        this.prepareTransformDoc = this.prepareTransformDoc.bind(this);
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
                    let copy = Object.assign({}, this.state.options);
                    copy.loading = false;
                    this.setState({options:copy})
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
                let copy = Object.assign({}, this.state.options);
                    copy.loading = false;
                    this.setState({options:copy})
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


    async prepareTransformDoc(){
        if(!this.state.checkedOrders) {
            return;
        }

        if(this.state.checkedOrders.length === 0) {
            return;
        }

        for(let i =0; i < this.state.checkedOrders.length; i++){
            let id = this.state.checkedOrders[i];
            let orderInfo = await supplierOrderInfoContent(this.props.authentication,id[0], id.substring(1, id.length)); 
            let entity = await orderInfo.json();
            entity = entity.DataSet.Table[0].Entidade;
           let r = await createVGR(this.props.authentication,id[0], id.substring(1, id.length),entity);
        }
    }
   /* async prepareReplenishmentWave() {
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
    }*/

    render() {
        return (
        <Container>
            <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} checkedHandler = {this.checkedHandler} />
            <Link to='/produts-to-store'><Button outline color='primary' size='lg' className='float-right' onClick={this.prepareTransformDoc}>Confirm Arrival</Button></Link>
        </Container>)
    }
}