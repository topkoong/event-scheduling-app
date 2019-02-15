import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

const EventModal = ({
	handleChange,
	handleSubmit,
	show,
	modalClose,
	title,
	handleUpdateSelectedEvent,
	isUpdated,
	handleDeleteEvent,
	handleFromChange,
	handleToChange,
	from,
	to,
	modifiers,
	clearState }) => {

	// isUpdated - Inline If-Else with Conditional Operator
	// Another method for conditionally rendering elements inline is
	// to use the JavaScript conditional operator condition ? true : false.
	return (
		<React.Fragment>
			{isUpdated ? (
				<Modal show={show} onHide={modalClose} size="lg">
					<Modal.Header closeButton>Update an event</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleUpdateSelectedEvent} validated={true}>
							<Form.Group>
								<Form.Label className="mr-5" htmlFor="title">Event Title</Form.Label>
								<Form.Control
									name="title"
									id="title"
									required
									type="text"
									placeholder="Please enter event title"
									onChange={handleChange}
									value={title}
								/>
								{
									title.length === 0 ? (
										<Form.Control.Feedback type="invalid">
											Please enter event title
											</Form.Control.Feedback>
									) :
										null
								}
								<div className="InputFromTo">
									<DayPickerInput
										value={from}
										placeholder="From"
										format="LL"
										formatDate={formatDate}
										parseDate={parseDate}
										dayPickerProps={{
											selectedDays: [from, { from, to }],
											disabledDays: { after: to },
											toMonth: to,
											modifiers,
											numberOfMonths: 2,
											onDayClick: () => to.getInput().focus(),
										}}
										onDayChange={handleFromChange}
									/>{' '}
									—{' '}
									<span className="InputFromTo-to">
										<DayPickerInput
											ref={el => (to = el)}
											value={to}
											placeholder="To"
											format="LL"
											formatDate={formatDate}
											parseDate={parseDate}
											dayPickerProps={{
												selectedDays: [from, { from, to }],
												disabledDays: { before: from },
												modifiers,
												month: from,
												fromMonth: from,
												numberOfMonths: 2,
											}}
											onDayChange={handleToChange}
										/>
									</span>
								</div>
							</Form.Group>
							<Button variant="primary" type="submit" onClick={modalClose} className="mr-5" disabled={title.length === 0}>Save Changes</Button>
							<Button variant="danger" className="mr-5" onClick={handleDeleteEvent}>Delete this event</Button>
							<Button variant="secondary" onClick={clearState}>Cancel</Button>

						</Form>
					</Modal.Body>
				</Modal>
			) : (
					<Modal show={show} onHide={modalClose} size="lg">
						<Modal.Header closeButton>Create a new event</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleSubmit} validated={true}>
								<Form.Group>
									<Form.Label className="mr-5" for="title">Event Title</Form.Label>
									<Form.Control
										name="title"
										id="title"
										required
										type="text"
										placeholder="Please enter event title"
										onChange={handleChange}
										value={title}
									/>
									{
										title.length === 0 ? (
											<Form.Control.Feedback type="invalid">
												Please enter event title
											</Form.Control.Feedback>
										) :
											null
									}

									<div className="InputFromTo">
										<DayPickerInput
											value={from}
											placeholder="From"
											format="LL"
											formatDate={formatDate}
											parseDate={parseDate}
											dayPickerProps={{
												selectedDays: [from, { from, to }],
												disabledDays: { after: to },
												toMonth: to,
												modifiers,
												numberOfMonths: 2,
												onDayClick: () => to.getInput().focus(),
											}}
											onDayChange={handleFromChange}
										/>{' '}
										—{' '}
										<span className="InputFromTo-to">
											<DayPickerInput
												ref={el => (to = el)}
												value={to}
												placeholder="To"
												format="LL"
												formatDate={formatDate}
												parseDate={parseDate}
												dayPickerProps={{
													selectedDays: [from, { from, to }],
													disabledDays: { before: from },
													modifiers,
													month: from,
													fromMonth: from,
													numberOfMonths: 2,
												}}
												onDayChange={handleToChange}
											/>
										</span>
									</div>
								</Form.Group>
								<Button variant="primary" type="submit" onClick={modalClose} className="mr-5" disabled={title.length === 0}>Add new event</Button>
								<Button variant="secondary" onClick={modalClose}>Cancel</Button>
							</Form>
						</Modal.Body>
					</Modal>

				)}
		</React.Fragment>
	);
}

export default EventModal;
