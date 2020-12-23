import { APPEND_NEW_CONTACTS, NEW_CONTACT_LIST } from '_constants/actionTypes'


const appendNewContacts = (data, count) => {
    return { type: APPEND_NEW_CONTACTS, payload: { data, count } }
}

const newContactList = (data, count) => {
    return { type: NEW_CONTACT_LIST, payload: { data, count } }
}

export const contactActions = {
    appendNewContacts, newContactList
}