import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
} from 'reactstrap';
import SearchableTable from "./SearchableTable";
import { supplierOrderInfoContent, getUrlVars, supplierOrderContent, errorMessage } from '../utils';

export default class SupplierOrderContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: { ID: 67326, arrivalDate: "12/01/2019", supplier: "Papalaco & Papeis", total: "782€" },
            title: "Items in order",
            tableHeaders: [{ name: "Product Code" }, { name: "Product Name" }, { name: "Location" }, { name: "Quantity" }],
            tableData: [["A001", "Binder", "Corridor 1, Shelf 2, L", "153"],
            ["A002", "Crayons", "Corridor 3, Shelf 1, L", "50"],
            ["A004", "Calculator", "Corridor 2, Shelf 2, R", "13"]],
            options: {
                link: false,
                search: true
            },
            updated: false,
            error: false
        };
    }

    async componentDidMount() {
        let id = getUrlVars()['id'];
        let copy = Object.assign({}, this.state.orderInfo);
        copy.ID = id;
        this.setState({
            orderInfo: copy
        });
        if (!this.state.updated) {
            if (this.props !== undefined) {
                if (this.props.authentication !== undefined) {
                    this.setState({
                        updated: true
                    })
                    let r = await supplierOrderInfoContent(this.props.authentication, id[0], id.substring(1, id.length))
                    r = await r.json();
                    this.setStateOrderInfo(r);

                    r = await supplierOrderContent(this.props.authentication, id[0], id.substring(1, id.length));
                    r = await r.json();
                    this.setStateOrderContent(r);
                }
            }
        }

    }

    async componentDidUpdate() {
        //know if i already updated
        if (!this.state.updated) {
              if (this.props !== undefined) {
                if (this.props.authentication !== undefined) {
                    let id = this.state.orderInfo.ID;
                    this.setState({
                        updated: true
                    })
                    let r = await supplierOrderInfoContent(this.props.authentication, id[0], id.substring(1, id.length))
                    r = await r.json();
                    this.setStateOrderInfo(r);

                    r = await supplierOrderContent(this.props.authentication, id[0], id.substring(1, id.length));
                    r = await r.json();
                    this.setStateOrderContent(r);
                }
            }
        }
    }

    setStateOrderInfo(response) {
        if (!response.DataSet) {
              this.setState({
                error: true
            });
            return;
        }
        //building state with response     
        let info = response.DataSet.Table[0];
        let ID = info['OrderId'];
        let arrivalDate = info['DataDoc'];
        arrivalDate = arrivalDate.replace("T", " ");
        let supplier = info['Nome'];
        let total = info['PrecoTotal'] + "€";

        let orderInfo = { ID, arrivalDate, supplier, total };

        this.setState({
            orderInfo: orderInfo
        })
    }

    setStateOrderContent(response) {
        if (!response.DataSet) {
            this.setState({
                error: true
            });
            return;
        }
        let a = [];
        //building state with response
        for (let i = 0; i < response.DataSet.Table.length; i++) {
            let lineInfo = response.DataSet.Table[i];
            let code = lineInfo['Artigo'];
            let description = lineInfo['Descricao'];
            let location = lineInfo['DescricaoLocalizacao'];
            let quantity = lineInfo['Quantidade'];
            let line = [code, description, location, quantity];
            a.push(line);
        }

        this.setState({
            tableData: a,
        })
    }



    render() {
        return (
            <Container>
                {errorMessage(this.state.error)}
                <Row>
                    <Col>
                        <h1>Supplier order info</h1>
                    </Col>
                    <Col xs='1' className='ml-auto mr-2'>
                        <Button><i class="fas fa-print"></i> Print</Button>
                    </Col>
                </Row>
                <div class='order-info'>
                    <p>
                        <span class='font-weight-bold mr-1'>
                            ID:
                    </span>
                        {this.state.orderInfo.ID}
                    </p>
                    <p>
                        <span class='font-weight-bold mr-1'>
                            Arrival:
                    </span>
                        {this.state.orderInfo.arrivalDate}
                    </p>
                    <p>
                        <span class='font-weight-bold mr-1'>
                            Supplier:
                    </span>
                        {this.state.orderInfo.supplier}
                    </p>
                    <p>
                        <span class='font-weight-bold mr-1'>
                            Total:
                    </span>
                        {this.state.orderInfo.total}
                    </p>
                </div>
                <SearchableTable options={this.state.options} title={this.state.title} headers={this.state.tableHeaders} data={this.state.tableData}></SearchableTable>
            </Container>)
    }
}