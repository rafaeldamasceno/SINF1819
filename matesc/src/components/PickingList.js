import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button
} from 'reactstrap';

class PickingList extends Component {
    render() {
        return (<Container>
            <Row>
                <Col>
                    <h1>Picking list</h1>
                </Col>
                <Col xs='1' className='ml-auto mr-2'>
                   <Button><i class="fas fa-print"></i> Print</Button>
                </Col>
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search'></Input>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th className='text-center'>Picked</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">32372</th>
                        <td>A001</td>
                        <td>Binder</td>
                        <td>Corridor 1, Shelf 2, L</td>
                        <td>153</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                    <tr>
                        <th scope="row">31471</th>
                        <td>A003</td>
                        <td>Stapler</td>
                        <td>Corridor 3, Shelf 2, L</td>
                        <td>53</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                    <tr>
                        <th scope="row">12345</th>
                        <td>A004</td>
                        <td>Calculator</td>
                        <td>Corridor 2, Shelf 1, R</td>
                        <td>13</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Button outline color='primary' className='float-right ml-auto mb-2'>Check all</Button>
            </Row>
            <Row>
                <Button outline color='success' size='lg' className='float-right ml-auto'>Complete picking</Button>
            </Row>
        </Container>)
    }
}

export default PickingList;