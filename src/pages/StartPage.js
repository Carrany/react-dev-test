import React from 'react'

const StartPage = (props) => {
    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-50px",
        }}>
            <div>
                <button
                    style={{ background: "#46139f" }}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => props.history.push("/all-contacts")}
                >Button A</button>

            </div>
            <br />
            <div>
                <button
                    style={{ background: "#ff7f50" }}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => props.history.push("/us-contacts")}
                >Button A</button>

            </div>

        </div >
    )
}

export default StartPage
