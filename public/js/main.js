$(document).ready(function(){

	// Show todos in todo list
	function showTodos(todos){
		var html = '';
		for(var i = 0; i < todos.length; i++){
			html += '<li id="' + todos[i]._id + '"class="list-group-item"><span class="theText">' + todos[i].text + '</span>' + 
			' <a href="#" class="delete btn btn-xs btn-danger pull-right"><i class="fa fa-remove"></i></a>' + 
			'<a href="#" class="edit btn btn-info btn-xs pull-right"><i class="fa fa-edit"></i></a></li>';
		}

		$('#todoList').html(html);
	}

	// Removes item in todo list
	function removeItem(id){
		var idSent = id;
		$.ajax({
			url: '/api/todos/' + id,
			type: 'DELETE',
			success: function(res){
		        $('#' + idSent).remove();
				$.bootstrapGrowl('Task successfully removed.', {
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
	};

	// Getting todo list
	$.ajax({
		url: '/api/todos',
		type: 'GET',
		success: function(res){
			showTodos(res);
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
	 * Event Handlers
	 */

	// Form handling for adding a new todo item
	$('#form').submit(function(e){
		e.preventDefault;
		$.ajax({
			url: '/api/todos',
			type: 'POST',
			data: {
				text: $('input').val().trim()
			},
			success: function(res){
				$('#todoList').append('<li id="' + res._id + '"class="list-group-item"><span class="theText">' + res.text + '</span> <a href="#" class=" delete btn btn-danger btn-xs pull-right"><i class="fa fa-remove"></i></a><a href="#" class="edit btn btn-info btn-xs pull-right"><i class="fa fa-edit"></i></a></li>');
				$('input').val('');
				$.bootstrapGrowl('Task successfully added.', {
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
		return false;
	});

	// Handling the click on remove button
	$('ul').on('click', '.delete', function(e) {
		var itemToDelete = $(e.currentTarget).parent().attr('id');
		removeItem(itemToDelete);
	});

	// Handling the click on edit button
	$('ul').on('click', '.edit', function(e){
		var theItem = $(e.currentTarget);
		if ( typeof(theItem.parent().children('span').attr('contenteditable')) !== 'undefined') {
			$.ajax({
				url: '/api/todos/' + theItem.parent().attr('id'),
				type: 'PUT',
				data: {
					_id: theItem.parent().attr('id'),
					text: theItem.parent().children('span').text()
				},
				success: function(res){
					theItem.parent().children('span').removeAttr('contenteditable');
					theItem.removeClass('btn-success').addClass('btn-info');
					theItem.children('i').removeClass('fa-save').addClass('fa-edit');

					$.bootstrapGrowl('Task successfully updated.', {
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
		} else {
			theItem.parent().children('span').attr('contenteditable', true);
			theItem.removeClass('btn-info').addClass('btn-success');
			theItem.children('i').removeClass('fa-edit').addClass('fa-save');
		}
	});
});