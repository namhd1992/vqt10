import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import 'bootstrap/dist/css/bootstrap.min.css';


const theme = createMuiTheme({
	palette: {
    type: 'dark',
    // background: {default:"#fff"},
		primary: { main: "#fff" },
		secondary: { main: "#23c9b6" },
		error: { main: red[500] },
		success: { main: green[500] },
		grey: { main: grey[500] },
	},
});

const target = document.querySelector('#root')

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MuiThemeProvider theme={theme} >
				<div>
					<App />
				</div>
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,
	target
)