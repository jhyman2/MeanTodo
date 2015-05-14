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

    html += '<li>' +
      '<div id="' + model.get('_id') + '" class="collapsible-header"><i class="mdi-image-filter-drama"></i>' + model.get('text') + '</div>'+
      '<div class="collapsible-body"><p>' + model.get('text') + '</p></div>'+
    '</li>';

    // html += '<li id="' + model.get('_id') + '"class="list-group-item">' +
    // '<span class="theText">' + model.get('text') + '</span>' +
    // '<a href="#" class="delete btn btn-danger btn-xs pull-right"><i class="fa fa-remove"></i></a>' +
    // '<a href="#" class="edit btn btn-info btn-xs pull-right"><i class="fa fa-edit"></i></a>' +
    // '</li>';

    $('#todoList').prepend(html);
    $('input').val('');

    $('.collapsible').collapsible({
      accordion : false
    });
  });

  // Remove collection event
  collection.on('remove', function(model){
    $('#' + model.get('_id')).remove();
  });

  // Update collection event
  collection.on('change', function(model){
    var item = $('#' + model.get('_id'));

    item.children('span').removeAttr('contenteditable');
    item.children('.edit').removeClass('btn-success').addClass('btn-info');
    item.children('.edit').children('i').removeClass('fa-save').addClass('fa-edit');
  });

  // Removes item in todo list
  function removeItem(id){
    var model = collection.findWhere({_id: id});
    model.destroy();
  }

  // Updates an item
  function updateItem(id, text){
    var model = collection.findWhere({'_id': id});
    model.set('text', text);
    model.save();
  }

  // Handles the form submission
  $('#form').submit(function(e){
    e.preventDefault();

    collection.create({ text: $('input').val().trim() },
    {
      wait: true,
      error: function(model){
        $.bootstrapGrowl('Failed to add model.', {
          type: 'danger',
          align: 'center',
          width: 'auto',
          allow_dismiss: false
        });
      }
    });
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
      updateItem(theItem.parent().attr('id'), theItem.parent().children('span').text());
    }else{
      theItem.parent().children('span').attr('contenteditable', true);
      theItem.removeClass('btn-info').addClass('btn-success');
      theItem.children('i').removeClass('fa-edit').addClass('fa-save');
    }
  });
});
