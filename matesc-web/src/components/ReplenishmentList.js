import React, { Component } from 'react';
import {
    Container,
    Row,
    Button
} from 'reactstrap';
import SearchableTable from "./SearchableTable";
import Cookies from 'universal-cookie';
import NavBar from "../NavBar";
import { getUrlVars, getReplenishmentWave, transferWarehouse, putFinishedReplenishmentList, getItemLocation } from "../utils.js"

export default class ReplenishmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            tableHeaders: [{ name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tablesData: [[[]]],
            options: {
                link: false,
                search:false,
                print:false
            },
            updated: false,
            loading:false
        };

        this.finishedReplenishment = this.finishedReplenishment.bind(this);
    }

    async componentDidMount(){
        const cookies = new Cookies();

        if(!cookies.get('token')){
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            let id = getUrlVars()['id'];
            let r = await getReplenishmentWave(id);
            r = await r.json();
            this.setState({
                updated: true
            })
            this.setStateTableData(r.waves);
        }
    }

    async componentDidUpdate() {
        const cookies = new Cookies();

        if(!cookies.get('token')){
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            let id = getUrlVars()['id'];
            let r = await getReplenishmentWave(id);
            r = await r.json();
            this.setState({
                updated: true
            })
            this.setStateTableData(r.waves);
        }
    }

    setStateTableData(waves){
        let replenishmentWaves = [];
        for (const wave of waves) {
            let row = [];
            for(const item of wave){
                row.push([ item.Artigo, item.Descricao, item.DescricaoLocalizacao , item.StkActual]);
            }
            replenishmentWaves.push(row);
        }
        this.setState({
            tablesData: replenishmentWaves
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
            return  <Button outline color='success' size='lg' className='float-right ml-auto' onClick= {this.finishedReplenishment}>Complete replenishment</Button>
    }

    async finishedReplenishment() {

        this.setState({
            loading: true
        })
        
        let id = getUrlVars()['id'];
        
        //pedido a nossa api para meter a replenishment list finished
        await putFinishedReplenishmentList(id);
        const cookies = new Cookies();

        let token = cookies.get('token')

        let items = [];
        let tables = this.state.tablesData;
        for(let i = 0; i < tables.length; i++) {
            for(let j = 0; j < tables[i].length; j++) {
                let row = tables[i][j];

                let location = await getItemLocation(token,row[0]);
                location = await location.json();
                location = await location.DataSet.Table[0].Localizacao;

                let item = {};
                item.id = row[0];
                item.location = location;
                item.quantity = row[3];
                items.push(item);
            }
        }

        let r = await transferWarehouse(token, items);
        await r.json();
        
        this.setState({
            loading: false
        })

        window.location.href = '/unfinished-lists';
    }

    render() {
        let id = getUrlVars()['id'];
        return (<Container>
            <NavBar />
            <h1>Replenishment List - {id} </h1>
            {this.showTables()}
            <Row>
                {this.showLoadingOrButton()}
            </Row>
        </Container>)
    }
}