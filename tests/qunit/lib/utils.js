/**
 * Load script.
 *
 * @param args
 */
function load_js( args ) {

	args = args || {};

	if ( 'undefined' === typeof( args.src ) ) {
		return;
	}

	// Create 'script' object.
	var script_node = document.createElement( 'script' );
	script_node.async = args.async;
	if ( 'undefined' !== typeof( args.id ) ) {
		script_node.setAttribute('id', args.id);
	}
	script_node.setAttribute( 'src', args.src );

	if ( 'function' === typeof( args.onLoadHandler ) ) {
		script_node.onload = function() {
			args.onLoadHandler();
		};
	}

	// Add script to DOM.
	document.getElementsByTagName( 'script' )[0].parentNode.appendChild( script_node );
}

/**
 * Load CSS.
 *
 * @param args
 */
function load_css ( args ) {

	args = args || {};

	if ( 'undefined' === typeof( args.src ) ) {
		return;
	}

	// Create 'link' object.
	var	css_node = document.createElement( 'link' );
	css_node.setAttribute( 'type', 'text/css' );
	if ( 'undefined' !== typeof( args.id ) ) {
		css_node.setAttribute( 'id', args.id );
	}
	css_node.setAttribute( 'rel', 'stylesheet' );
	css_node.setAttribute( 'href', args.src );

	// Add CSS to DOM.
	document.getElementsByTagName( 'head' )[0].appendChild( css_node );
}

/**
 * Parse query string.
 *
 * @param {string} url
 * @return {object}
 * @constructor
 */
function CGI (url) {
	var query_string;
	if ( typeof(url) === 'undefined' || typeof(url) !== 'string' ) {
		url = document.location.search;
	}
	query_string = url.split(/\?/)[1];
	if ( query_string ) {
		this._search = query_string;
		var pairs = this._search.split(/\&+/);
		for ( var i = 0, l = pairs.length; i < l; i++ ) {
			var pair = pairs[i].split('=');
			for ( var y = 0, m = pair.length; y < m; y++ ) {
				pair[y] = pair[y].replace(/\+/g, ' ');
				pair[y] = pair[y].replace(/%([a-fA-F0-9][a-fA-F0-9])/g,
					function ($0,$1) {
						$1 = $1.toUpperCase();
						var h = '0123456789ABCDEF';
						var dec = 0;
						var a = 0;
						for ( var n = $1.length; n > 0; n-- ) {
							dec += h.indexOf($1.charAt(n-1)) * Math.pow(16,a);
							a++;
						}
						return String.fromCharCode(dec);
					} );
			}
			this[pair[0]] = pair[1];
		}
	}
	else {
		return {}
	}
}

/**
 * Build jQuery links.
 *
 * @param args
 */
function build_jquery_links( args ) {
	;( function( $ ) {
		args = $.extend( true, {
			targetSelector: '#qunit-fixture',
			versions: [],
			current: undefined,
			cdn: undefined
		}, args );
		$( document ).ready( function() {

			if ( args.versions.length ) {
				var $div = $( '<div/>').append( 'Switch to jQuery version: ' );
				$.each( args.versions, function ( i, el ) {
					if ( el === args.current ) {
						$div.append( $( '<b/>').append( el ) );
					}
					else {
					$div.append(
						$( '<a/>' )
							.append( el )
							.attr( 'href', '?jquery=' + el + '&cdn=' + ( args.cdn != 0 ? '1' : '0' ) )
						)
					}
					if ( i < args.versions.length	- 1 ) {
						$div.append( ' | ');
					}

				} );
				$( args.targetSelector ).after( $div );
			}
		} );
	} ( jQuery ) );
}

