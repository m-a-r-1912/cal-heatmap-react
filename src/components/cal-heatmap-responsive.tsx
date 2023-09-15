import React, {useEffect, useRef, useState} from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';

export default function CalResponsive() {
    const calRef = useRef<CalHeatmap | null>(null); //store a reference to CalHeatmap instance
    const [sideLength, setSideLength] = useState(0);
    const low = -1.1;
    const high = 21.1;
    const gutterSize = 4;
    const months = 8; 

    const updateDimensions = () => {
        const parentDiv = document.getElementById("parent-div");
        const numberOfRows = 7; //7 days in a week

        /*
            Decent approximate using average days in a month (30.5 days) 
            until can figure out how to do exact calculation
        */
        const numberOfColumns = Math.ceil((months * 30.5) / numberOfRows); 

        const totalGutterWidth = gutterSize * (numberOfColumns - 1);
        if(parentDiv){
            const parentWidth = parentDiv?.offsetWidth;
            const newSideLength = (parentWidth - totalGutterWidth) / numberOfColumns; 
            setSideLength(newSideLength);
        }
    };

    useEffect(() =>{
        updateDimensions();
    },[]);

    useEffect(() => { 
        
        //only create/paint the calendar if the side length has been calculated        
        if(sideLength > 0){
            window.addEventListener('resize', updateDimensions);

            if(calRef.current){
                document.getElementById('cal-heatmap').innerHTML = '';
            }

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
                    range: months,
                    animationDuration:0, 
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
                        gutter: gutterSize, 
                        label: {text: 'MMM', textAlign: 'start', position: 'top'},
                    },
                    subDomain: {type: 'ghDay', radius: 2, width: sideLength, height: sideLength, gutter: gutterSize},
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
            calRef.current = cal;
    
            //remove event listener when the component unmounts
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, [sideLength]);

    return <div id='cal-heatmap'></div>;
}