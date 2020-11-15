import './App.css';
import {Route, Switch} from 'react-router-dom';
import Information from "./components/Information";

function App(props) {

    const {url} = props;

  return (
    <div className="App">
        <Switch>
            <Route path="/"
                render={() => <Information url={url}/>}/>
        </Switch>
    </div>
  );
}

export default App;
