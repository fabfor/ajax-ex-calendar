$(document).ready(function(){
  moment.locale('fr');
  var mese = "01";
  var country = "IT";

  generateDays();

  $('#next').click(function(){
    mese = parseInt(mese) + 1;
    generateDays();
  });

  $('#prev').click(function(){
    mese = parseInt(mese) - 1;
    generateDays();
  });

  function generateDays(){
    var date = moment("2017-"+mese+"-01");
    //
    var giorni = date.daysInMonth(); //quanti giorni in un mese
    var meseinlettere = date.format("MMMM"); //mese in lettere

    $('#container').html('');
    for (var i = 1; i <= giorni; i++) {
      var day = moment("2017-"+mese+"-"+i);
      $('#container').append('<div class="date-item" dateymd="'+day.format('YYYY-MM-DD')+'">'+i+' '+meseinlettere+'</div>');
    }

    $.ajax({
      url:"https://holidayapi.com/v1/holidays",
      method:"GET",
      data:{
        key:'616919fd-f3f5-44cf-8c42-17288d0d9178',
        country: country,
        year: 2017,
        month: mese,
      },
      success: function(data){
        for (var i = 0; i < data.holidays.length; i++) {
          var festaymd = data.holidays[i].date;
          $('.date-item').each(function(){
            if ($(this).attr('dateymd') == festaymd){
              $(this).addClass('red');
            }
          });
        }
      }
    });
  }

});
