import React from "react";
import { Spinner } from "react-bootstrap";

const div = {
    width: '100px',
    height: '100px'
}

const Loading = () => {
    return (
        <div className="text-center">
            <Spinner style={div} className="mt-4" animation="border" size="lg" />
        </div>
    )
}

export default Loading;