function posalji() {

  var naziv = $("#naziv").val();
  $("#data").empty();
  console.log(naziv);
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + naziv + "&APPID=39314e0ae6d3990ee9fa61eca7f546a9",
    type: "GET",
    dataType: "json",
    complete: function(data) {
      console.log(data.responseJSON);
      $("#div").append("")
      dataPoints = [];
      $.each(data.responseJSON.list, function(index, value) {
        dataPoints.push({
          x: new Date(value.dt_txt),
          y: parseInt((value.main.temp-273.15).toFixed(2))
        });
        var row =
        `
        <tr>
          <td>${value.dt_txt}</td>
          <td>${(value.main.temp-273.15).toFixed(2)}</td>
          <td>${(value.main.temp_max-273.15).toFixed(2)}</td>
          <td>${(value.main.temp_min-273.15).toFixed(2)}</td>
          <td>${value.main.pressure}</td>
          <td>${value.main.humidity}</td>
          <td>100%</td>
        </tr>
        `;
        $("#data").append(row)
      });
      console.log(dataPoints);
      var options =  {
      	animationEnabled: true,
      	theme: "light2",
      	title: {
      		text: "Grafik"
      	},
      	axisX: {
      		valueFormatString: "DD MMM YYYY",
      	},
      	axisY: {
      		title: "Temperatura",
      		titleFontSize: 24,
      		includeZero: false
      	},
      	data: [{
      		type: "spline",
      		dataPoints: dataPoints
      	}]
      };
      $("#chartContainer").CanvasJSChart(options);
    }
  });
}
