import React, { Component } from 'react';
import EventModal from './EventModal';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { connect } from "react-redux";
import { addEvent, deleteEvent, updateEvent } from '../store';
import events from '../seed';

const localizer = BigCalendar.momentLocalizer(moment);


class CalendarContainer extends Component {
	state = {
		modalShow: false,
		events,
		title: '',
		singleEvent: {},
		isUpdated: false
	}
	componentDidMount = () => {
		events.forEach(event => {
			this.props.createEvent(event);
		});
	}

	handleShow = () => {
		this.setState({
			modalShow: true
		});
	}

	// handleSelectSlot = ({ start, end }) => {
	// 	const title = window.prompt('New Event name')
	// 	if (title) {
	// 		this.setState({
	// 			events: [
	// 				...this.state.events,
	// 				{
	// 					start,
	// 					end,
	// 					title,
	// 				},
	// 			],
	// 		});
	// 	}
	// }

	// Closes a bootstrap modal

	modalClose = () => {
		this.setState({
			modalShow: false,
		});
	}

	// Handles a calendar slot when a date selection is made.

	handleSelectSlot = event => {
		this.setState({ singleEvent: event });
		this.handleShow();
	}

	// Since handleChange runs on every keystroke to update the React state,
	// the displayed value will update as the user types.

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	// Handles the submission of the form and has access to the data that the user entered into the form.

	handleSubmit = event => {
		event.preventDefault();
		let singleEvent = {
			...this.state.singleEvent,
			[event.target.title.name]: event.target.title.value
		}
		this.props.createEvent(singleEvent);

		// Clear the state after form submission

		this.setState({
			title: '',
			singleEvent: {},
			isUpdated: false
		});


	}

	handleUpdateSelectedEvent = event => {
		event.preventDefault();
		let singleEvent = {
			...this.state.singleEvent,
			[event.target.title.name]: event.target.title.value
		}
		this.props.updateEvent(singleEvent);

		// Clear the state after form submission

		this.setState({
			title: '',
			singleEvent: {},
			isUpdated: false
		});
	}

	// Handles a selected event when a calendar event is selected.

	handleSelectEvent = event => {
		this.setState({ singleEvent: event, title: event.title, isUpdated: true });
		this.handleShow();
	}

	handleDeleteEvent = () => {
		this.props.removeEvent(this.state.singleEvent.id);
		this.modalClose();
	}


	render() {
		return (
			<React.Fragment>
				<BigCalendar
					selectable
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					events={this.props.events}
					startAccessor="start"
					endAccessor="end"
					style={{ height: "100vh" }}
					// onSelectEvent={event => alert(`${event.title} Start:${event.start} End:${event.end}`)}
					onSelectEvent={this.handleSelectEvent}
					onSelectSlot={this.handleSelectSlot}
				/>
				<EventModal
					title={this.state.title}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					show={this.state.modalShow}
					modalClose={this.modalClose}
					selectedEvent={this.selectedEvent}
					handleUpdateSelectedEvent={this.handleUpdateSelectedEvent}
					isUpdated={this.state.isUpdated}
					handleDeleteEvent={this.handleDeleteEvent}
				/>
			</React.Fragment>

		);
	}
}

const mapStateToProps = state => {
	return {
		events: state.events
	}
};
const mapDispatchToProps = dispatch => {
	return {
		createEvent: event => dispatch(addEvent(event)),
		updateEvent: event => dispatch(updateEvent(event)),
		removeEvent: eventId => dispatch(deleteEvent(eventId))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
