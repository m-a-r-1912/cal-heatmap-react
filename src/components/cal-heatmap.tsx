import React, {useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';

export default function Cal() {
    const calRef = useRef(null);

    useEffect(() => {
        const low = -1.1;
        const high = 21.1;

        const cal = new CalHeatmap();

        cal.paint(
            {
                data: {
                    source: '../data/seattle-weather.json',
                    type: 'json',
                    x: 'date',
                    y: d => +d['temp_max'],
                    groupY: 'max', 
                },
                range: 5, 
                date: {start: new Date('2012-01-01')},
                scale: {
                    color: {
                        type: 'quantize',
                        domain: [low, high],
                        scheme: 'YlOrRd'
                    },
                },
                domain: {
                    type: 'month',
                    gutter: 4, 
                    label: {text: 'MMM', textAlign: 'start', position: 'top'},
                },
                subDomain: {type: 'ghDay', radius: 2, width: 11, height: 11, gutter: 4},
            },
            [
                [
                    Tooltip,
                    {
                        text: function (date, value, dayjsDate){
                            return (
                                (value ? value + ' ℃' : 'No data') + ' on ' + dayjsDate.format('LL')
                            );
                        },
                    }
                ],
            ]
        );
    }, []);

    return <div id='cal-heatmap'></div>
}