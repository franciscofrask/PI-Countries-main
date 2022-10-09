import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //Permite escribir funciones con lógica interna que pueden interactuar con los métodos dispatch y store de Redux
import rootReducer from '../reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default  store;