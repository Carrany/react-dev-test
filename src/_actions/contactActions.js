import { APPEND_NEW_CONTACTS, NEW_CONTACT_LIST } from '_constants/actionTypes'


const appendNewContacts = (data) => {
    return { type: APPEND_NEW_CONTACTS, payload: data }
}

const newContactList = (data) => {
    return { type: NEW_CONTACT_LIST, payload: data }
}

export const contactActions = {
    appendNewContacts, newContactList
}