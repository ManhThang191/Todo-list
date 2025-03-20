import React from 'react'
import { useState, useEffect } from 'react'
import {ClockCircleOutlined, RedoOutlined} from '@ant-design/icons'

function Clock() {
    const [time, setTime] = useState(new Date());
    const [is12HourFormat, setIs12HoutFormat] = useState(true)


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = () => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let amPm = "AM";

        if (is12HourFormat) {
            amPm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // Chuyển 0 thành 12
        }

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${is12HourFormat ? amPm : ""
            }`;
    };



    return (
        <>
            <div  style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{
                    fontSize: "20px",
                    fontFamily: "monospace",
                    border : "12px solid #335",
                    padding: "5px",
                    borderRadius: "20px",
                    background: "#333",
                    color: "yellow",
                    minWidth : "40%",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <ClockCircleOutlined style={{
                        marginRight: "10px"
                    }}/>

                    {formatTime()}

                    <RedoOutlined onClick={() => setIs12HoutFormat(!is12HourFormat)}
                        style={{
                            marginLeft: "10px"
                        }}    
                    />
                </div>
                {/* <button onClick={() => setIs12HoutFormat(!is12HourFormat)}
                    style={{
                        border: "none",
                        padding: "20px 40px",
                        fontSize: "30px",
                        borderRadius: "20px",
                        color: "yellow",
                        background: "#335",
                        margin: "50px"
                    }}
                >
                    Chuyển đổi {is12HourFormat ? "24h" : "12h"}
                </button> */}
            </div>
        </>
    )
}

export default Clock