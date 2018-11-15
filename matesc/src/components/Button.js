import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { loadItems } from '../utils';
import { AppConsumer } from '../App';

class TestButton extends Component {
    render() {
        return (
        <AppConsumer>
            {value => <Button color='primary' onClick={ () => value.authPromise
                .then(loadItems(value.state.authentication)
                    .then(r => r.json())
                    .then(data => value.setState({ items: data }))
                )
            }>load items</Button>}
        </AppConsumer>
        )
    }
}

export default TestButton;