$(document).ready(function() {
  alert("Dobrodosli u aplikaciju za vremensku prognozu. Za koriscenje potrebno je uneti nazive gradovi uz potvrdu sa ENTER.");
});

var options =  {
  animationEnabled: true,
  animationDuration: 2000,
  theme: "light2",
  zoomEnabled: true,
  panEnabled: true,
  title: {
    text: "Grafik temperature"
  },
  axisX: {
    title: "Vreme merenja",
    valueFormatString: "DDD HH:mm",
  },
  axisY: {
    title: "Trenutna temperatura",
    titleFontSize: 24,
    includeZero: false
  },
  data: []
};

function posalji() {
  $("#data").empty();
  options.data = [];
  var tags = $("#tags").tagsinput('items');
  console.log(tags);
  for ( var i = 0, l = tags.length; i < l; i++ ) {
    dodaj(tags[i]);
  }
  console.log(options);
  $("#chartContainer").CanvasJSChart(options);
  $("#table").show();
}

function dodaj(naziv) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + naziv + "&APPID=39314e0ae6d3990ee9fa61eca7f546a9",
    type: "GET",
    dataType: "json",
    async: false,
    complete: function(data) {
      console.log(data.responseJSON);
      if (data.responseJSON.cod == 404) {
        alert(data.responseJSON.message)
      }
      $("#div").append("")
      dataPoints = [];
      var row =
      `
      <tr>
        <th colspan="6">
          ${data.responseJSON.city.name} (${data.responseJSON.city.country})
        </td>
      </tr>
      `;
      $("#data").append(row);
      $.each(data.responseJSON.list, function(index, value) {
        dataPoints.push({
          x: new Date(value.dt_txt),
          y: parseInt((value.main.temp-273.15).toFixed(2))
        });
        var date = new Date(value.dt_txt);
        var row =
        `
        <tr>
          <td>${value.dt_txt}</td>
          <td>${(value.main.temp-273.15).toFixed(2)}</td>
          <td>${(value.main.temp_max-273.15).toFixed(2)}</td>
          <td>${(value.main.temp_min-273.15).toFixed(2)}</td>
          <td>${value.main.pressure}</td>
          <td>${value.main.humidity}</td>
        </tr>
        `;
        $("#data").append(row);
      });
      console.log(dataPoints);


      var data = {
         type: "spline",
         xvalueFormatString: "DDD HH:mm",
         showInLegend: true,
         legendText: data.responseJSON.city.name + " (" + data.responseJSON.city.country + ")",
         dataPoints: dataPoints
      }
      console.log(data);
      options.data.push(data);

      console.log(options);

    }
  });
}
