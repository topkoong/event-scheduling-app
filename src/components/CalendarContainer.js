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
		from: undefined,
		to: undefined,
		singleEvent: {},
		isUpdated: false
	}

	// componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
	// Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, 
	// this is a good place to instantiate the network request.

	componentDidMount = () => {

		// Populating the event with dummy data

		events.forEach(event => {
			this.props.createEvent(event);
		});
	}

	// Clear the local state

	clearState = () => {
		this.setState({
			title: '',
			singleEvent: {},
			isUpdated: false,
			from: undefined,
			to: undefined,
			modalShow: false
		});
	}

	// Opens a bootstrap modal

	handleShow = () => {
		this.setState({
			modalShow: true
		});
	}

	// Closes a bootstrap modal

	modalClose = () => {
		this.setState({
			modalShow: false
		});
	}

	// Handles a calendar slot when a date selection is made.

	handleSelectSlot = event => {
		this.setState({ singleEvent: event, from: event.start });
		this.handleShow();
	}

	// Since handleChange runs on every keystroke to update the React state,
	// the displayed value will update as the user types.

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}


	// Handles selecting a range of days (Start date)

	handleFromChange = from => {
		// Change the from date and focus the "to" input field
		this.setState({ from });
	}

	// Handles selecting a range of days  (End date)
	handleToChange = to => {
		this.setState({ to });
	}

	// Handles the submission of the form and has access to the data that the user entered into the form.

	handleSubmit = event => {
		event.preventDefault();
		let singleEvent = {
			...this.state.singleEvent,
			[event.target.title.name]: event.target.title.value,
			start: this.state.from,
			end: this.state.to
		}
		this.props.createEvent(singleEvent);

		// Clear the state after form submission
		this.clearState();
	}


	handleUpdateSelectedEvent = event => {
		event.preventDefault();
		let singleEvent = {
			...this.state.singleEvent,
			[event.target.title.name]: event.target.title.value,
			start: this.state.from,
			end: this.state.to
		}
		this.props.updateEvent(singleEvent);

		// Clear the state after form submission
		this.clearState();

	}

	// Handles a selected event when a calendar event is selected.

	handleSelectEvent = event => {
		this.setState({ singleEvent: event, title: event.title, isUpdated: true, from: event.start, to: event.end });
		this.handleShow();
	}

	handleDeleteEvent = () => {
		this.props.removeEvent(this.state.singleEvent.id);
		this.modalClose();
		// Clear the state after form submission
		this.clearState();
	}





	render() {
		const { title, modalShow, isUpdated, from, to } = this.state;
		const modifiers = { start: from, end: to };
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
					title={title}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					show={modalShow}
					modalClose={this.modalClose}
					selectedEvent={this.selectedEvent}
					handleUpdateSelectedEvent={this.handleUpdateSelectedEvent}
					isUpdated={isUpdated}
					handleDeleteEvent={this.handleDeleteEvent}
					handleFromChange={this.handleFromChange}
					handleToChange={this.handleToChange}
					modifiers={modifiers}
					from={from}
					to={to}
					clearState={this.clearState}
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
