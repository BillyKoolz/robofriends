import React, {useState, useEffect} from 'react'; 
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './App.css';


function App() {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: '',
    //     }
    // }
    
    const [robots, setRobots] = useState([]);                           //  React Hooks (Lecture 377)
    const [searchfield, setSearchfield] = useState('');                 //  React Hooks (Lecture 377)
    const [count, setCount] = useState(0);
    
    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users=> this.setState({robots: users}))
    // }

    useEffect(() => {                                                   //  React Hooks (Lecture 377)
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users=> setRobots(users))
    }, [count]);                                                             //  Optional second argument with empty list to avoid infinite loop; 
                                                                        //  useEffect now mimics ComponentDidMount
    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }
    
    //const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length ?
        <h1>Loading</h1> :
    (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <button onClick={() => setCount(count+1)} >Click Me!</button>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <CardList robots={filteredRobots}/>
            </Scroll>
        </div>
    );
    
}

export default App