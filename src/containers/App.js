import React, { Component} from 'react'; 
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './App.css';

import {setSearchField, requestRobots} from '../actions';
//import { requestRobots } from '../reducers';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,            //  Would be searchField: state.searchRobots.searchField, if we had multiple reducers
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots()),
    }
}

class App extends Component {    
    
    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then(users=> this.setState({robots: users}))
        this.props.onRequestRobots();
    }
                                                                        
    
    // const onSearchChange = (event) => {                                  //  Commented out when implementing Redux (lecture 389) 
    //     this.setState({ searchfield: event.target.value})
    // }
    
    render() {
        //const { robots } = this.state;
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return isPending ?
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