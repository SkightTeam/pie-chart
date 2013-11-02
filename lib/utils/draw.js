draw: function(svg, data, dimensions, options) {
  var radius = this.getRadius(dimensions);

  var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - options.thickness);

  var pie = d3.layout.pie()
    .value(function(d) { return d.value; });


  var g = svg.append("g")
    .attr({
      "id": "n3-pie-arcs"
    })
    .selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr({
        "class": "arc",
        "id": function(d, i) {return "arc_" + i;}
      });

  g.append("path")
    .attr({
      "d": arc
    })
    .style({
      "fill": function(d) {return d.data.color;},
      "fill-opacity": 0.8
    });
  
  g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d, i) { return i; });
    
  
  return this;
}