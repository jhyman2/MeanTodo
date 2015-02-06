$(document).ready(function(){

  // Model
  Todo = Backbone.Model.extend({
    idAttribute: '_id'
  });

  // Collection
  Todos = Backbone.Collection.extend({
    url: '/api/todos',
    model: Todo
  });

  // Fetching backbone collection
  var collection = new Todos();

  collection.fetch({
    success: function(){
      showTodos();
    },
    error: function(err){
      $.bootstrapGrowl(err.responseText, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        allow_dismiss: false
      });
    }
  });

  /**
   * Backbone Collection Events
   */

  // Add new item to list
  collection.on('add', function(model){
    var html = '';

    html += '<li id="' + model.get('_id') + '"class="list-group-item">' + 
    '<span class="theText">' + model.get('text') + '</span>' + 
    '<a href="#" class="delete btn btn-danger btn-xs pull-right"><i class="fa fa-remove"></i></a>' +
    '<a href="#" class="edit btn btn-info btn-xs pull-right"><i class="fa fa-edit"></i></a>' +
    '</li>';

    $('#todoList').html(html);
  });

  // Removes item in todo list
  function removeItem(id){
    var idSent = id;
    $.ajax({
      url: '/api/todos/' + id,
      type: 'DELETE',
      success: function(res){
        $('#' + idSent).remove();
        $.bootstrapGrowl('Item successfully removed.', {
          type: 'success',
          align: 'center',
          width: 'auto',
          allow_dismiss: true
        });
      },
      error: function(err){
        $.bootstrapGrowl(err.responseText, {
          type: 'danger',
          align: 'center',
          width: 'auto',
          allow_dismiss: true
        });
      } 
    });
  }

  /**
   * Event handlers this file changed.
   */

  // Handles the form submission
  $('#form').submit(function(e){
    e.preventDefault();

    collection.create({
      text: $('input').val().trim()
    });


    // $.ajax({
    //   url: '/api/todos',
    //   type: 'POST',
    //   data: {
    //     text: $('input').val().trim()
    //   },
    //   success: function(res){
    //     $('#todoList').append('<li id="' + res._id + '"class="list-group-item">' + 
    //       '<span class="theText">' + res.text + '</span>' + 
    //       ' <a href="#" class="delete btn btn-danger btn-xs pull-right"><i class="fa fa-remove"></i></a>' +
    //       '<a href="#" class="edit btn btn-info btn-xs pull-right"><i class="fa fa-edit"></i></a>' +
    //       ' </li>');
    //     $('input').val('');
    //   },
    //   error: function(err){
    //     $.bootstrapGrowl(err.responseText, {
    //       type: 'danger',
    //       align: 'center',
    //       width: 'auto',
    //       allow_dismiss: false
    //     });
    //   }
    // });
    return false;
  });

  // Handling the click on remove button
  $('ul').on('click', '.delete', function(e){
    var itemToDelete = $(e.currentTarget).parent().attr('id');
    removeItem(itemToDelete);
  });

  // Handling the click on edit button
  $('ul').on('click', '.edit', function(e){
    var theItem = $(e.currentTarget);

    if(typeof(theItem.parent().children('span').attr('contenteditable')) !== 'undefined'){
      $.ajax({
        url: '/api/todos/' + theItem.parent().attr('id'),
        type: 'PUT',
        data: {
          text: theItem.parent().children('span').text()
        },
        success: function(res){
          theItem.parent().children('span').removeAttr('contenteditable');
          theItem.removeClass('btn-success').addClass('btn-info');
          theItem.children('i').removeClass('fa-save').addClass('fa-edit');
          $.bootstrapGrowl('Successfully updated.', {
            type: 'success',
            align: 'center',
            width: 'auto',
            allow_dismiss: false
          });
        },
        error: function(err){
          $.bootstrapGrowl(err.responseText, {
            type: 'danger',
            align: 'center',
            width: 'auto',
            allow_dismiss: false
          });
        }
      });
    }else{
      theItem.parent().children('span').attr('contenteditable', true);
      theItem.removeClass('btn-info').addClass('btn-success');
      theItem.children('i').removeClass('fa-edit').addClass('fa-save');
    }
  });
});
