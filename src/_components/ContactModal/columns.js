export const contactColumns = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name"
    },
    {
        title: "Last Name",
        dataIndex: "last_name",
        key: "last_name",
    },
    {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (text) => text.iso
    },
]