import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import { itemsToStore, getItem, createReplenishmentWave } from '../utils';
import Cookies from 'universal-cookie';
import NavBar from '../NavBar';

export default class ProductsToStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Products to store",
            headers: [{ name: "Product ID" }, { name: "Product Name" }, { name: "Suggested Location" }, { name: "Quantity" }, { name: "Include" }],
            data: [["A27", "Sociedade de fornecimento, Lda", "21/02/2019"],
            ["A14", "Papalaco & Papeis", "12/03/2019"],
            ["A19", "Recheio", "30/01/2019"]],
            options: {
                loading: true,
                link:false
            },
            updated: false
        };
        this.checkedHandler = this.checkedHandler.bind(this);
        this.prepareReplenishmentWave = this.prepareReplenishmentWave.bind(this);
    }

    async componentDidMount() {
        const cookies = new Cookies();

        if (!cookies.get('token')) {
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            if (cookies.get('token')) {
                let r = await itemsToStore(cookies.get(`token`));
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

    async componentDidUpdate() {
        //know if i already updated
        const cookies = new Cookies();

        if (!this.state.updated) {
            if (cookies.get('token')) {
                let r = await itemsToStore(cookies.get(`token`));
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
        //building state with response
        if (!response.DataSet) {
            this.setState({
                error: true
            });
            return;
        }
        for (let i = 0; i < response.DataSet.Table.length; i++) {
            
            let product = response.DataSet.Table[i];
            let line = [product.Artigo, product['Descricao'], product['DescricaoLocalizacao'], product['StkActual']];
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

    async prepareReplenishmentWave() {
        const cookies = new Cookies();

        if(!this.state.checkedOrders) {
             return;
         }
 
         if(this.state.checkedOrders.length === 0) {
             return;
         } 
 
         let items = [];
 
         for(let i = 0; i < this.state.checkedOrders.length; i++) {
             let id = this.state.checkedOrders[i];
            
             let item = await getItem(cookies.get('token'), id, 'A2');
             item = await item.json();
 
             items.push(item.DataSet.Table);
         }
 
         let replenishmentList = await createReplenishmentWave(items);
         console.log(await replenishmentList.json());
     }

    render() {
        return (
            <Container>
                <NavBar />
                <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} checkedHandler={this.checkedHandler} />
                <Button outline color='primary' size='lg' className='float-right' onClick={this.prepareReplenishmentWave}>Confirm Arrival</Button>
            </Container>)
    }
}