/**
 * INITIAL STATE
 */
// const initialState = {
//     events: []
// }


// ------------------ Action Types ---------------------
// =====================================================
// =====================================================

// const GET_EVENTS = 'GET_EVENTS';
// const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT';
const ADD_EVENT = 'ADD_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

// ------------------ Action Creators ------------------
// =====================================================
// =====================================================

// export const gotEvents = events => ({
//     type: GET_EVENTS,
//     events
// });

// export const gotSingleEvent = events => {
//     return {
//         type: GET_SINGLE_EVENT
//     }
// }

export const addEvent = event => ({
    type: ADD_EVENT,
    event
});

export const updateEvent = event => ({
    type: UPDATE_EVENT,
    event
});

export const deleteEvent = eventId => ({
    type: DELETE_EVENT,
    eventId
})


/**
 * REDUCER
 */

export default function (events = [], action) {
    switch (action.type) {
        // case GET_EVENTS:
        //     return action.events;
        case ADD_EVENT:
            return [...events, action.event]
        case UPDATE_EVENT:
            return events.map(event => (
                action.event.id === event.id ? action.event : event
            ));
        case DELETE_EVENT:
            return events.filter(event => event.id !== action.eventId);
        default:
            return events;
    }
}