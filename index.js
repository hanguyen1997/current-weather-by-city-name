$(document).ready(function(){
	var api_key = "8a6782a545b721813285b2fb2f7fc8a2";
	var kelvin = 273;
	$("#submit_city_name").click(function(){
		var name_city = document.getElementById("input_city_name").value;
		if(name_city == ""){
			alert("Please enter a city name");
			$( "#input_city_name" ).focus();
			return;
		}
		var api_weather = "http://api.openweathermap.org/data/2.5/weather?q="+name_city+"&appid="+api_key;
		fetch(api_weather)
			.then(response => {
				return response.json();
		})
			.then(data => {
				console.log(data);
				var icon = "<img src='http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'>";

				
				// var icon = "<img src='icons/black/png/256x256/"+data.weather[0].icon+".png'>";
				document.getElementById("icons_weather").innerHTML = icon;

				var weather = "<p>"+Math.floor(data.main.temp - kelvin)+" °C</p>";
				document.getElementById("content_weather").innerHTML = weather;

				document.getElementById("description").innerHTML = data.weather[0].description;
				
				var info_location = data.name+", "+data.sys.country;
				document.getElementById("info_location").innerHTML = info_location;
				
			})
	})

})

