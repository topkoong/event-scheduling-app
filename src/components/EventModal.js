import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';


const EventModal = ({ handleChange, handleSubmit, show, modalClose, title, handleUpdateSelectedEvent, isUpdated, handleDeleteEvent }) => {

	// Inline If-Else with Conditional Operator
	// Another method for conditionally rendering elements inline is
	// to use the JavaScript conditional operator condition ? true : false.
	return (
		<React.Fragment>
			{isUpdated ? (
				<Modal show={show} onHide={modalClose}>
					<Modal.Header closeButton>Update an event</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleUpdateSelectedEvent}>
							<Form.Group>
								<Form.Label className="mr-5" for="title">Event Title</Form.Label>
								<input type="text" name="title" id="title" placeholder="Please enter event title" onChange={handleChange} value={title} />
							</Form.Group>
							<Button variant="primary" type="submit" onClick={modalClose} className="mr-5">Save Changes</Button>
							<Button variant="danger" className="mr-5" onClick={handleDeleteEvent}>Delete this event</Button>
							<Button variant="secondary" onClick={modalClose}>Cancel</Button>
							
						</Form>
					</Modal.Body>
				</Modal>
			) : (
					<Modal show={show} onHide={modalClose}>
						<Modal.Header closeButton>Create a new event</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label className="mr-5" for="title">Event Title</Form.Label>
									<input type="text" name="title" id="title" placeholder="Please enter event title" onChange={handleChange} value={title} />
								</Form.Group>
								<Button variant="primary" type="submit" onClick={modalClose} className="mr-5">Add new event</Button>
								<Button variant="secondary" onClick={modalClose}>Cancel</Button>
							</Form>
						</Modal.Body>
					</Modal>

			)}
		</React.Fragment>
	);
}

export default EventModal;
