import { APPEND_NEW_CONTACTS, NEW_CONTACT_LIST } from '_constants/actionTypes';


const initialState = {
    contacts: [],
    total: 0
}

function contactsReducer(state = initialState, { type, payload }) {

    switch (type) {
        case NEW_CONTACT_LIST:

            return {
                ...state,
                contacts: payload?.data,
                total: payload?.count
            }
        case APPEND_NEW_CONTACTS:
            return {
                ...state,
                contacts: [...state.contacts, ...payload?.data],
                total: payload?.count
            }


        default:
            return state;
    }

}

export default contactsReducer