import React from "react";
import moment from 'moment-timezone';

export default function Card({title, imageUrl, lastUpdate}) {
    
    return (
        <div className="Card">
            <img className="Card-image" src={imageUrl} />
            <div className="Card-right">
                <p className="Card-title">{title}</p>
                <p className="Card-date">{ moment(lastUpdate*1000).format("MMM DD, Y HH:mm A zz") } {moment.tz(moment.tz.guess()).format("z")}</p>
            </div>
        </div>
    )
}