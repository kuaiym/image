/*
 * jQuery File Upload Plugin JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global $, window */

$(function () {
    'use strict';
    $('#fileupload').fileupload({
        url: 'server/php/',
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		maxFileSize: 99 * 1024 * 1024,
		minFileSize: 5,
		maxNumberOfFiles: 50,
		messages: {
			maxFileSize: '文件大小不能超过' + 99 * 1024 * 1024 + 'MB',
			acceptFileTypes: '不允许的文件类型'
		},
		processfail: function (e, data){
			var currentFile = data.files[data.index];
			if (data.files.error && currentFile.error) {
				console.log(currentFile.error);
			}
		}
    });
	// Load existing files:
	$('#fileupload').addClass('fileupload-processing');
	$.ajax({
		url: $('#fileupload').fileupload('option', 'url'),
		dataType: 'json',
		context: $('#fileupload')[0]
	}).always(function () {
		$(this).removeClass('fileupload-processing');
	}).done(function (result) {
		$(this).fileupload('option', 'done').call(this, $.Event('done'), {result: result});
	});
});
