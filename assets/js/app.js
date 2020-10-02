// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select id="scatter", append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Set initial parameters of x and y aixs
var selectedX = "poverty";
var seledtedY = "healthcare";

// Update the scale for x upon selected parameter
function xScale(censusData, selectedX) {
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[selectedX]) - 1, d3.max(censusData, d => d[selectedX]) + 1])
    .range([0, chartWidth]);
  return xLinearScale;
}

// Update the scale for y upon selected parameter
function yScale(censusData, selectedY) {
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[selectedY]) - 1, d3.max(censusData, d => d[selectedY]) + 1])
    .range([chartHeight, 0]);
  return yLinearScale;
}

// Load data from data.csv
d3.csv("./assets/data/data.csv").then(function(censusData) {

    console.log(censusData);
  
    // Cast each hours value in tvData as a number using the unary + operator
    censusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;

    });

    // Create a scale for x
    let xScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.poverty) - 1 , d3.max(censusData, d => d.poverty)])
        .range([0, chartWidth])

    // Create a scale for y
    let yScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.healthcare) - 1, d3.max(censusData, d => d.healthcare)])
        .range([chartHeight, 0])

    // Create create the chart's axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
    
    // Append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", 12)
        .attr("fill", "lightblue")
        .attr("opacity", 0.9);

    // Create circle labels
    chartGroup.selectAll()
        .data(censusData)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.poverty) - 5)
        .attr("y", d => yScale(d.healthcare) + 3 )
        .attr("fill", "white")
        .attr("font-size", 10)
        .text(d => d.abbr);

    // Append axes titles
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
        .classed("axisText", true)
        .text("In Poverty (%)");
    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .classed("axisText", true)
        .attr("y", 0 - margin.left + 50)
        .attr("x", 0 - (chartHeight / 2) - 60)
        .text("Lacks Healthcare (%)");
    
  }).catch(function(error) {
    console.log(error);
  });
