window.onload = _ => {
	d3.json("https://fh4ndol9t0.execute-api.eu-west-1.amazonaws.com/api/core/2014").then(function (data) {
		var width = height = 100,
			
			colors = ["#03A9F4", "#00BCD4", "#009688","#4CAF50","#CDDC39"],
			lastColorNumber = 0,

			x = d3.scaleLinear().domain([0, width]).range([0, width]),
		    y = d3.scaleLinear().domain([0, height]).range([0, height]),
			
			color = value => {
				value = value  ? value : lastColorNumber++
				return colors[value % colors.length]
			},
			
			treemap = d3.treemap()
		    	.size([width, height])
		    	.paddingInner(0)
		    	.round(false),

			nodes = d3.hierarchy(data)
				.sum(function(d) { return d.number }),
			
			currentDepth;

		treemap(nodes);

		var chart = d3.select("#chart");
		var cells = chart
			.selectAll(".node")
			.data(nodes.descendants())
			.enter()
			.append("div")
			.attr("class", function(d) { return "node level-" + d.depth; })
			.attr("title", function(d) { return d.data.name ? d.data.name : "null"; });

		cells
			.style("left", function(d) { return x(d.x0) + "%"; })
			.style("top", function(d) { return y(d.y0) + "%"; })
			.style("width", function(d) { return x(d.x1) - x(d.x0) + "%"; })
			.style("height", function(d) { return y(d.y1) - y(d.y0) + "%"; })
			.style("background-color", function(d) { while (d.depth > 3) d = d.parent; return color(d.data.number); })
			.on("click", function(d) { 
				if (d.data.number) {
					zoom(d)
					setTimeout(function() {
						window.location = "../bankCard/index.html"
					}, 500)
				} else {
					zoom(d)
				}
			})
			.append("p")
			.attr("class", "label")
			.text(function(d) {
				return d.data.name ? (d.data.name + (d.data.number ? ('\n Кол-во: ' + d.data.number) : "")) : "---";
			});

		cells
			.classed("label-hide", true)

		cells
			.filter(function(d) { return d.depth == 1 })
			.classed("label-hide", false)

		var parent = d3.select(".up")
			.datum(nodes)
			.on("click", zoom);

		function zoom(d) {
			
			console.log('clicked: ' + d.data.name + ', depth: ' + d.depth);
			
			currentDepth = d.depth;
			parent.datum(d.parent || nodes);
			
			x.domain([d.x0, d.x1]);
			y.domain([d.y0, d.y1]);
			
			var t = d3.transition()
		    	.duration(800)
		    	.ease(d3.easeCubicOut);
			
			cells
				.transition(t)
				.style("left", function(d) { return x(d.x0) + "%"; })
				.style("top", function(d) { return y(d.y0) + "%"; })
				.style("width", function(d) { return x(d.x1) - x(d.x0) + "%"; })
				.style("height", function(d) { return y(d.y1) - y(d.y0) + "%"; });
			
			cells
				.filter(function(d) { return d.ancestors(); })
				.classed("hide", function(d) { return d.children ? true : false });
			
			cells
				.filter(function(d) { return d.depth > currentDepth; })
				.classed("hide", false);

			cells
				.classed("label-hide", true)

			cells
				.filter(function(d) { return d.depth == currentDepth + 1 })
				.classed("label-hide", false)


			
		}
	})
}