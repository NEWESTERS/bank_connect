window.onload = _ => {
	d3.json("https://fh4ndol9t0.execute-api.eu-west-1.amazonaws.com/api/year_data")
	  	.then((data) => {
	  		let sumHeight = d3.scaleLinear()
            	.range([20, 100])
    			.domain(d3.extent(data, function(d) { return d.sum }))

    		let numberHeight = d3.scaleLinear()
            	.range([20, 100])
    			.domain(d3.extent(data, function(d) { return d.number }))

    		let years = document.querySelectorAll("#chart>#line>.year")
    		for(let i = 0; i < years.length; i++) {
    			years[i].innerHTML = data[i].year
    			console.log(data[i].year)
    		}

    		let sumBars = document.querySelectorAll("#sum>.bar")
    		for(let i = 0; i < data.length; i++) {
    			sumBars[i].style.height = sumHeight(data[i].sum) + "%"
    			sumBars[i].dataset.value = data[i].sum
    			sumBars[i].children[0].innerHTML = "Сумма:\n" + data[i].sum
    			sumBars[i].onclick = _ => {
                    let chart = document.getElementById("chart")
                    chart.classList.add("fadeout")
                    setTimeout(function() {
                        window.location = "treeMap/index.html"
                    }, 1000)	
    			}
    		}


    		let numberBars = document.querySelectorAll("#number>.bar")
    		for(let i = 0; i < data.length; i++) {
    			numberBars[i].style.height = numberHeight(data[i].number) + "%"
    			numberBars[i].dataset.value = data[i].number
    			numberBars[i].children[1].innerHTML = "Кол-во:\n" + data[i].number
    		}
		})
	    .catch((error) => {
	    		throw error;
	    });
}