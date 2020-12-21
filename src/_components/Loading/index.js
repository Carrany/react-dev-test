import React from "react";
import { HashLoader } from 'react-spinners'


export const LazyLoading = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                minHeight: 545,
                alignItems: "center",
            }}>
            <HashLoader
                size={50}
                color="#36D7B7"
                margin={2}
            />
        </div>
    )
}
