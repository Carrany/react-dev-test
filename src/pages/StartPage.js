import { Button } from 'antd';
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
            <div >
                <Button
                    onClick={() => props.history.push("/all-contacts")}
                    type="primary"
                    style={{ background: "#46139f" }}
                >Button A
                </Button>

            </div>
            <br />
            <div>
                <Button 
                onClick={() => props.history.push("/us-contacts")} 
                type="primary"
                style={{ background: "#ff7f50" }}
                >Button B</Button>
            </div>

        </div >
    )
}

export default StartPage
