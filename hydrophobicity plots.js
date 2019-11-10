// https://observablehq.com/d/ec71461dc8cee3c9@554
import define1 from "./e93997d5089d7165@2200.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Hydrophobicity Plot Nov 11, 2019 Completed?`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.variable(observer("slider_snap")).define("slider_snap", ["d3","DOM"], function(d3,DOM){return(
function(min, max) {

  var range = [min, max + 1]

  // set width and height of svg
  var w = 900
  var h = 300
  var margin = {top: 130,
                bottom: 135,
                left: 60,
                right: 40}

  // dimensions of slider bar
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  // create x scale
  var x = d3.scaleLinear()
    .domain(range)  // data space
    .range([0, width]);  // display space
  
  // create svg and translated g
  var svg = d3.select(DOM.svg(w,h))
  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  // draw background lines
  g.append('g').selectAll('line')
    .data(d3.range(range[0], range[1]+1, 5))
    .enter()
    .append('line')
    .attr('x1', d => x(d)).attr('x2', d => x(d))
    .attr('y1', 0).attr('y2', height)
    .style('stroke', '#ccc')
  
  // labels
  var labelL = g.append('text')
    .attr('id', 'labelleft')
    .attr('x', 0)
    .attr('y', height + 5)
    .text(range[0])

  var labelR = g.append('text')
    .attr('id', 'labelright')
    .attr('x', 0)
    .attr('y', height + 5)
    .text(range[1])

  // define brush
  var brush = d3.brushX()
    .extent([[0,0], [width, height]])
    .on('brush', function() {
      var s = d3.event.selection;
      // update and move labels
      labelL.attr('x', s[0])
        .text(Math.round(x.invert(s[0])))
      labelR.attr('x', s[1])
        .text(Math.round(x.invert(s[1])) - 1)
      // move brush handles      
      handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + [ s[i], - height / 4] + ")"; });
      // update view
      // if the view should only be updated after brushing is over, 
      // move these two lines into the on('end') part below
      svg.node().value = s.map(d => Math.round(x.invert(d)));
      svg.node().dispatchEvent(new CustomEvent("input"));
    })
    .on('end', function() {
      if (!d3.event.sourceEvent){
        console.log('not working')
        var d0 = d3.event.selection.map(x.invert);
        var d1 = d0.map(Math.round)
        d1[1] = d1[0] + 21
        d3.select(this).transition().call(d3.event.target.move, d1.map(x))
        }
      else{
        return;}
    })

  // append brush to g
  var gBrush = g.append("g")
      .attr("class", "brush")
      .call(brush)

  // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
  var brushResizePath = function(d) {
      var e = +(d.type == "e"),
          x = e ? 1 : -1,
          y = height / 2;
      return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
        "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
        "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
  }

  var handle = gBrush.selectAll(".handle--custom")
    .data([{type: "w"}, {type: "e"}])
    .enter().append("path")
    .attr("class", "handle--custom")
    .attr("stroke", "#000")
    .attr("fill", '#D2B4DE')
    .attr("cursor", "ew-resize")
    .attr("d", brushResizePath);
    
  // override default behaviour - clicking outside of the selected area 
  // will select a small piece there rather than deselecting everything
  // https://bl.ocks.org/mbostock/6498000
  gBrush.selectAll(".overlay")
    .each(function(d) { d.type = "selection"; })
    .on("mousedown touchstart", brushcentered)
  
  function brushcentered() {
    var dx = x(1) - x(0), // Use a fixed width when recentering.
    cx = d3.mouse(this)[0],
    x0 = cx - dx / 2,
    x1 = cx + dx / 2;
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }
  
  // select entire range
  gBrush.call(brush.move, range.map(x))
  
  return svg.node()
}
)});
  main.variable(observer("input")).define("input", function(){return(
'MTLVIALLILLFIELSEYRLNYKDIMNNSTNKTPTYLAWKLNPAGSISIMISLSVYVLLNNMINLIATLLGSNANFEFLSFANPIGITFYIVLQIVLSYLLSRFLINTKKKADEFLKNGNYFDSIRPGRETERYLNSKARRVCWTGAILVALILAVPLYSTLLVPNLSTEIYFSMQLIILVYISINIGETIRTYLYFDRYKQILNKYW'.toLowerCase()
)});
  main.variable(observer("letters")).define("letters", function(){return(
[{a: 1.8, c: 2.5, d: -3.5, e: -3.5,
            f: 2.8, g: -0.4, h: -3.2, i: 4.5,
            k: -3.9, l: 3.8, m: 1.9, n: -3.5,
            p: -1.6, q: -3.5, r:-4.5, s: -0.8, t: -0.7,
            v: 4.2, w: -0.9, y: -1.3}]
)});
  main.variable(observer("dataInitial")).define("dataInitial", ["input","letters"], function(input,letters)
{
  var plot = []
  var yvals = []
  for (var i = 0; i < input.length; i++) {
    if (input[i] != 'b' && input[i] != 'j' && input[i] != 'o' && input[i] != 'u' && input[i] != 'x' && input[i] != 'z') {
     yvals.push(letters[0][input[i]])
     plot.push({x: i+1, y: letters[0][input[i]]})
    }
  }
  return plot
}
);
  main.variable(observer("yvals")).define("yvals", ["dataInitial"], function(dataInitial){return(
dataInitial.map(d => d.y)
)});
  main.variable(observer("settings")).define("settings", function(){return(
{
  margin:{top: 50, right: 40, bottom: 50, left: 60}, 
  height:500, 
  width:900, 
}
)});
  main.variable(observer("getMinMax")).define("getMinMax", ["d3"], function(d3){return(
function getMinMax(data) {
  var keys = []
  for (var i=0; i<data.length; i++){
    keys.push(data[i].x)
  }
  return [d3.min(keys), d3.max(keys)];
}
)});
  main.variable(observer("scales")).define("scales", ["d3","getMinMax","data","settings"], function(d3,getMinMax,data,settings)
{
  // Create scales using the domain of your data, and the visual range of the settings
  let xScale = d3.scaleLinear().domain([getMinMax(data)[0], getMinMax(data)[1]]).range([0, settings.width]);
  let yScale = d3.scaleLinear().domain([-4, 4.5]).range([settings.height, 0]);
  
  return {
   x: xScale, 
   y: yScale
  }
}
);
  main.variable(observer("movingAverage")).define("movingAverage", function(){return(
function movingAverage(values, N) {
  let i = 0;
  let sum = 0;
  let half = Math.floor(N/2)
  const means = new Float64Array(values.length).fill(NaN);
  for (let n = Math.min(N - 1, values.length); i < n; ++i) {
    sum += values[i];
  }
  for (let n = values.length; i < n; ++i) {
    sum += values[i];
    means[i-half] = sum / N;
    sum -= values[i - N + 1];
  }
  for (let i = 0; i < half; i++){
    means[i] = means[half]
  }
  for (let i = values.length - half-1; i < values.length; i++){
    means[i] = means[values.length - half-1]
  }
  return means;
}
)});
  main.variable(observer()).define(["movingAverage","yvals","average","dataInitial"], function(movingAverage,yvals,average,dataInitial)
{
  var values = movingAverage(yvals, average);
  values.map( (d, i) => dataInitial[i].y_avg = d);
}
);
  main.variable(observer()).define(["dataInitial","input"], function(dataInitial,input){return(
dataInitial.slice(200, input.length)
)});
  main.variable(observer("line")).define("line", ["d3","scales","settings"], function(d3,scales,settings){return(
d3.line()
    .x(function(d) { return scales.x(d.x) + settings.margin.left; })
    .y(function(d) { return scales.y(d.y_avg) + settings.margin.top; })
    .curve(d3.curveMonotoneX)
)});
  main.variable(observer()).define(["line","data"], function(line,data){return(
line(data)
)});
  main.variable(observer("data")).define("data", ["dataInitial","input"], function(dataInitial,input){return(
dataInitial.slice(0, input.length)
)});
  main.variable(observer()).define(["data"], function(data){return(
data
)});
  main.variable(observer("viewof slider_pos")).define("viewof slider_pos", ["slider_snap","input"], function(slider_snap,input){return(
slider_snap(0, input.length)
)});
  main.variable(observer("slider_pos")).define("slider_pos", ["Generators", "viewof slider_pos"], (G, _) => G.input(_));
  main.variable(observer("viewof average")).define("viewof average", ["slider"], function(slider)
{
  return slider({
    value: this ? this.input.value : 9, step: 1, min: 1, max: 20
  });
}
);
  main.variable(observer("average")).define("average", ["Generators", "viewof average"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["settings","d3","scales","data","line","average","slider_pos"], function(settings,d3,scales,data,line,average,slider_pos)
{
   let fullWidth = settings.width + settings.margin.left + settings.margin.right;
   let fullHeight = settings.height + settings.margin.top + settings.margin.bottom;
   const svg = d3.create("svg")
      .attr("viewBox", [0, 0, fullWidth, fullHeight]);

   // X Axis
   svg.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(" + settings.margin.left + "," + (scales.y(0) + settings.margin.top) + ")")
     .style("font", "16px times")
     .call(d3.axisBottom(scales.x));
   svg.selectAll(".tick")
     .each(function (d) {
     if ( d === 0 ) {
       this.remove();
     }
   });  
   // X axis label
   svg.append("text")
    .text("Position")
    .attr("dx", settings.width / 2)
    .attr("dy", settings.height + settings.margin.top + settings.margin.bottom - 10)
    .style("font", "22px times")

    // Y Axis
    svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + settings.margin.left + "," + settings.margin.top + ")")
      .style("font", "16px times")
    .call(d3.axisRight(scales.y)
        .tickSize(settings.width))
    .call(g => g.select(".domain")
        .remove())
    .call(g => g.selectAll(".tick")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2"))
    .call(g => g.selectAll(".tick text")
        .attr("x", 4)
        .attr("dy", -4))

   // Y Axis label
    svg.append("text")
      .text("Hydrophobicity")
      .attr("x", -settings.height/2 - settings.margin.top)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font", "22px times")
      .attr("y", settings.margin.left -40)

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line(data, average));

   const g = svg.append("g")
    .attr("transform", "translate(" + settings.margin.left + "," + settings.margin.top + ")");

  let circles = g.selectAll("circle")
   .data(data.slice(slider_pos[0], slider_pos[1]))
   .enter()
   .append("circle")
   .attr("cx", (d) => scales.x(d.x))
   .attr("cy", (d) => scales.y(d.y))
   .style("opacity", .3)
   .attr("r", 5)
  return svg.node();
}
);
  main.variable(observer()).define(["data","slider_pos"], function(data,slider_pos){return(
data.slice(slider_pos[0], slider_pos[1])
)});
  return main; 
}
