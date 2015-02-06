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
      console.log('Fetched the todos!');
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

    $('#todoList').append(html);
    $('input').val('');
  });

  // Remove collection event
  collection.on('remove', function(model){
    $('#' + model.get('_id')).remove();
  });

  // Removes item in todo list
  function removeItem(id){
    var model = collection.findWhere({_id: id});
    model.destroy();
  }

  // Handles the form submission
  $('#form').submit(function(e){
    e.preventDefault();

    collection.create({
      text: $('input').val().trim()
    }, { wait: true });
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
