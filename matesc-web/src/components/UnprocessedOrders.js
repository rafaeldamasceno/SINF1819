import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchableTableCheckbox from "./SearchableTableCheckbox";
import { AppConsumer } from '../App';
import {unprocessedClientOrdersFetch, query, loadItems } from '../utils';

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
                link: '/client-order-content'
            }
        };
    }
    static getDerivedStateFromProps(props, state){
        console.log("ola eu tou no getderivedstates");
        
        console.log(props);
        
    }
    componentDidMount(){
        console.log("ola eu tou no componentdidmount");
        console.log(this.props);
        
    }

    componentDidUpdate(prevProps){
        console.log("ola eu tou no did update");
        console.log(this.props);
        if(this.props.authentication !== undefined){
            console.log("ola tou a chamar o fetch e nao sou undefined");
            console.log(this.props.authentication);
    
            unprocessedClientOrdersFetch(this.props.authentication)
            .then(console.log("hey"))
            .then(r => r.json())
            .then(r => {console.log(r)});
        }
        
    }

    render() {
        return <Container>
            <SearchableTableCheckbox options={this.state.options} title={this.state.title} headers={this.state.headers} data={this.state.data} />
            <Link to="/picking-list">
                <Button outline color="primary" size="lg" className="float-right">
                    Create picking wave
              </Button>
            </Link>

        </Container>;
    }
}