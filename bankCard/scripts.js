let ch_elements = []
let count = 0
let colors = ["#03A9F4", "#00BCD4", "#009688","#4CAF50","#CDDC39"]
let colors_circ = ["#03A9F4", "#00BCD4", "#009688","#4CAF50"]
let state = 'inactive'
let data_c = [
	{
		'category':'Категория 1',
		'value':24
	},
	{
		'category':'Категория 2',
		'value':20
	},
	{
		'category':'Категория 3',
		'value':30
	},
	{
		'category':'Категория 4',
		'value':26
	}]
let data_m = [
	{
		'category':'Категория 1',
		'value':16
	},
	{
		'category':'Категория 2',
		'value':40
	},
	{
		'category':'Категория 3',
		'value':30
	},
	{
		'category':'Категория 4',
		'value':14
	}]
function Bank(nameb, inn, owners, reg_date, reg_region, director, number, sum, target_for_owner, wrp_owner){

	this.target_for_owner = target_for_owner
	this.nameb = nameb
	this.inn = inn
	this.owners = owners
	this.reg_date = reg_date
	this.reg_region = reg_region
	this.director = director
	this.number = number
	this.sum = sum

	this.insertInfo = (name_t,inn_t,reg_date_t,reg_region_t,director_t,number_t,sum_t)=>{
		name_t.innerHTML = this.nameb
		inn_t.innerHTML = this.inn
		reg_date_t.innerHTML = this.reg_date
		reg_region_t.innerHTML = this.reg_region
		director_t.innerHTML = this.director
		number_t.innerHTML = this.number
		sum_t.innerHTML = this.sum

	}

	this.makeChart = (chart) =>{
		chart.innerHTML = ''
		
		let percent_sum = 0
		for (let i = 0; i < this.owners.length; i++) {
			percent_sum += parseInt(this.owners[i].part_in, 10)
		}
		if( percent_sum == 100)
		{
			for (let i = 0; i < this.owners.length; i++) {
				ch_elements.push(new Owner(i,this.owners[i].name,this.owners[i].company,this.owners[i].part_in,target_for_owner, wrp_owner, this.sum))
				chart.appendChild(ch_elements[i].elem)
			}
		}
		else
		{
			alert('ВАС ПОСЕТИЛ НАРУТО ОГДАНЦОВИЧ ГОТОВЬ СВОЮ КОНОХУ')
		}	
		
	}


}



function Owner(num,name,company,part_in,target, wrp, sum){
	this.sum = sum
	this.wrp = wrp
	this.num = num
	this.name = name
	this.company = company
	this.part_in = part_in
	this.line = document.getElementById('color_line')
	this.name_t = document.getElementById('name_dir')
	this.company_t = document.getElementById('company_dir')
	this.part_t = document.getElementById('part_t')
	this.elem = document.createElement("div")
	if(part_in > 6.5)this.elem.innerHTML = Math.round(this.part_in) + '%'
	this.elem.style.width = part_in + '%'
	this.elem.style.background = getColour()
	this.elem.setAttribute('title', this.company)
	this.elem.classList.add('part_in')
	this.target = target
	
	this.elem.onclick = _=>{
		
		if(state == 'inactive'){
			this.target.classList.add('active')
			state = 'active'
			this.wrp.classList.add('active')
		}
			this.line.style.background = this.elem.style.background
			this.name_t.innerHTML = this.name
			this.company_t.innerHTML = this.company
			this.part_t.innerHTML = Math.round(this.part_in) + '%'
				
	}

}

document.addEventListener("click", function( event ){
	if( state == 'active' && event.target.classList[0]!='part_in'){
		for (var i = 0; i<ch_elements.length;i++) {
			ch_elements[i].target.classList.remove('active')
			ch_elements[i].wrp.classList.remove('active')
			state = 'inactive'
		}
	}
})
getColour = _=>{
	let result = colors[count] 
	count ++
	if(count>6)count=0
	return result

}
getColour_crc = _=>{
	let result = colors_circ[count] 
	count ++
	if(count>3)count=0
	return result

}

