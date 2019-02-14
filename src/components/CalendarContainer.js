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
		singleEvent: {}
	}
	componentDidMount = () => {
		events.forEach(event => {
			this.props.createEvent(event);
		});
	}
	
	handleShow = () => {
		this.setState({ modalShow: true });
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

	modalClose = () => {
		this.setState({
			modalShow: false
		});
	}

	toggle = () => {
		this.setState(prevState => ({
			modalShow: !prevState.modalShow
		}));
	}

	handleSelectSlot = event => {
		this.setState({singleEvent: event});
		this.handleShow();
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit = event => {
		event.preventDefault();
		let singleEvent = {
			...this.state.singleEvent,
			[event.target.title.name]: event.target.title.value}
		this.setState({singleEvent});
		this.props.createEvent(singleEvent)

	}


	render() {
		return (
			<div>
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
					onSelectSlot={this.handleSelectSlot}
				/>
				<EventModal title={this.state.title} handleChange={this.handleChange} handleSubmit={this.handleSubmit} show={this.state.modalShow} toggle={this.toggle} />
			</div>

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
