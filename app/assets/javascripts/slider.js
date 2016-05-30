$(document).ready(function() {

  $.ajax({
    type: "POST",
    url: "/get_config",
    success: function(data) {
      $("#parent_slider").slider('value', data['parent_slider_init']);
      init_child_sliders(data['parent_slider_init'])
      init_child_sliders_positions(data['child_slider_init'])
    }
  })

  $('#parent_slider').slider({
    max: 10,
    slide: function( event, ui ) {
      $.ajax({
        type: "POST",
        url: '/set_parent_slider_value',
        data: { slider: ui.value }
      }).done(function() {
        generate_n_sliders(ui.value)
      });
    }
  });

  // $('.child_slider').slider({
  //   slide: function( event, ui ) {
  //     $.ajax({
  //       type: "POST",
  //       url: '/set_child_slider_value',
  //       data: { slider: ui.value }
  //     })
  //   }
  // });

  function generate_n_sliders(n) {
    $('#child_sliders_info').text('Total Child Sliders ' + n);
    total_sliders_available = $('.child_slider').length
    if(total_sliders_available < n) {
      sliders_to_add = n - total_sliders_available
      for (i = 0; i < sliders_to_add; i++) {
        $('#child_sliders').append("<div class='child_slider'></div>")
        create_slider(total_sliders_available + i + 1)
      }
      $('.child_slider').slider({
        max: 10
      });
    }
    else if(total_sliders_available > n) {
      sliders_to_remove = total_sliders_available - n
      for(i = 0; i < sliders_to_remove; i++) {
        total_child_sliders = $('.child_slider').length
        $('.child_slider')[total_child_sliders-1].remove()
      }
    }
  }

  function init_child_sliders(child_sliders) {
    $('#child_sliders_info').text('Total Child Sliders ' + child_sliders);
    for (i = 0; i < child_sliders; i++) {
      $('#child_sliders').append("<div class='child_slider' data-count=" + (i + 1) + "></div>")
    }
    $('.child_slider').slider({
      max: 10,
      value: $(this).attr('data-count'),
      slide: function( event, ui ) {
        $.ajax({
          type: "POST",
          url: '/set_child_slider_value',
          data: { value: ui.value, count: $(this).attr('data-count') }
        })
      }
    });
  }

  // function init_child_sliders_positions(child_slider_init) {
  //   $('.child_slider').each(function(index) {
  //     $(this).slider('value', child_slider_init[index]);
  //   })
  // }

  function create_slider(nth) {
    $.ajax({
      type: "POST",
      url: '/create_slider',
      data: { count: nth }
    })
  }

})