function Progress( link , target, data , sum) {
			this.sum = sum
			let last_t = -Math.PI/2 * 57.2958
			this.last_val = 0
			this.pie = []
			this.elem = document.getElementById(link)
			this.val_targ = document.getElementById(target)
			this.vals = []
			this.text = 
			this.value = []
			
			this.setValue = function ( category , pie , value ,  i) {
				this.category = category
				this.value.push(value) 
				this.updateProgress(pie, i)
			}
			
			this.updateProgress = function (pie , i) {
				let total = Math.PI*240
				let val = ((this.value[i] * total) / 100)// + this.last_val

				let t = (2*this.value[i]*Math.PI* 57.2958) /100

				this.elem.insertBefore(pie, this.elem.children[2])
				pie.style.strokeDasharray = val + ', ' + total
				pie.style.stroke = getColour_crc()
				pie.style.transform = 'rotate( ' + last_t+'deg)'

				last_t +=t
				this.last_val = val

			}

			for (let i = 0; i < data.length; i++) {
				let new_el = document.createElementNS("http://www.w3.org/2000/svg", "circle")
				new_el.setAttribute('id',i)
				new_el.onclick = _ =>{
					this.elem.getElementsByTagName('text')[0].innerHTML = (this.value[new_el.getAttribute('id')] * this.sum)/100
				}
				this.pie.push(new_el)
				this.setValue(data[i].category ,this.pie[i] , data[i].value, i)

				let point = document.createElement('div')
				point.style.background = this.pie[i].style.stroke
				point.setAttribute('class','point')

				let point_val = document.createElement('p')
				point_val.setAttribute('class','point_val')
				point_val.innerHTML = this.category+' : '+ this.value[i] + '%'

				let point_container = document.createElement('div')
				point_container.setAttribute('class','point_container')
				point_container.appendChild(point)
				point_container.appendChild(point_val)

				this.vals.push(point_container)
				this.val_targ.appendChild(this.vals[i])

						
			}

}



window.onload = _ => {
	let notes = document.getElementsByClassName('note')
	let notations = document.getElementsByClassName('notation_wrp')
	for (var i = 0; i < notes.length; i++) {
		notes[i].classList.add('visible')
		//TUT MEGA ULTRA KOSTYLEZORD
		notations[i].classList.add('visible')
	}

	let name_t = document.getElementById('name')
	let inn_t = document.getElementById('inn')
	let reg_date_t = document.getElementById('reg_date')
	let reg_region_t = document.getElementById('reg_region')
	let director_t = document.getElementById('director')
	let number_t = document.getElementById('number')
	let sum_t = document.getElementById('sum')

	let chart = document.getElementById('test_chart')
	let about = document.getElementById('about')
	let wrp_owner = document.getElementById('line_chart_wrp')
	let test_owners = [
		{
			name: 'Приступа Вадим Владимирович',
			company: 'VITALIGHT LIMITED',
			part_in: '20.0232'
		},
		{
			name: 'Гальченко Сергей Николаевич',
			company: 'C.M.R TRADING LIMITED',
			part_in: '20.2323'
		},
		{
			name: 'Белянин Виктор Серафимович',
			company: 'C.B.R SERVICES LIMITED',
			part_in: '20'
		},
		{
			name: 'Загайнов Кирилл Валерьевич',
			company: 'ARROWBRIDGE LIMITED',
			part_in: '20.2312'
		},
		{
			name: 'Исполатов Андрей Борисович',
			company: 'DALEBRAND LIMITED',
			part_in: '20.2312'
		}
	]

	

	progress_c = new Progress('progress_contr', 'notation_wrp_1',data_c, 110000000)
	progress_m = new Progress('progress_money', 'notation_wrp_2',data_m, 50001111111)
	bank = new Bank('КБ "Финансовый стандарт"', '0304001711', test_owners, '20.07.2015' , 'г.Москва, ул.Троицкая, д.7, стр.4', 'Маликова Ольга Николаевна', '1053', 23112, about, wrp_owner)

	bank.insertInfo(name_t,inn_t,reg_date_t,reg_region_t,director_t,number_t,sum_t)
	bank.makeChart(chart)

}