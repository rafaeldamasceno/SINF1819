import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SearchableTableCheckbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
        checkedOrders: [],
    };
    this.handleChange = this.handleChange.bind(this);
}
  showHeaders() {
    let children = [];
    let i = 0;
    for (; i < this.props.headers.length-1; i++) {
      children.push(<th>{this.props.headers[i].name}</th>);
    }
    children.push(<th className='text-center'>{this.props.headers[i].name}</th>);
    
    return children
  }

  showRow(row) {
    let children = [];
    if (this.props.options.link)
      children.push(<th scope="row"><Link to={this.props.options.link+"?id=" + row[0]}>{row[0]}</Link></th>);
    let i = 1;
    for (; i < row.length; i++) {
      children.push(<td>{row[i]}</td>);
    }
    children.push(<td className='text-center pl-5'><Input type='checkbox' onChange = {this.handleChange} name = {row[0]}></Input></td>)
    return children
  }

  showTable() {
    let tr = [];
    for (const row of this.props.data) {
      tr.push(<tr>{this.showRow(row)}</tr>);
    }
    
    return tr;
  }

  showSearch() {
    if (this.props.search) {
      if (this.props.search === 'false') {
        return;
      }
    }
    else {
      return (
        <Col xs='0' className='ml-auto'>
          <Input type='text' placeholder='Search'></Input>
        </Col>
      )
    }
  }

  handleChange(event){
     if(event.target.checked){
      let copy = this.state.checkedOrders;
      copy.push(event.target.name);
      this.setState({
        checkedOrders:copy
      })
    }else{
      let copy =  this.state.checkedOrders;
      let index = copy.indexOf(event.target.name);
      if(index > -1){
        copy.splice(index,1);
      }
      this.setState({
        checkedOrders:copy
      })
    }

    this.props.checkedHandler(this.state.checkedOrders);
  }

  render() {
    return (<React.Fragment>
      <Row>
        <Col>
          <h1>{this.props.title}</h1>
        </Col>
        {this.showSearch()}
      </Row>
      <form onSubmit={this.handleSubmit}>
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
      </form>
    </React.Fragment>
    )
  }
}