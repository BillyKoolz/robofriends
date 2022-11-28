import React, { Component} from 'react'; 
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './App.css';

import {setSearchField} from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField,            //  Would be searchField: state.searchRobots.searchField, if we had multiple reducers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            //searchfield: '',                                              //  Commented out when implementing Redux (lecture 389) 
        }
    }
    
    
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users=> this.setState({robots: users}))
    }
                                                                        
    
    // const onSearchChange = (event) => {                                  //  Commented out when implementing Redux (lecture 389) 
    //     this.setState({ searchfield: event.target.value})
    // }
    
    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ?
            <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
        );
    }
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App)