import request from '_utils/request';
import { CONTACTS } from '_utils/api';

const fetchContacts = (params) => {
    return request.get(CONTACTS, { params })
}


export const contactService = {
    fetchContacts
} 