import { useEffect, useState } from "react"
import styled from "styled-components";
import { contactService } from "_services";
import { contactColumns } from "./columns";
import { debounce } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { TableLoading } from "_components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "_actions";
import { createSelector } from 'reselect';
import { AdditionalDetailsModal } from "./AdditionalDetailsModal";

export const ContactModal = ({
    showAllContacts = false,
    showUSContactsOnly = false,
    modalTitle = "",
    ...props

}) => {

    const [isLoading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({ page: 1 })
    const [scroll, setScroll] = useState(false)
    const [showEven, setShowEven] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const dispatch = useDispatch();
    const selectContacts = state => state.contact.contacts
    const selectTotal = state => state.contact.total

    const selectEvenContacts = createSelector(
        [selectContacts],
        (allContacts) => allContacts.filter(c => c.id % 2 === 0)
    )

    const contacts = useSelector(selectContacts);
    const evenContacts = useSelector(selectEvenContacts);
    const total = useSelector(selectTotal)

    // Check if scroll is at the bottom
    const onScroll = (tableContent) => {
        const bottom = tableContent.scrollTop === (tableContent.scrollHeight - tableContent.clientHeight);
        if (bottom) {
            setIsBottom(true);
        }
    }


    useEffect(() => {
        let countryId = showAllContacts ? null :
            showUSContactsOnly && !showAllContacts ? 226
                : null
        let params = {
            ...searchParams,
            companyId: 171,
            countryId
        }
        getContacts(params)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, showUSContactsOnly, showAllContacts])

    const getContacts = async (params) => {
        setLoading(true)
        try {
            let response = await contactService.fetchContacts(params)
            let data = response?.data || null
            let content = (data?.contacts || [])
            let nContacts = [];
            for (const contact in content) {
                nContacts.push(content[contact])
            }

            if (scroll) {
                dispatch(contactActions.appendNewContacts(nContacts, data?.total))
            } else {
                dispatch(contactActions.newContactList(nContacts, data?.total))

            }
            setLoading(false)
            setScroll(false)
            setIsBottom(false);

        } catch (error) {
            setLoading(false)
            setScroll(false)
            setIsBottom(false);
        }
    }

    useEffect(() => {
        if (!isBottom) return
        handleInfiniteOnLoad()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottom])

    // Perform infinite scroll
    const handleInfiniteOnLoad = () => {

        setScroll(true)
        if (contacts.length === total)
            return (
                setScroll(false)
            )
        let params = {
            ...searchParams,
            page: searchParams.page + 1
        }
        setSearchParams(params)
    }

    // Search api via query
    const handleSearch = debounce((value) => {
        let params = {
            ...searchParams,
            page: 1,
            query: value || null
        }
        // Scroll to top to avoid scrollbar being at the bottom
        // Happens when contacts length is less than the previous
        dispatch(contactActions.newContactList([], 0))
        setSearchParams(params)
    }, 500)

    const navigate = (url) => {
        props.history.push(url)
    }

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "grey" }}>
            <div className="modal-dialog" style={{ maxWidth: 700 }}>
                <AdditionalDetailsModal record={selectedRecord} />
                <div className="modal-content" style={{ padding: 16 }}>
                    <div className="container">
                        <div className="row">
                            <StyledNavButton
                                className="btn btn-primary"
                                type="button"
                                onClick={() => navigate("/all-contacts")}
                                color="#46139f"
                            >All Contacts</StyledNavButton>

                            <StyledNavButton
                                className="btn btn-primary"
                                type="button"
                                onClick={() => navigate("/us-contacts")}
                                color="#ff7f50"
                            >US Contacts</StyledNavButton>

                            <StyledNavButton
                                className="btn"
                                type="button"
                                onClick={() => navigate("/")}
                                style={{ right: 25, position: "absolute", borderColor: "#46139f" }}
                            >Close</StyledNavButton>
                        </div>
                    </div>

                    <StyledPageHeader >{modalTitle}</StyledPageHeader>

                    <input type="text" className="form-control" placeholder="Search by name or phone number" onChange={(e) => handleSearch(e.target.value)} />
                    <br />

                    <div >
                        {isLoading && (<TableLoading />)}
                        <Scrollbars id="scroll-bar" style={{ height: 350 }} onScrollFrame={onScroll}>
                            <table className="table" id="table-scroll">
                                <thead className="thead-light" >
                                    <tr>
                                        {contactColumns.map(col =>
                                            <th key={col.key}>{col.title}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(showEven ? evenContacts : contacts).map(contact =>
                                        <tr key={contact?.id} onClick={() => setSelectedRecord(contact)}>
                                            <td>{contact?.id}</td>
                                            <td>{contact?.first_name}</td>
                                            <td>{contact?.last_name}</td>
                                            <td>{contact?.phone_number}</td>
                                            <td>{contact?.country?.iso}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Scrollbars>
                    </div>

                    <div className="modal-footer">
                        <span style={{ marginRight: 480 }}>Page: {searchParams?.page}</span>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" checked={showEven} onChange={(e) => setShowEven(e.target.checked)} />Only Even
                        </label>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

const StyledNavButton = styled.button`
 margin-left: 10px;
 background:${props => props.color}
    `
const StyledPageHeader = styled.div`
padding-bottom: 5px;
padding-top: 5px;
font-weight: 600;
font-size: 20px;
    `
