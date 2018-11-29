import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button,
} from 'reactstrap';

class OrderContent extends Component {
    render() {
        return (<Container>

            <Row>
                <Col>
                    <h1>Order info</h1>
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
                    67326

                </p>
                <p>
                    <span class='font-weight-bold mr-1'>
                        ID:
                    </span>
                    67326
                </p>
                <p>
                    <span class='font-weight-bold mr-1'>
                        ID:
                    </span>
                    67326
                </p>
                <p>
                    <span class='font-weight-bold mr-1'>
                        ID:
                    </span>
                    67326
                </p>
            </div>


            <Row>
                <Col>
                    <h1>Items in order</h1>
                </Col>
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search'></Input>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Location</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">A001</th>
                        <td>Binder</td>
                        <td>Corridor 1, Shelf 2, L</td>
                        <td>153</td>
                    </tr>
                    <tr>
                        <th scope="row">A002</th>
                        <td>Crayons</td>
                        <td>Corridor 3, Shelf 1, L</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <th scope="row">A004</th>
                        <td>Calculator</td>
                        <td>Corridor 2, Shelf 1, R</td>
                        <td>13</td>
                    </tr>
                </tbody>
            </Table>
        </Container>)
    }
}

export default OrderContent;