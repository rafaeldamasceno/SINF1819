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
    showHeaders(){      
        let children =[];
        for (const header of this.props.headers) {            
            children.push(<th>{header.name}</th>);
        } 
        return children
    }

    showRow(row) {
        let children = [];
        if(this.props.options.link)
            children.push(<th scope="row"><Link to='/client-order-content'>{row[0]}</Link></th>)
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

    showSearch(){
        if(this.props.options.search){
            return (
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search'></Input>
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
        console.log(this.props.options);
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