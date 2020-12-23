import React, { useEffect, useState } from 'react'

export const AdditionalDetailsModal = ({ record }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (record) {
            setShowModal(true)
        }
    }, [record])
    return (
        <div id="myModal" className={`modal ${showModal ? 'show d-block' : 'none'}`} role="dialog" style={{ fontSize: 20, background: "rgba(0,0,0,.45)" }}>
            <div className="modal-dialog" style={{ top: 200 }}>
                <div className="modal-content">
                    <div className="modal-body">
                        {record?.email ?
                            `${(record?.first_name || record?.last_name || "Unknown")}'s email address is ${record?.email}`
                            : `${(record?.first_name || record?.last_name || "Unknown")} has no email address`
                        }
                    </div>
                    <div className="modal-footer" style={{ padding: 0, borderTop: "none" }}>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

