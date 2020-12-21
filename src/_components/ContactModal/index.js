import { Button, Input, message, Modal, PageHeader, Row, Table } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components";
import { contactService } from "_services";
import { contactColumns } from "./columns";
import { throttle, debounce } from 'lodash';
import Checkbox from "antd/lib/checkbox/Checkbox";

export const ContactModal = ({
    showAllContacts = false,
    showUSContactsOnly = false,
    modalTitle = "",
    ...props

}) => {

    const [contacts, setContacts] = useState([]);
    const [total_elements, setTotalElements] = useState(20)
    const [isLoading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({ page: 1 })
    const [scroll, setScroll] = useState(false)
    const [showEven, setShowEven] = useState(false);
    const [evenContacts, setEvenContacts] = useState([]);
    const [isBottom, setIsBottom] = useState(false)


    useEffect(() => {
        var tableContent = document.querySelector('.table-scroll .ant-table-body')
        tableContent.addEventListener('scroll', throttle(() => onScroll(tableContent), 300))
        return () => {
            tableContent.removeEventListener('scroll', () => onScroll(tableContent))
        }
    }, [])

    // Check if scroll is at the bottom
    const onScroll = (tableContent) => {

        const bottom = tableContent.scrollTop === (tableContent.scrollHeight - tableContent.offsetHeight);
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


            setContacts([...(scroll ? contacts : []), ...nContacts])
            setTotalElements(data?.total)
            setLoading(false)
            setScroll(false)
            setIsBottom(false);

        } catch (error) {
            setLoading(false)
            setScroll(false)
            setIsBottom(false);
        }
    }

    // Toggle between even and all contacts without affecting the initial contact array
    useEffect(() => {
        handleEven(showEven, contacts)
    }, [showEven, contacts])

    const handleEven = (nShowEven, nContacts) => {
        if (!nShowEven) return setEvenContacts([])
        let data = [];
        [...nContacts].forEach(c => {
            if (c.id % 2 === 0) {
                data.push(c)
            }

        })
        setEvenContacts(data);
    }

    useEffect(() => {
        if (!isBottom) return
        handleInfiniteOnLoad()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottom])

    // Perform infinite scroll

    const handleInfiniteOnLoad = () => {

        setScroll(true)

        if (contacts.length === total_elements)
            return (
                message.info("All contacts loaded"),
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

        var tableContent = document.querySelector('.table-scroll .ant-table-body')
        tableContent.scrollTo(0, 0);

        setSearchParams(params)

    }, 500)


    // Modal C to show extra contact details

    const showContactDetails = (record) => {
        Modal.info({
            content: <div style={{ fontSize: 16, fontWeight: 600 }}>

                {record?.email ?
                    `${(record?.first_name || record?.last_name || "Unknown")}'s email address is ${record?.email}`
                    : `${(record?.first_name || record?.last_name || "Unknown")} has no email address`
                }
            </div>
        })
    }



    const navigate = (url) => {
        props.history.push(url)
    }



    return (
        <Modal
            visible={true}
            width={700}
            closable={false}
            style={{ top: 30 }}
            footer={
                <div>
                    <span style={{ float: 'left' }}>Page: {searchParams?.page}</span>
                    <Checkbox checked={showEven} onChange={(e) => setShowEven(e.target.checked)}>Only even</Checkbox>
                </div>
            }
        >

            <Row >
                <StyledNavButton
                    onClick={() => navigate("/all-contacts")}
                    type="primary"
                    color="#46139f"

                >All Contacts</StyledNavButton>

                <StyledNavButton
                    type="primary"
                    onClick={() => navigate("/us-contacts")}
                    color="#ff7f50"
                >US Contacts</StyledNavButton>

                <StyledNavButton
                    onClick={() => navigate("/")}
                    style={{ right: 25, position: "absolute", borderColor: "#46139f" }}
                    type="default"
                >Close</StyledNavButton>
            </Row>
            <PageHeader style={{ paddingBottom: 5, paddingTop: 5 }} title={modalTitle} />

            <Input.Search placeholder="Search by name or phone number" onChange={(e) => handleSearch(e.target.value)} />
            <br />
            <br />


            <Table
                className="table-scroll"
                columns={contactColumns}
                dataSource={showEven ? evenContacts : contacts}
                size="small"
                loading={isLoading}
                rowKey={data => data.id}
                pagination={false}
                scroll={{ y: 300, scrollToFirstRowOnChange: false }}
                onRow={(record) => {
                    return {
                        onClick: () => showContactDetails(record)
                    }
                }}
            />


        </Modal>
    )
}


const StyledNavButton = styled(Button)`
 margin-left: 10px;
 background:${props => props.color}
    `