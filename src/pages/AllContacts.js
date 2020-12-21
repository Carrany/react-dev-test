import React from 'react'
import { ContactModal } from '_components'

const AllContacts = (props) => {
    return (
        <div>
            <ContactModal
                modalTitle="All Contacts"
                showAllContacts={true}
                {...props} />

        </div>
    )
}

export default AllContacts
