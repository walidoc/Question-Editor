import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ columns, rows, loading }) => {
    const nbRows = rows.length
    const nbColumns = columns.length
    let nbImages = 0
    let longRowLabel = 0
    let longColLabel = 0

    columns.forEach(col => {
        if (col.img.includes('uploads')) nbImages++
        if (col.label.length > longColLabel) longColLabel = col.label.length
    })

    rows.forEach(row => {
        if (row.img.includes('uploads')) nbImages++
        if (row.label.length > longRowLabel) longRowLabel = row.label.length
    })

    return (
            <div className="summary">
                {loading ? (
                    <div className="spinner">
                        <FontAwesomeIcon
                          icon="spinner"
                          spin
                          style={{ fontSize: '50px' }}
                          color="#1AA3DD"
                        />
                    </div>
                ) : (
                    <div>
                        <h5>Summary</h5>
                        <p>Number of rows: { nbRows} </p>
                        <p>Number of columns: { nbColumns} </p>
                        <p>Number of images uploaded: { nbImages} </p>
                        <p>Longest row label: { longRowLabel} </p>
                        <p>Longest column label: { longColLabel} </p>
                    </div>
                )}
            </div>
        )
}
