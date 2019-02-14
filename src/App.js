import React, { Component } from 'react';
import CalendarContainer from './components/CalendarContainer';
// import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store';

class App extends Component {
	render() {
		return (
			// <div className="app_container">
			<Provider store={store}>
				<CalendarContainer />
			</Provider>
			// </div>
		);
	}
}

export default App;
