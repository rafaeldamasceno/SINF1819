import React, { Component } from 'react';
import {
    Row,
    Col,
    Input,
    Table,
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
        children.push(<th scope="row"><Link to='/order-content'>{row[0]}</Link></th>)
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

    render() {
        return (<React.Fragment>
            <Row>
                <Col>
                    <h1>{this.props.title}</h1>
                </Col>
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search'></Input>
                </Col>
            </Row>
            <Table>
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