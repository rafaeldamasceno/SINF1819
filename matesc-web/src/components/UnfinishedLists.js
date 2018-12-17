import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
} from 'reactstrap';

import SearchableTable from "./SearchableTable";
import { getPickingWaves, getReplenishmentWaves, errorMessage } from '../utils';
import Cookies from 'universal-cookie';
import NavBar from '../NavBar';

export default class UnfinishedLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tablePickingList: {
                title: "Picking Lists",
                tableHeaders: [{ name: "List ID" }, { name: "Creation Date" }],
                tableData: [["A003", "Pencil"],
                ["A004", "Calculator"],
                ["A006", "Stapler"]]
            },
            tableReplenishList: {
                title: "Replenishment Lists",
                tableHeaders: [{ name: "List ID" }, { name: "Creation Date" }],
                tableData: [["A003", "Pencil"],
                ["A004", "Calculator"],
                ["A006", "Stapler"]]
            },
            optionsPick: {
                link: '/picking-list',
                search: false,
                searchInput: "",
                loading: true
            },
            optionsReplenish: {
                link: '/replenishment-list',
                search: false,
                searchInput: "",
                loading: true
            },
            updated: false,
            error: false
        };
        this.searchInputUpdateHandle = this.searchInputUpdateHandle.bind(this);
    }
    async componentDidMount() {
        const cookies = new Cookies();

        if(!cookies.get('token')){
            window.location.href = '/login';
        }

        if (!this.state.updated) {
            if (cookies.get('token') !== undefined) {
                this.setState({
                    updated: true
                })

                //funçao que vai retornar as listas de picking
                let r = await getPickingWaves();
                r = await r.json();
                this.setStatePickingLists(r);

                //funçao que vai retornar as listas de replenish
                r = await getReplenishmentWaves();
                r = await r.json();
                this.setStateReplenishmentLists(r);

                let copy = Object.assign({}, this.state.optionsPick);
                copy.loading = false;
                this.setState({optionsPick:copy})

                copy = Object.assign({}, this.state.optionsReplenish);
                copy.loading = false;
                this.setState({optionsReplenish:copy})
            }
        }


    }
    async componentDidUpdate() {
        //know if i already updated       
        const cookies = new Cookies(); 
        if (!this.state.updated) {
            if (cookies.get('token') !== undefined) {
                this.setState({
                    updated: true
                })

                //picking lists
                let r = await getPickingWaves();
                r = await r.json();
                this.setStatePickingLists(r);

                //replenish lists
                r = await getReplenishmentWaves();
                r = await r.json();
                this.setStateReplenishmentLists(r);

                let copy = Object.assign({}, this.state.optionsPick);
                copy.loading = false;
                this.setState({optionsPick:copy})

                copy = Object.assign({}, this.state.optionsReplenish);
                copy.loading = false;
                this.setState({optionsReplenish:copy})
            }
        }
    }

    setStatePickingLists(response) {

        console.log(response);

        let a = [];
        //building state with response
        for (let i = 0; i < response.length; i++) {
            let lineInfo = response[i];
            let id = lineInfo.id;
            let creationDate = lineInfo.timestamp;
            let line = [id, creationDate];
            a.push(line);
        }

        let copy = Object.assign({}, this.state.tablePickingList);
        copy.tableData = a;

        this.setState({
            tablePickingList: copy
        })
    }

    setStateReplenishmentLists(response) {
        
        let a = [];
        //building state with response
        for (let i = 0; i < response.length; i++) {
            let lineInfo = response[i];
            let id = lineInfo.id;
            let creationDate = lineInfo.timestamp;
            let line = [id, creationDate];
            a.push(line);
        }

        let copy = Object.assign({}, this.state.tableReplenishList);
        copy.tableData = a;

        this.setState({
            tableReplenishList: copy
        })
    }

    searchInputUpdateHandle(event) {

        let copy = Object.assign({}, this.state.optionsPick);
        copy.searchInput = event.target.value.toLowerCase()
        this.setState({optionsPick:copy})

        copy = Object.assign({}, this.state.optionsReplenish);
        copy.searchInput = event.target.value.toLowerCase()
        this.setState({optionsReplenish:copy})
    }

    render() {
        return(
        <React.Fragment>
            <NavBar />
            <Container>
            {errorMessage(this.state.error)}
            <Row>
                <Col xs="0" className="ml-auto">
                    <Input type="text" placeholder="Search all lists" onChange={this.searchInputUpdateHandle} />
                </Col>
            </Row>
            <SearchableTable options={this.state.optionsPick} title={this.state.tablePickingList.title} headers={this.state.tablePickingList.tableHeaders} data={this.state.tablePickingList.tableData} />
            <SearchableTable options={this.state.optionsReplenish} title={this.state.tableReplenishList.title} headers={this.state.tableReplenishList.tableHeaders} data={this.state.tableReplenishList.tableData} />
        </Container>
        </React.Fragment>);
    }
}