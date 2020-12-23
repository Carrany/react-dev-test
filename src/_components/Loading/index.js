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

export const TableLoading = () => {
    return (
        <div
            style={{
                position: "absolute",
                zIndex: 4,
                maxHeight: 545,
                left: 0,
                top: 0,
                display: "block",
                height: "100%",
                width: "100%",
                background: "rgba(255, 255, 255, 0.5)"


            }}>

            <div style={{ top: "50%", left: "50%", position: "absolute" }}>
                <HashLoader
                    size={50}
                    color="#36D7B7"
                    margin={2}
                />
            </div>
        </div>
    )
}