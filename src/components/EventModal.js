import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


const EventModal = ({ handleChange, handleSubmit, show, toggle, title }) => {
	return (
		<Modal isOpen={show} toggle={toggle}>
			<ModalHeader toggle={toggle}>Create a new event</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for="title">Event Title</Label>
						<Input type="text" name="title" id="title" placeholder="Enter event title" onChange={handleChange} value={title} />
					</FormGroup>
					<Button color="primary" type="submit" onClick={toggle} className="mr-5">Save Changes</Button>
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
}

export default EventModal;
