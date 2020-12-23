import { APPEND_NEW_CONTACTS, NEW_CONTACT_LIST } from '_constants/actionTypes';


const initialState = {
    contacts: []
}

function contactsReducer(state = initialState, { type, payload }) {

    switch (type) {
        case NEW_CONTACT_LIST:
            return {
                ...state,
                contacts: payload
            }
        case APPEND_NEW_CONTACTS:
            return {
                ...state,
                contacts: [...state.contacts, ...payload]
            }


        default:
            return state;
    }

}

export default contactsReducer