import React, { useState, useEffect } from 'react';
import Child1 from './component/child1';
import Child2 from './component/child2';
import * as d3 from 'd3';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv(process.env.PUBLIC_URL + '/data/SampleDataset.csv').then(loadedData => {
            const parsedData = loadedData.map(d => ({
                x: +d.x,
                y: +d.y,
                category: d.category
            }));
            const categoryCounts = d3.rollups(parsedData, v => v.length, d => d.category)
                                     .map(([category, count]) => ({ category, count }));
            setData({ items: parsedData, counts: categoryCounts });
        });
    }, []);

    return (
        <div className="App">
            <h1>Dashboard</h1>
            {data.items && <Child1 data={data.counts} />}
            {data.items && <Child2 data={data.items} />}
        </div>
    );
}

export default App;