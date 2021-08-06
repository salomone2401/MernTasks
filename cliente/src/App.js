import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';
import store from './store';
import { Provider } from 'react-redux';
// Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
	tokenAuth(token);
}

function App() {
	return (
		<Router>
			<Provider store={store}>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/nueva-cuenta' component={NuevaCuenta} />
					<RutaPrivada exact path='/proyectos' component={Proyectos} />
				</Switch>
			</Provider>
		</Router>
	);
}

export default App;
