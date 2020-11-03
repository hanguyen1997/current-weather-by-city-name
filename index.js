$(document).ready(function(){
	var name_city = document.getElementById("input_city_name");

	/*get ip*/
	var ip = "";
	$.ajax({
	  url: "https://geolocation-db.com/jsonp",
	  jsonpCallback: "callback",
	  dataType: "jsonp",
	  success: function(location) {
	   var ip = location.IPv4;
	  }
	});

	/*get name_city by ip*/
	if(name_city.value == "")
	{
		var api_key_ipgeolocation = "ab87962eadcc498195ed5a0ab3ab1952";
		var api_ipgeolocation = "https://api.ipgeolocation.io/ipgeo?apiKey="+api_key_ipgeolocation+"&ip="+ip;
		fetch(api_ipgeolocation)
			.then(response => {
				return response.json();
			})
			.then(data => {

				name_city_create = data.city;
				console.log(name_city);
				call_api(name_city_create);
			})
	}

	
	$("#submit_city_name").click(function(){
		if(name_city.value == ""){
			alert("Please enter a city name");
			$( "#input_city_name" ).focus();
			return;
		}
		else call_api(name_city.value);
	})

})
function call_api(name_city){
	var api_key = "8a6782a545b721813285b2fb2f7fc8a2";
	var kelvin = 273;
	var api_weather = "http://api.openweathermap.org/data/2.5/weather?q="+name_city+"&appid="+api_key;
	fetch(api_weather)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);

			/*not found city*/
			if(data.cod == "404"){
				document.getElementById("notify-projcet").innerHTML = "<p>City not found</p>";
				return;
			}
			else document.getElementById("notify-projcet").innerHTML = "";
			/*end: if(data.code == "404")*/

			var icon = "<img src='http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'>";
			
			// var icon = "<img src='icons/black/png/256x256/"+data.weather[0].icon+".png'>";
			document.getElementById("icons_weather").innerHTML = icon;

			var weather = "<p>"+Math.floor(data.main.temp - kelvin)+" °C</p>";
			document.getElementById("content_weather").innerHTML = weather;

			document.getElementById("description").innerHTML = data.weather[0].description;
			
			var info_location = data.name+", "+data.sys.country;
			document.getElementById("info_location").innerHTML = info_location;
		})
}