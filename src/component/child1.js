import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

function Child1({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (data) {
            const svg = d3.select(ref.current);
            svg.selectAll('*').remove();

            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = 555 - margin.left - margin.right;
            const height = 345 - margin.top - margin.bottom;

            const x = d3.scaleBand()
                .range([0, width])
                .padding(0.1)
                .domain(data.map(d => d.category).sort());

            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data, d => d.count)]);

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append('g')
                .call(d3.axisLeft(y));

            g.selectAll('.bar')
                .data(data)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.category))
                .attr('width', x.bandwidth())
                .attr('y', d => y(d.count))
                .attr('height', d => height - y(d.count))
                .attr('fill', '#4CAF50');

            g.selectAll('.label')
                .data(data)
                .enter().append('text')
                .attr('class', 'label')
                .attr('x', (d) => x(d.category) + x.bandwidth() / 2)
                .attr('y', (d) => y(d.count) - 5)
                .attr('text-anchor', 'middle')
                .text((d) => d.count);
        }
    }, [data]);

    return <svg ref={ref} width={555} height={345}></svg>;
}

export default Child1;