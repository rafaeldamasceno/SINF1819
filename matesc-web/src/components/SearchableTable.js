import React, { Component } from 'react';
import {
    Row,
    Col,
    Input,
    Table,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SearchableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
        };
        this.searchInputUpdateHandle = this.searchInputUpdateHandle.bind(this);
    }

    showHeaders(){      
        let children =[];
        for (const header of this.props.headers) {            
            children.push(<th>{header.name}</th>);
        } 
        return children
    }

    rowContainsWord(row,input){
        for (let rowField of row) {
            rowField = rowField.toLowerCase();
            console.log(rowField);
            
            //if field contains input
            if(rowField.search(input) > -1){
                return true;
            } 
        }
        return false;
    }

    showRow(row) {
        console.log(this.state.searchInput);
        console.log(row);
        if (!this.rowContainsWord(row, this.state.searchInput))
            return;
        
        let children = [];
        if(this.props.options.link)
            children.push(<th scope="row"><Link to={this.props.options.link}>{row[0]}</Link></th>)
        else{
            children.push(<th scope="row">{row[0]}</th>)
        }
        for (let i = 1; i < row.length; i++) {
            children.push(<td>{row[i]}</td>);
        }
        return children
    }

    showTable(){
        let tr = [];
        for (const row of this.props.data) {
            tr.push(<tr>{this.showRow(row)}</tr>);
        }
        return tr;
    }

    searchInputUpdateHandle(event){
        this.setState({searchInput: event.target.value.toLowerCase()});
    }

    showSearch(){
        if(this.props.options.search){
            return (
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search' onChange={this.searchInputUpdateHandle}></Input>
                </Col>
            )
        }
    }

    showPrint(){
        if (this.props.options.print){
            return(
                <Col xs='1' className='ml-auto mr-2'>
                   <Button><i class="fas fa-print"></i> Print</Button>
                </Col>
            )
        }
    }

    render() {
        return (<React.Fragment>
            <Row>
                <Col>
                    <h1>{this.props.title}</h1>
                </Col>
                {this.showPrint()}
                {this.showSearch()}
            </Row>
            <Table striped>
                <thead>
                    <tr>
                        {this.showHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this.showTable()}
                </tbody>
            </Table>
            </React.Fragment>
            )
    }
}