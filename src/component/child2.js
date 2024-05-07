import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

function Child2({ data }) {
    const ref = useRef();
    const [category, setCategory] = useState('A');

    useEffect(() => {
        if (data) {
            const svg = d3.select(ref.current);
            svg.selectAll('*').remove();

            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const width = 480 - margin.left - margin.right;
            const height = 350 - margin.top - margin.bottom;

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.x)])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.y)])
                .range([height, 0]);

            const color = d3.scaleOrdinal()
                .domain(['A', 'B', 'C'])
                .range(['red', 'blue', 'green']);

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append('g')
                .call(d3.axisLeft(y));

            const tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('text-align', 'center')
                .style('width', '120px')
                .style('height', '28px')
                .style('padding', '2px')
                .style('font', '12px sans-serif')
                .style('background', 'lightsteelblue')
                .style('border', '0px')
                .style('border-radius', '8px')
                .style('pointer-events', 'none')
                .style('opacity', 0);

            const update = () => {
                const filteredData = data.filter(d => d.category === category);

                const dots = g.selectAll('.dot')
                    .data(filteredData, d => d.id);

                dots.join(
                    enter => enter.append('circle')
                        .attr('class', 'dot')
                        .attr('cx', d => x(d.x))
                        .attr('cy', d => y(d.y))
                        .attr('r', 5)
                        .style('fill', d => color(d.category))
                        .on('mouseover', (event, d) => {
                            tooltip.transition()
                                .duration(200)
                                .style('opacity', .9);
                            tooltip.html(`x: ${d.x}<br/>y: ${d.y}`)
                                .style('left', (event.pageX + 5) + 'px')
                                .style('top', (event.pageY - 28) + 'px');
                        })
                        .on('mouseout', (event, d) => {
                            tooltip.transition()
                                .duration(500)
                                .style('opacity', 0);
                        }),
                    update => update,
                    exit => exit.remove()
                );
            };

            update();

            d3.select("#categorySelect").on("change", function() {
                setCategory(this.value);
            });

            return () => tooltip.remove();
        }
    }, [data, category]);

    return (
        <>
            <select id="categorySelect" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <svg ref={ref} width={480} height={350}></svg>
        </>
    );
}

export default Child2;