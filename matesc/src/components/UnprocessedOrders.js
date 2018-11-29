import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class UnprocessedOrders extends Component {
    render() {
        return (<Container>
            <Row>
                <Col>
                    <h1>Client Orders</h1>
                </Col>
                <Col xs='0' className='ml-auto'>
                    <Input type='text' placeholder='Search'></Input>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Client</th>
                        <th>Deadline</th>
                        <th className='text-center'>Include</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th scope="row"><Link to='/order-content'>36272</Link></th>
                        <td>Bertrand NorteShopping</td>
                        <td>21/02/2019</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                    <tr>
                        <th scope = "row"><Link to='/order-content'>62378</Link></th>
                        <td>FNAC Braga</td>
                        <td>12/03/2019</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                    <tr>
                        <th scope = "row"><Link to='/order-content'>62153</Link></th>
                        <td>Papelaria Mundo</td>
                        <td>30/01/2019</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                </tbody>
            </Table>
            <Link to='/picking-list'><Button outline color='primary' size='lg' className='float-right'>Create picking wave</Button></Link>
        </Container>)
    }
}