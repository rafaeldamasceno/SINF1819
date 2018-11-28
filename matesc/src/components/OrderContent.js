import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button
} from 'reactstrap';

class OrderContent extends Component {
    render() {
        return (<Container>
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
                        <th>Category</th>
                        <th>Location</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">A001</th>
                        <td></td>
                        <td>21/02/2019</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                    <tr>
                        <th scope="row">62378</th>
                        <td>FNAC Braga</td>
                        <td>12/03/2019</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                    <tr>
                        <th scope="row">62153</th>
                        <td>Papelaria Mundo</td>
                        <td>30/01/2019</td>
                        <td className='text-center pl-5'><Input type='checkbox'></Input></td>
                    </tr>
                </tbody>
            </Table>
            <Button outline color='primary' size='lg' className='float-right'>Create picking wave</Button>
        </Container>)
    }
}

export default OrderContent;