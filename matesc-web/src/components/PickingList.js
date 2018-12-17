import React, { Component } from 'react';
import {
    Container,
    Row,
    Button
} from 'reactstrap';
import SearchableTable from "./SearchableTable";
import Cookies from 'universal-cookie';
import NavBar from "../NavBar";
import { getPickingWave, getUrlVars } from "../utils";

export default class PickingList extends Component {
    constructor(props) {
        super(props);

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
            this.setStateTableData(r.waves);
            this.setState({
                updated: true
            })
        }
    }

    async componentDidUpdate() {
        //know if i already updated
        const cookies = new Cookies();

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
                row.push([ 1,item.Artigo, item.Descricao, item.DescricaoLocalizacao , item.Quantidade]);
            }
            pickingWaves.push(row);
        }
        this.setState({
            tablesData: pickingWaves
        })
    }

    showTables(){
        let children = [];
        for(const table of this.state.tablesData){
            children.push(<SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={table}></SearchableTable>);
        }
        return children;
    }

    showLoadingOrButton(){
        if(this.state.loading)
            return <div class="loader">Loading...</div>
        else
            return  <Button outline color='success' size='lg' className='float-right ml-auto' onClick= {this.finishedPicking}>Complete picking</Button>
    }

    finishedPicking(){

        this.setState({
            loading: true
        })
        //TODO
        //pedido ao primavera para obter a entidade a partir do order id
        //fazer o pedido createGR para cada order
        //pedido a nossa api para meter a picking list finished
        //windows.location.href
        this.setState({
            loading: false
        })
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