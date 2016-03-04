'use strict';

$(document).ready(init);

function init() {
  $('#emailClick').on('click', getEmail);
  $('#squareClick').on('click', getSquare);
  $('#sumClick').on('click', getSum);
  $('#sentClick').on('click', getSent);
  $('#bdayClick').on('click', getBday);
}


function getEmail() {
  console.log('email click');
  var emailUrl = $('#email').val();
  console.log('email click', emailUrl);

  var location = "http://localhost8000/email/"
  var url = location + emailUrl;

  $.ajax({
    url: url,
    type: "GET",
    succcess: function(data) {
      data = JSON.parse(data);
      var image = data.url;
      var $image = $("<img>").attr("src", image).addClass("image");
      $("#gravatar").append(image);
    }
  })
}

function getSquare() {
  var squareUrl = $('#square').val();
  console.log(squareUrl);
  var location = "http://localhost8000/square/";
  var url = location + squareUrl;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      var square = $('<p>').text(data);
      $("#squareOutput").append(square);
    }
  })
}

function getSum() {
  var sumUrl = $('#sum').val();
  var location = "http://localhost8000/sum/";
  var url = location + sumUrl;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      var sum = $('<p>').text(data);
      $("#sumOutput").append(sum);
    }
  })
}

function getSent() {
  var sentUrl = $("#sent").val()
  var location = "http://localhost:8000/sentence/"
  var url = location + sentUrl;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      var wordCount = $('<p>').text('Total Words ' + data.wordCount);
      var letterCount = $('<p>').text('Total Letters ' + data.letterCount);
      var avgWordCount = $('<p>').text('Avg. Word Length ' + data.avgWordCount);
      $("#wordOutput").append(wordCount);
      $("#letterOuput").append(letterCount);
      $("#avgOutput").append(avgWordCount);
    }
  })
}

function getBday() {
  var bday = $("#bday").val();
  var location = "http://localhost:8000/birthday/";
  var url = location + bday;

  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      data = JSON.parse(data);
      var output = $('<p>').text("Date: " + data.date);
      $("#bdayOutput").append(output);
    }
  })
}
