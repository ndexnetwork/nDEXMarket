(function ($) {
  $(document).ready(function () {
    function defaultNavShow(key) {
	closeAddTabAccount();
	$('.navbar-default ul.navbar-right li a').removeClass('opened');
	$('.b_acc').removeClass('open');
	if( key == 'b_tokens' || key == 'b_chat'){
	    $('.menu_expand').removeClass('open');
	}else{
	    $('.menu_expand').addClass('open');
	}
	$('#' + key).addClass('open');
	$('.' + key).addClass('opened');
	$('#tokenGuidesDropdown .dropdown-menu').getNiceScroll().hide();
	$('#tokenGuidesDropdown .dropdown-menu').css({'display': 'none'});
	if (key != 'b_help') {
	    $('#b_help').getNiceScroll().hide();
	}
	if (key != 'b_accounts') {
	    $('#b_accounts').getNiceScroll().hide();
	}

    }

    $(document).on('click', '.navbar-default .navbar-toggle', function () {	
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	$('.b_acc').css({'min-height': (height - 70)+'px'});
	$('.b_acc_2').css({'min-height': (height - 70)+'px'});
	$('.li_accounts').detach().prependTo('#js_nav_menu');
	$('.li_current_accounts').detach().prependTo('#js_nav_menu');
	$('#tokenGuidesDropdown .dropdown-menu').css({'display': 'none'});
    });
    
    $(document).on('click', '.js_mode-light', function () {
	$('#bs-example-navbar-collapse-1').addClass('set_light');
    });

    $(document).on('click', '.js_mode-dark', function () {
	$('#bs-example-navbar-collapse-1').removeClass('set_light');
    });

    

    $(document).on('click', '.b_settings, .b_help, .b_contract , .b_accounts', function (e) {
	e.preventDefault();
	defaultNavShow($(this).data('key'));
    });

    $(document).on('click', '.menu_expand_after, #helpDropdown a, .back_mobile, #b_settings a, #connection a', function (e) {	
	if($(this).hasClass('back_mobile_prev')){
	    
	}else{
	    $('#b_settings, #b_help, #b_contract, #b_accounts, #tokenGuidesDropdown .dropdown-menu').removeClass('open');
	    $('.b_settings, .b_help, .b_contract, .b_accounts, .tokenGuidesDropdown').removeClass('opened');
	    $('#b_help').getNiceScroll().hide();
	    $('#b_accounts').getNiceScroll().hide();
	    $('.menu_expand').removeClass('open');
	}
	closeAddTabAccount();
    });

    $(document).on('click', '#js_nav_menu>li>a', function (e) {
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if(width < 992){
	    if(!$(this).hasClass('b_tokens')){
		$('.navbar-toggle').click();
	    }
	}
    });

    $(document).on('mouseleave', '#tokenGuidesDropdown .dropdown-menu', function () {
	$('#tokenGuidesDropdown .dropdown-menu').getNiceScroll().hide();
	$('#tokenGuidesDropdown .dropdown-menu').css({'display': 'none'});
    });

    $(document).on('click', '.b_chat', function (e) {
	defaultNavShow('b_chat');
    });
    $(document).on('click', '.b_tokens', function (e) {
	e.preventDefault();
	defaultNavShow('b_tokens');
	$('#tokenGuidesDropdown .dropdown-menu').css({'display': 'block'});
	$("#tokenGuidesDropdown .dropdown-menu").niceScroll({cursorborder: "#fff", cursorcolor: "#BBC5E4", autohidemode: false, railpadding: {top: 0, right: 3, left: 0, bottom: 0}, cursorminheight: 90});
    });

    $(document).on('click', '#tokenGuidesDropdown .dropdown-menu li', function (e) {
	$('#tokenGuidesDropdown .dropdown-menu').getNiceScroll().hide();
	$('#tokenGuidesDropdown .dropdown-menu').css({'display': 'none'});
    });

  

	$(document).on('click', '.b_contract', function () {
	    $('#connection .dropdown-menu li').each(function () {
		if (!$(this).hasClass('divider')) {
		    var caption = $(this).find('p').html();

		    if (typeof caption == 'undefined') {
			var title = $(this).find('span').html();
			if (typeof title != 'undefined') {
			    $(this).prepend('<p class="p_capt p_' + $(this).find('span').data('trn-key') + '">' + title + '</p>');
			    var span = $(this).find('span').text();
			    var aaa = $(this).find('a').html();
			    $(this).find('a').html(aaa.replace(':', ''));
			    var cont = $(this).find('a').text().replace(span, '');
			    $(this).find('a').addClass('a_capt a_' + $(this).find('span').data('trn-key'));
			    if (cont.length == 0) {
				if ($(this).find('span').data('trn-key') == 'etherscan_contract') {
				    $(this).find('a').append('Check Etherscan');
				}
				if ($(this).find('span').data('trn-key') == 'smart_contract_overview') {
				    $(this).find('a').append('Check Changelog');
				}
			    }
			} else {
			    var str = $(this).find('a').text();
			    $(this).find('a').text(str.replace(/\(.*/gi, ""));
			    var caption = str.replace(/.*\(/gi, "");
			    $(this).prepend('<p>' + caption.replace(/\).*/gi, "") + '</p>');
			}
		    }
		} else {
		    var caption = $(this).find('p').html();
		    if (typeof caption == 'undefined') {
			$(this).prepend('<p class="p_capt bold">Smart contract</p>');
		    }
		}
	    });
	});

	$(document).on('click', '.b_help', function () {
	    $('#helpDropdown .dropdown-menu li').each(function () {
		var caption = $(this).find('p').html();
		if (typeof caption == 'undefined') {
		    var title = $(this).find('span').html();
		    if (typeof title != 'undefined') {
			$(this).prepend('<p class="p_capt p_' + $(this).find('span').data('trn-key') + '">' + title + '</p>');
			$(this).find('a').addClass('a_capt a_' + $(this).find('span').data('trn-key'));

			if ($(this).find('span').data('trn-key') == 'chat') {
			    $(this).find('a').append('Start Chat');
			    $(this).find('p').addClass('bold');
			    $(this).find('a').addClass('btn-mode-dark');
			    $('<li role="separator" class="divider"><p class="p_capt bold">Social network</p></li>').insertAfter(this);
			} else if ($(this).find('span').data('trn-key') == 'mailing_list') {
			    $(this).find('a').append('Subscribe to list');
			    $(this).find('a').addClass('btn-mode-mailing_list');
			    $('<li role="separator" class="divider divider-empty"></li>').insertAfter(this);
			} else if ($(this).find('span').data('trn-key') == 'fees') {
			    $(this).find('a').append('Check our Fees');
			    $(this).find('p').addClass('bold');
			    $(this).find('p').removeClass('p_capt');
			    $(this).find('a').addClass('btn-mode-dark');
			    $('<li role="separator" class="divider divider-empty"></li>').insertAfter(this);
			} else if ($(this).find('span').data('trn-key') == 'Guides') {
			    $(this).find('p').addClass('bold');
			    $(this).find('a').append('Check our Guides');
			    $(this).find('a').addClass('btn-mode-dark');
			} else {
			    $(this).find('p').text($(this).find('p').text() + ' Screencast');
			    $(this).find('p').removeClass('p_capt');
			    $(this).find('a').append('Check guide');
			}

		    } else {
			var title = $(this).find('a').text();
			$(this).prepend('<p class="">' + title + '</p>');
			if (title == ' Reddit') {
			    $(this).find('a').text('Check our Guides');
			    $(this).find('a').addClass('btn-mode-Reddit');
			}
			if (title == ' YouTube') {
			    $(this).find('a').text('See our Channel');
			    $(this).find('a').addClass('btn-mode-YouTube');
			}
			if (title == ' Twitter') {
			    $(this).find('a').text('Start Chat');
			    $(this).find('a').addClass('btn-mode-Twitter');
			}
		    }
		}
	    });
	    $("#b_help").getNiceScroll().resize();
	});

	function checkNewRowAccounts() {
	    $('#accounts .dropdown-menu li').each(function () {
		var caption = $(this).find('p').html();
		if (typeof caption == 'undefined') {
		    var title = $(this).find('span').html();
		    if (typeof title != 'undefined') {
			if ($(this).find('span').data('trn-key') == 'new_account') {
			    $(this).prepend('<p class="p_capt bold">' + title + '</p>');
			    $(this).find('a').addClass('a_capt btn-mode-dark a_' + $(this).find('span').data('trn-key'));
			    $(this).find('a').append('Create Account');
			    $('<li role="separator" class="divider divider-empty"></li>').insertAfter(this);
			} else if ($(this).find('span').hasClass('badge')) {
			    $(this).addClass('a_change');
			/*} else if ($(this).find('span').data('trn-key') == 'ledger' ) {
			    $(this).css({'display':'none'});*/
			} else if ($(this).find('span').data('trn-key') == 'import_account' || $(this).find('span').data('trn-key') == 'gas_price' || $(this).find('span').data('trn-key') == 'ledger' ) {
			    $(this).prepend('<p class="p_capt bold">' + title + '</p>');
			    $(this).find('a').addClass('a_capt btn-mode-dark a_' + $(this).find('span').data('trn-key'));
			    $(this).find('a').append(title);
			    $('<li role="separator" class="divider divider-empty"></li>').insertAfter(this);
			} else {
			    $(this).addClass('no_show');			    
			}
		    } else {

		    }
		}
	    });
	}

	function checkCurrentAccounts() {	    
	    if ( $('#accounts a.dropdown-toggle').find('span').data('trn-key') == 'select_account' ){
		$('.li_current_accounts').html('');
	    }else{
		$('.li_current_accounts').html('<div class="text-center">'+$('#accounts a.dropdown-toggle').html()+'<span class="bage_capt">PRIVATE KEY</span></div>');
	    }	    
	}

	$('#accounts').bind("DOMSubtreeModified", function () {
	    checkCurrentAccounts();
	});

	$(document).on('click', '.b_accounts', function () {
	    var caption_block = $('#accounts p').html();
	    if (typeof caption_block == 'undefined') {
		$('#accounts').prepend('<p class="p_capt bold p_first">Created an Ethereum account</p>');
		$('<li role="separator" class="divider divider-empty"></li>').insertAfter('.p_first');
	    }
	    checkNewRowAccounts();

	    clearImportAccount();
	    clearGasPrice();
	    $("#b_accounts").getNiceScroll().resize();
	});

	$(document).on('click', '.a_gas_price', function () {
	    $('.ReactModalPortal .btn-default').click();
	    clearImportAccount();
	    var block = $('#accounts').find('div.block_gas_price').html();
	    if (typeof block == 'undefined') {
		$('.ReactModalPortal').css({'display': 'none'});

		addParent = this;
		$('<div class="block_gas_price"><div class="form-group"><label>Gas price (gwei)</label><input id="g_p_gas_price_gwei" type="text" class="form-control" value="4"></div><div class="modal-footer"><button type="button" class="btn btn-default">Cancel</button><button type="button" class="btn btn-primary" id="g_p_accountSubmit">Set gas price</button></div></div>').insertBefore(addParent);
		$(addParent).hide();

		setTimeout(function () {
		    $('#accountSubmit').closest('.ReactModalPortal').addClass('modal_hide');
		    $('.ReactModalPortal').removeAttr('style');
		}, 100);
	    } else {
		$('.a_gas_price').hide();
		$('.block_gas_price').show();
	    }

	    setTimeout(function () {
		$("#b_accounts").getNiceScroll().resize();
	    }, 300);
	});

	$(document).on('click', '#g_p_accountSubmit', function () {
	    $('#accountSubmit').closest('.modal-content').find('input').val($('#g_p_gas_price_gwei').val());
	    $('#accountSubmit').click();
	    clearGasPrice();
	});
	function clearGasPrice() {
	    $('.a_gas_price').show();
	    $('.block_gas_price').hide();
	}
	$(document).on('click', '.block_gas_price .btn-default', function () {
	    $('.ReactModalPortal .btn-default').click();
	    clearGasPrice();
	});

	$(document).on('click', '.a_import_account', function () {
	    $('.ReactModalPortal .btn-default').click();
	    clearGasPrice();
	    var block = $('#accounts').find('div.block_import_account').html();
	    if (typeof block == 'undefined') {
		$('.ReactModalPortal').css({'display': 'none'});
		addParent = this;
		$('<div class="block_import_account"><div class="form-group"><label>Address</label><input id="i_a_address" type="text" class="form-control" placeholder="0x..."></div><div class="modal-body"><div class="form-group"><label>Private key</label><input id="i_a_private_key" type="text" class="form-control" placeholder="0x..."></div></div><div class="modal-footer"><button type="button" class="btn btn-default">Cancel</button><button type="button" class="btn btn-primary" id="i_a_accountSubmit">Import account</button></div></div>').insertBefore(addParent);
		$(addParent).hide();

		setTimeout(function () {
		    $('#accountSubmit').closest('.ReactModalPortal').addClass('modal_hide');
		    $('.ReactModalPortal').removeAttr('style');
		}, 100);
	    } else {
		$('.a_import_account').hide();
		$('.block_import_account').show();
	    }

	    setTimeout(function () {
		$("#b_accounts").getNiceScroll().resize();
	    }, 300);
	});

	$(document).on('click', '#i_a_accountSubmit', function () {
	    $('#accountSubmit').closest('.modal-content').find('input').val($('#i_a_address').val());
	    $('#accountSubmit').closest('.modal-content').find('#pkDiv').find('input').val($('#i_a_private_key').val());
	    $('#accountSubmit').click();
	    clearImportAccount();
	});

	function clearImportAccount() {
	    $('.block_import_account input').val('');
	    $('.a_import_account').show();
	    $('.block_import_account').hide();
	}
	$(document).on('click', '.block_import_account .btn-default', function () {
	    $('.ReactModalPortal .btn-default').click();
	    clearImportAccount();
	});
        
        $(document).on('click', '.ajs-button.btn-danger', function () {
	    if($(this).text() == 'Yes, forget account'){
                setTimeout(function () {
                    $('.ajs-dialog').find('.ajs-close').click();
                    closeAddTabAccount();
                },300);
            }	    
	});
	
	function showAddTabAccount () {

	    $('.b_acc_2').html('');
	    $('.b_acc_2').append('<p class="acc_2_caption">Current Ethereum account </p>');
	    $('.b_acc_2').append('<div class="acc_2_test"></div>');
	    var test = 0;
	    $('#accounts .dropdown-menu li.no_show').each(function () {
		if(test == 0){
		    $(this).css({'display':'none'});
		    $('.acc_2_test').append(this);
		    $('.acc_2_test').append('<p class="acc_2_label">Address</p>');
		    var str = $(this).children('a').attr('href');	
		    $('.acc_2_test').append('<a class="acc_addr">'+str.replace(/.*\//gi, "")+'</a>');
		    test++;
		}else if(test == 1){
		    $('.acc_2_test').append('<p class="acc_2_label">Private key</p>');
		    $(this).children('a').addClass('btn-mode-dark');
		    $(this).children('a').children('span').text('Export private key');
		    $('.acc_2_test').append(this);
		    test++;
		}else{
                    $('.acc_2_test').append('<p class="acc_2_label">Forget account</p>');
		    $(this).children('a').addClass('btn-mode-dark');
		    $(this).children('a').children('span').text('Forget account!');
		    $('.acc_2_test').append(this);
		    test++;
                    
		    //$(this).css({'display':'none'});                    
		    //$('.acc_2_test').append(this);
		    //test++;
		}

	    });
	    $('.b_acc_2').append('<p class="acc_2_label acc_2_description">***Please BACKUP the private key for this account</p>');
	    $('.b_acc_2').append('<a class="a_capt btn-mode-dark acc_2_ok">Ok</a>');
	    $('.b_acc_2').append('<p class="acc_2_divider"></p>');

	    showMobAddTabAccount ();
	    $('.b_acc_2').show();
	}

	$(document).on('click', '.a_ledger', function () {
	    
	    $('.ReactModalPortal .btn-default').click();
	    $('.ReactModalPortal').css({'display': 'none'});
            
	    setTimeout(function () {
		    $('.modal-body .ad').closest('.ReactModalPortal').addClass('modal_hide');
		    $('.ReactModalPortal').removeAttr('style');
		    $('.b_acc_2').html('');
		    $('.b_acc_2').append($('#ledger_add').html());
		    showMobAddTabAccount ();
		    $('.b_acc_2').show();
	    }, 350);
	});

	function showMobAddTabAccount (){
	    $('.back_mobile').addClass('back_mobile_prev');
	    $('.menu_expand').addClass('back_mobile_prev');
	}

	function closeAddTabAccount (){
	    $('.acc_2_test li.no_show').each(function () {
		$('#accounts .dropdown-menu').append(this);
	    });
	    $('.back_mobile').removeClass('back_mobile_prev');
	    $('.menu_expand').removeClass('back_mobile_prev');
	    $('.b_acc_2').hide();
	    $('.b_acc_2').hide();
	}

	$(document).on('click', '.acc_2_ok', function () {
	    closeAddTabAccount();
	});

	$(document).on('click', '#accounts .dropdown-menu li', function () {
	    closeAddTabAccount();
	});
	
	$(document).on('click', '.a_change', function () {	    	    
	    setTimeout(function () {
		showAddTabAccount();
	    }, 300);
	});

	
	$(document).on('click', '.a_new_account', function () {
	    closeAddTabAccount();
	    setTimeout(function () {
		checkNewRowAccounts();
		showAddTabAccount();
		$("#b_accounts").getNiceScroll().resize();
	    }, 300);
	});

	var scrollDiv = {cursorborder: "#fff", cursorcolor: "#3E3F54", autohidemode: false, railpadding: {top: 0, right: 3, left: 0, bottom: 0}, cursorminheight: 90};	

	$("#b_help").niceScroll(scrollDiv);
	$("#b_accounts").niceScroll(scrollDiv);
	$(".height2").niceScroll(scrollDiv);
        $(".height3").niceScroll(scrollDiv);
	$(".height7").niceScroll(scrollDiv);
	$(".height6").niceScroll(scrollDiv);
	$("#orders").niceScroll(scrollDiv);
	$("#volume").niceScroll(scrollDiv);

	$('#tokensDropdown').on('show.bs.dropdown', function () {
	    $(this).find('.dropdown-menu').niceScroll(scrollDiv);
	});
	$('#tokensDropdown').on('hide.bs.dropdown', function () {
	    $(this).find('.dropdown-menu').getNiceScroll().hide();
	});

	$('#orders').bind("DOMSubtreeModified", function () {
	    $("#orders").getNiceScroll().resize();
	    $('.buy').each(function () {
		$(this).closest('.clickable-row').filter('td.span').css({'color': 'red'});
	    });
	});

	$('#volume').bind("DOMSubtreeModified", function () {
	    $("#volume").getNiceScroll().resize();
	});

	$('.height2').bind("DOMSubtreeModified", function () {
	    $(".height2").getNiceScroll().resize();
	});
        
        $('.height3').bind("DOMSubtreeModified", function () {
	    $(".height3").getNiceScroll().resize();
	});

	$('#balance').bind("DOMSubtreeModified", function () {
	    $(".height4").niceScroll(scrollDiv);
	    $(".height4").getNiceScroll().resize();	    
	});

	$('.height7').bind("DOMSubtreeModified", function () {
	    $(".height7").getNiceScroll().resize();
	});

	$('.height6').bind("DOMSubtreeModified", function () {
	    $(".height6").getNiceScroll().resize();
	});

	$(document).on('click', '.rectangle-min', function () {
	    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	    if(width < 992){
		rowColumMobile($(this).data('r_1'),$(this).data('r_2'),$(this).data('position'));
	    }else{
		rowColum($(this).data('r_1'),$(this).data('r_2'),$(this).data('position'));
	    }
	});

	var paramsBlock = {
	    'balance':'.height4',
	    'new_order':'.height3'
	};

	function rowColumMobile(first, second, type) {

	    var top = second;
	    if (type == 'top') {
		top = first;
	    }
	    if ($('.bl-' + top).hasClass('collapse_block')) {
		$('.bl-' + top).removeClass('collapse_block');
		$('.bl-' + top + ' .row-container').removeClass('hide_block_auto');
		$('#' + top).show();
		$('.bl-' + top + ' .row-box').show();
	    } else {
		$('#' + top).hide();
		$('.bl-' + top + ' .row-box').hide();
		$('.bl-' + top).addClass('collapse_block');
		$('.bl-' + top + ' .row-container').addClass('hide_block_auto');
	    }

	}

	function rowColum(top,bot,type){	    
	    if(type == 'top'){
		if($('.bl-'+top).hasClass('collapse_block')){
		    $('.bl-'+top).removeClass('collapse_block');
		    $('.bl-'+bot).removeClass('full_block_to_top');
		    $('.bl-'+top+' .row-container').removeClass('hide_block_auto');
		    $('.bl-'+bot+' .row-container').removeClass('full_block');
		    $(paramsBlock[bot]).removeClass('col_full');
		    $(paramsBlock[bot]).getNiceScroll().resize();
		    if($('.bl-'+bot).hasClass('collapse_block')){
			$('.bl-'+bot).removeClass('full_block_to_top');
			$('.bl-'+bot+' .row-container').removeClass('full_block');
			$(paramsBlock[bot]).removeClass('col_full');
			$(paramsBlock[bot]).getNiceScroll().resize();
			$('.bl-'+bot).removeClass('collapse_block');
			$('#'+bot).show();
			$('.bl-'+bot+' .row-box').show();
		    }
		    $('#'+top).show();
		    $('.bl-'+top+' .row-box').show();
		}else{
		    if($('.bl-'+top).hasClass('full_block_to_top')){
			$('.bl-'+top).removeClass('full_block_to_top');
			$('.bl-'+top+' .row-container').removeClass('full_block');
			$(paramsBlock[top]).removeClass('col_full');
			$(paramsBlock[top]).getNiceScroll().resize();
		    }
		    $('#'+top).hide();
		    $('.bl-'+top+' .row-box').hide();
		    $('.bl-'+top).addClass('collapse_block');
		    $('.bl-'+top+' .row-container').addClass('hide_block_auto');
		    $('.bl-'+bot).addClass('full_block_to_top');
		    $('.bl-'+bot+' .row-container').addClass('full_block');
		    $(paramsBlock[bot]).addClass('col_full');
		    $(paramsBlock[bot]).getNiceScroll().resize();
		    $('#'+bot).show();
		    $('.bl-'+bot+' .row-box').show();
		}
	    }else{
		if($('.bl-'+bot).hasClass('collapse_block')){
		    $('.bl-'+bot).removeClass('collapse_block');
		    $('.bl-'+top).removeClass('full_block_to_top');
		    $('.bl-'+bot+' .row-container').removeClass('hide_block_0');
		    $('.bl-'+top+' .row-container').removeClass('full_block');
		    $(paramsBlock[top]).removeClass('col_full');
		    $(paramsBlock[top]).getNiceScroll().resize();
		    if($('.bl-'+top).hasClass('collapse_block')){
			$('.bl-'+top).removeClass('full_block_to_top');
			$('.bl-'+top+' .row-container').removeClass('full_block');
			$(paramsBlock[top]).removeClass('col_full');
			$(paramsBlock[top]).getNiceScroll().resize();
			$('.bl-'+top).removeClass('collapse_block');
			$('#'+top).show();
			$('.bl-'+top+' .row-box').show();
		    }
		    $('#'+bot).show();
		    $('.bl-'+bot+' .row-box').show();
		}else{
		    if($('.bl-'+bot).hasClass('full_block_to_top')){
			$('.bl-'+bot).removeClass('full_block_to_top');
			$('.bl-'+bot+' .row-container').removeClass('full_block');
			$(paramsBlock[bot]).removeClass('col_full');
			$(paramsBlock[bot]).getNiceScroll().resize();
		    }
		    $('#'+bot).hide();
		    $('.bl-'+bot+' .row-box').hide();
		    $('.bl-'+bot).addClass('collapse_block');
		    $('.bl-'+bot+' .row-container').addClass('hide_block_0');
		    $('.bl-'+top).addClass('full_block_to_top');
		    $('.bl-'+top+' .row-container').addClass('full_block');
		    $(paramsBlock[top]).addClass('col_full');
		    $(paramsBlock[top]).getNiceScroll().resize();
		    $('#'+top).show();
		    $('.bl-'+top+' .row-box').show();
		}
	    }

	}

    });

})(jQuery);