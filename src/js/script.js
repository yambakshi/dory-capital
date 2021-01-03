$(window).on('load', function () {
  $('#video-popup').modal('hide');
});

$('#video-popup').on('shown.bs.modal', function () {
  $('.train-video1')[0].play();
});

$('#video-popup').on('hidden.bs.modal', function () {
  $('.train-video1')[0].pause();
});