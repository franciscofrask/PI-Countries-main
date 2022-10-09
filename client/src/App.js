import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Details/index';
import CreateActivity from './components/CreateActivity';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
       <Switch>
        <Route exact path={"/"} component={LandingPage}/>
        <Route path={"/countries"} component={Home}/>
        <Route path={"/details/:id"} component={Detail} />
        <Route path={"/activity"} component={CreateActivity} />
       </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
