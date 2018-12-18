import React, { Component } from 'react';
import {
    Container,
    Row,
    Button
} from 'reactstrap';
import SearchableTable from "./SearchableTable";
import Cookies from 'universal-cookie';
import NavBar from "../NavBar";
import { getPickingWave, getUrlVars,putFinishedPickingList,clientOrderInfoContent,createGR } from "../utils";

export default class PickingList extends Component {
    constructor(props) {
        super(props);
        this.ordersIDs=[];
        this.state = {
            title: "",
            tableHeaders: [{ name: "Order ID" }, { name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tablesData: [[[]]],
            options: {
                link: '/client-order-content',
                search: false,
                print: false
            },
            updated: false,
            loading:false
        };

        this.finishedPicking = this.finishedPicking.bind(this);
    }


    async componentDidMount() {
        const cookies = new Cookies();

        if (!cookies.get('token')) {
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            let id = getUrlVars()['id'];
            let r = await getPickingWave(id);
            r = await r.json();
            this.setState({
                updated: true
            })
            this.setStateTableData(r.waves);
        }
    }

    async componentDidUpdate() {
        //know if i already updated
        const cookies = new Cookies();

        if (!cookies.get('token')) {
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            let id = getUrlVars()['id'];
            let r = await getPickingWave(id);
            r = await r.json();
            this.setStateTableData(r.waves);
            this.setState({
                updated: true
            })
        }
    }

    setStateTableData(waves){
        let pickingWaves = [];
        for (const wave of waves) {
            let row = [];
            for(const item of wave){
                if(!this.ordersIDs.includes(item.order)){
                    this.ordersIDs.push(item.order);
                }
                row.push([ item.order ,item.Artigo, item.Descricao, item.DescricaoLocalizacao , item.Quantidade]);
            }
            pickingWaves.push(row);
        }
        this.setState({
            tablesData: pickingWaves
        })
    }

    showTables(){
        let children = [];
        let i = 1;
        for(const table of this.state.tablesData){
            children.push(<h4>Wave {i}</h4>)
            children.push(<SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={table}></SearchableTable>);
            i++;
        }
        return children;
    }

    showLoadingOrButton(){
        if(this.state.loading)
            return <div className="loader">Loading...</div>
        else
            return  <Button outline color='success' size='lg' className='float-right ml-auto' onClick= {this.finishedPicking}>Complete picking</Button>
    }

    async finishedPicking(){

        this.setState({
            loading: true
        })
        //TODO
        //pedido ao primavera para obter a entidade a partir do order id
        //fazer o pedido createGR para cada order

        //windows.location.href
        let id = getUrlVars()['id'];
        //pedido a nossa api para meter a picking list finished
        await putFinishedPickingList(id);
        const cookies = new Cookies();

        let token = cookies.get('token')
        for (const orderId of this.ordersIDs) {
            let r = await clientOrderInfoContent(token,orderId[0],orderId.substring(1,orderId.length));
            r = await r.json();
            let entity = r.DataSet.Table[0].Entidade;
            r = await createGR(token,orderId[0],orderId.substring(1,orderId.length),entity);         
        }
        
        this.setState({
            loading: false
        })

        window.location.href = '/unfinished-lists';
    }

    render() {
        let id = getUrlVars()['id'];
        return (<Container>
            <NavBar />
            <h1>Picking List - {id} </h1>
            {this.showTables()}
            <Row>
                {this.showLoadingOrButton()}
            </Row>
        </Container>)
    }
}