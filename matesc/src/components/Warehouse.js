import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button,
} from 'reactstrap';

class Warehouse extends Component {
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
                        <th>Order ID</th>
                        <th>Client</th>
                        <th>Deadline</th>
                        <th className='text-center'>Exclude</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">36272</th>
                        <td>Bertrand NorteShopping</td>
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

            <Row>
                <Col>
                    <h1>Items in stock</h1>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Client</th>
                        <th>Deadline</th>
                        <th className='text-center'>Exclude</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">36272</th>
                        <td>Bertrand NorteShopping</td>
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

export default Warehouse;