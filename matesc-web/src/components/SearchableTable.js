import React, { Component } from 'react';
import {
    Row,
    Col,
    Input,
    Table,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
/*
props{
    headers: array of the headers of the table
    data: matrix of the table data
    title: title of the table
    options:{
        link: destination link of the first columns(ids) href=prop.options.link+row[0]
        search: shows or not the search field
        print: shows or not the print field
        searchInput: only shows rows with that word (used to be able to search words from parents, search should be false)
        loading: true if a loading spinner should be shown
    }
}

}
*/
export default class SearchableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
        };
        this.searchInputUpdateHandle = this.searchInputUpdateHandle.bind(this);
    }

    componentDidUpdate() {
        if (typeof this.props.options.searchInput !== 'undefined') {        
            if (this.state.searchInput !== this.props.options.searchInput) {
                this.setState({ searchInput: this.props.options.searchInput });
            }
        }
    }

    showHeaders() {
        let children = [];
        for (const header of this.props.headers) {
            children.push(<th>{header.name}</th>);
        }
        return children
    }

    rowContainsWord(row, input) {

        for (let rowField of row) {
            rowField += "";
            rowField = rowField.toLowerCase();

            //if field contains input
            if (rowField.search(input) > -1) {
                return true;
            }
        }
        return false;
    }

    showRow(row) {
        if (!this.rowContainsWord(row, this.state.searchInput)) {
             return;
        }


        if (this.props.filterWord) {
            if (!this.rowContainsWord(row, this.props.filterWord))
                return;
        }
        let children = [];
        if (this.props.options.link)
            children.push(<th scope="row"><Link to={this.props.options.link}>{row[0]}</Link></th>)
        else {
            children.push(<th scope="row">{row[0]}</th>)
        }
        for (let i = 1; i < row.length; i++) {
            children.push(<td>{row[i]}</td>);
        }
        return children
    }

    showTable() {
        let tr = [];
        for (const row of this.props.data) {
            tr.push(<tr>{this.showRow(row)}</tr>);
        }
        return tr;
    }

    searchInputUpdateHandle(event) {
        this.setState({ searchInput: event.target.value.toLowerCase() });
    }

    showSearch() {
        if (this.props.options.search) {
            return (
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search' onChange={this.searchInputUpdateHandle}></Input>
                </Col>
            )
        }
    }

    showPrint() {
        if (this.props.options.print) {
            return (
                <Col xs='1' className='ml-auto mr-2'>
                    <Button><i class="fas fa-print"></i> Print</Button>
                </Col>
            )
        }
    }

    showTableOrLoading(){
        if(this.props.options.loading){
            return <div class="loader">Loading...</div>            
        }else{
            return <Table striped>
                <thead>
                    <tr>
                        {this.showHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this.showTable()}
                </tbody>
            </Table>
        }
    }

    render() {
        console.log("manel");
        return (<React.Fragment>
            <Row>
                <Col>
                    <h1>{this.props.title}</h1>
                </Col>
                {this.showPrint()}
                {this.showSearch()}
            </Row>
            {this.showTableOrLoading()}
        </React.Fragment>
        )
    }
}