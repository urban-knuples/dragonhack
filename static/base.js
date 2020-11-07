//http://bl.ocks.org/ElefHead/ebff082d41ef8b9658059c408096f782

const margin = {top: 10, bottom: 10, left: 10, right: 10}
const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .text('');

function ready(us) {

    //dodamo okrožja
    g.append('g')
        .attr('id', 'counties')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county-boundary')
        .on('click', reset)
        .on('mouseover', function (d) {
            return tooltip.text(d.id) //todo da so okrozja tut
        })
        .on('mousemove', function () {
            return tooltip.style('top', (event.pageY - 10) + 'px').style('left', (event.pageX + 10) + 'px');
        })

    //dodamo države
    g.append('g')
        .attr('id', 'states')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'state')
        .on('dblclick', clicked)
        .on('click', reset)
        .on('mouseover', function (d) {
            return tooltip.text(fipsToState[d.id]);
        })
        .on('mousemove', function () {
            return tooltip.style('top', (event.pageY - 10) + 'px').style('left', (event.pageX + 10) + 'px');
        })


    //robovi, da je bolj pregledno
    g.append('path')
        .datum(topojson.mesh(us, us.objects.states, function (a, b) {
            return a !== b;
        }))
        .attr('id', 'state-borders')
        .attr('d', path);
}

function clicked(d) {
    if (d3.select('.background').node() === this) return reset();
    if (active.node() === this) return reset();
    active.classed('active', false);
    active = d3.select(this).classed('active', true);

    let bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    g.transition()
        .duration(800)
        .style('stroke-width', 1.5 / scale + 'px')
        .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');
}

function reset() {
    active.classed('active', false);
    active = d3.select(null);

    g.transition()
        .delay(100)
        .duration(800)
        .style('stroke-width', '1.5px')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

