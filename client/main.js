
// var loopback = require('loopback')
// var User = loopback.User;
// app.model(User);

var options = {
    theme: 'snow'
};

var editor = new Quill('#editor', options);
var text = ''

editor.on('text-change', function() {
  text = editor.getText()
});

$('#analyze').on('click', function(){
var result1;
var result2;

$.when(
  //Natural Language API
    $.ajax({ 
        method: 'POST',
        url: `api/CoverLetters/naturalLanguage?access_token=test&text=${text}`, 
        success: function(language){     
                result1 = language;                  
        }           
    }),

//Tone Analysis API
    $.ajax({ 
        method: 'POST',
        url: `api/CoverLetters/tone?access_token=test&text=${text}`, 
        success: function(tone){                          
            result2 = tone;     
        }           
    })

).then(function() {
    // $('#result1').html(result1);
    // $('#result2').html(result2);
    console.log("LANG", result1, "TONE", result2)
})
})

$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
  })
})

$('#submitURL').on('click', function(e) {
  e.preventDefault()
  var urlString = e.target.previousElementSibling.value
  $.ajax({
    method: 'POST', 
    url: `api/CoverLetters/analyzeURL?access_token=test&urlString=${urlString}`
  })
  .then(function(data){
       console.log(data)
  })
})
