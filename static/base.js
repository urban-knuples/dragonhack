//http://bl.ocks.org/ElefHead/ebff082d41ef8b9658059c408096f782

const margin = {top: 10, bottom: 10, left: 10, right: 10}
const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'noselect')
    .attr('onselectstart', 'return false')
    .text('');

const myColor = d3.scaleLinear()
    .range(["red", "blue"])
    .domain([0, 1])

async function ready(us) {
    csvData = await d3.csv('static/Ready_county_votes.csv')

    var geojson = topojson.feature(us, us.objects.counties).features;
//dodamo okrožja
    g.append('g')
        .attr('id', 'counties')
        .selectAll('path')
        .data(geojson)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county-boundary')
        .style("fill", function (d) {//barvanje okrozji
            let idString = String(d.id);
            if (idString.length === 4) idString = '0' + idString
            let o = csvData.find(o => o.County === FIPS_County.get(idString))
            if (o === undefined) return "rgb(170, 170, 170)";
            let left = parseInt(o.Votes_Left)
            let right = parseInt(o.Votes_Right)
            let total = left + right
            let shootings =parseFloat(o.Normalized_Shootings_rate)
            if (left === 0 && right === 0) return "rgb(170, 170, 170)";
            //barva = myColor(right / (left + right) ) 

            b = parseInt(right / total *255)
            r = parseInt(left / total *255)
            gr = parseInt(shootings*5000 )
            if(gr<1) gr=1;
            if(gr>255) gr=255;

            console.log(r)
            barva = "rgb("+ r + "," + gr + "," +b +")"
            return barva
        })
        .on('click', reset)
        .on('mouseover', function (d) {
            let idString = String(d.id);
            if (idString.length === 4) idString = '0' + idString
            return tooltip.text(FIPS_County.get(idString))
        })
        .on('mousemove', function () {
            return tooltip.style('top', (event.pageY - 20) + 'px').style('left', (event.pageX + 20) + 'px');
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
            return tooltip.text(FIPS_State.get(d.id));
        })
        .on('mousemove', function () {
            return tooltip.style('top', (event.pageY - 20) + 'px').style('left', (event.pageX + 20) + 'px');
        })


    //robovi, da je bolj pregledno
    g.append('path')
        .datum(topojson.mesh(us, us.objects.states, function (a, b) {
            return a !== b;
        }))
        .attr('id', 'state-borders')
        .attr('d', path);

    return geojson;
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

    g2.transition()
        .delay(100)
        .duration(800)
        .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');
    g.transition()
        .duration(800)
        .style('stroke-width', 1.5 / scale + 'px')
        .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');


}

function reset() {
    active.classed('active', false);
    active = d3.select(null);

    g2.transition()
        .delay(100)
        .duration(800)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    g.transition()
        .delay(100)
        .duration(800)
        .style('stroke-width', '1.5px')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

}

