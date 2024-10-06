import React from 'react';
import { getElapsedTime } from '../utils/utils';

const TimeLineItem = ({id, date, user, text, haveMarker = false, markerColor = "bg-green"}) => {
    return (
        <div key={`timeline-key-${id}`} id={`timeline-item-${id}`} className="timeline-item">
            <div className="timeline-item-marker" id={`timeline-marker-${id}`}>
                <div className="timeline-item-marker-text" id={`timeline-marker-text-${id}`}>{getElapsedTime(date)}</div>
                {haveMarker && <div className={`timeline-item-marker-indicator ${markerColor}`} id={`timeline-marker-indicator-${id}`}></div>}
            </div>
            <div className="timeline-item-content" id={`timeline-item-content-${id}`}>
                <b>{user}</b>: {text}
            </div>
        </div>
    )
};

export default TimeLineItem;