import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
    return (
        <div style={{display: "flex", padding: "5px 20px"}}>
            <div style={{width: "60%"}}>
                <div>
                    <h3>Legend</h3>
                    <div style={{display: 'flex'}}>
                        <FontAwesomeIcon 
                            icon="plus"
                            color="#28A745"
                            style={{margin: "5px 10px"}}
                        />
                        <p>- Add row/column buttons </p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <FontAwesomeIcon 
                            icon="plus"
                            color="#ACACAC"
                            style={{margin: "5px 10px"}}
                        />
                        <p>- Add image </p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <FontAwesomeIcon 
                            icon="times"
                            color="#FD7E14"
                            style={{margin: "5px 10px"}}
                        />
                        <p>- Remove row/column buttons </p>
                    </div>
                </div>
            </div>
            <div style={{width: "40%"}}>
                <h3>Notes</h3>
                <p style={{fontStyle: "italic"}}>italic text is editable</p>
            </div>
        </div>
    )
}