import React from 'react'
import { ContactModal } from '_components'

const USContacts = (props) => {
    return (
        <div>
            <ContactModal
                modalTitle="US Contacts Only"
                showUSContactsOnly={true}
                {...props} />

        </div>
    )
}

export default USContacts
