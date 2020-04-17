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
      $.each(data.responseJSON.list, function(index, value) {
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
    }
  });
}
