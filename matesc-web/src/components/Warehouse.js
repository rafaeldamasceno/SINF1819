import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button,
} from 'reactstrap';

export default class Warehouse extends Component {
    render() {
        return (
        <Container>
            <Row>
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search all products'></Input>
                </Col>
                < Col >
                    <Button outline color='primary' size='md' className='float-right'>Edit stock</Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1>Items in stock</h1>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">A003</th>
                        <td>Pencil</td>
                        <td>Corridor 2, Shelf 1, L</td>
                        <td>67</td>
                    </tr>
                    <tr>
                        <th scope="row">A004</th>
                        <td>Calculator</td>
                        <td>Corridor 2, Shelf 1, R</td>
                        <td>13</td>
                    </tr>
                    <tr>
                       <th scope="row">A006</th>
                        <td>Stapler</td>
                        <td>Corridor 3, Shelf 2, L</td>
                        <td>53</td>
                    </tr>
                </tbody>
            </Table>

            <Row>
                <Col>
                    <h1>Out of stock items</h1>
                </Col>
            </Row>
            <Table id='table-out-of-stock-items'>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">A007</th>
                        <td>Pen</td>
                        <td>Corridor 5, Shelf 1, R</td>
                    </tr>
                    <tr>
                        <th scope="row">A008</th>
                        <td>Notebook</td>
                        <td>Corridor 1, Shelf 1, L</td>
                    </tr>
                </tbody>
            </Table>
            <Button outline color='primary' size='lg' className='float-right'>Order stock</Button>
        </Container>)
    }
}