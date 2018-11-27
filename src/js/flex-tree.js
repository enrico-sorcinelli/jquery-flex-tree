/**
 * @file This file contains jQuery Flex Tree
 * @author Enrico Sorcinelli
 * @version 1.1.0
 * @title jQuery plugin for interactive trees
 */

/**
 * jQuery plugin for builfing interactive tree.
 *
 * @param {object}  args
 * @param {array}   args.items                   - Tree items. Each item should be an object with follwing keys:
 *                                                 `label`, `value`, `id`, `checked` and `name`.
 * @param {boolean} [args.build=true]            - Build html structure.
 * @param {object}  [args.targetElement=$(this)] - jQuery target element object.
 * @param {boolean} [args.debug=false]           - Debug mode.
 * @param {string}  [args.type]                  - Type of `<input>`. Default to `undefined` (no input controls).
 * @param {string}  [args.name=flex_tree]          - Name of `input` elements.
 * @param {string}  [args.className=flex-tree]   - Class name widget.
 * @param {boolean} [args.collapsable=true]      - Make tree collapsable.
 * @param {boolean} [args.collapsed=false]       - Collapsed tree on load.
 *
 * @return object
 */
;( function( $ ) {
	var pluginName = 'flexTree',
		defaults = {};

	$.fn[ pluginName ] = function( args ) {

		// Default arguments.
		args = $.extend( true, {
			id: undefined,
			targetElement: $(this),
			type: undefined,
			debug: false,
			name: 'flex_tree',
			items: {},
			className: 'flex-tree',
			buildTree: true,
			collapsed: false,
			collapsable: true
		}, defaults, args );

		if ( false === args.collapsable ) {
			args.collapsed = false;
		}

		var $root;

		// Build tree.
		if ( args.buildTree ) {

			$root = $( '<ul/>')
				.attr( 'class', args.className )
				.attr( 'id', args.id );

			/**
			 * Build tree
			 *
			 * @param args
			 */
			var build_flex_tree = function( args ) {
				args = $.extend( true, {
					items: {},
					ul: $root,
					collapsed: false,
					collapsable: true
				}, args );
				$.each( args.items, function( idx, el ) {

					// Create node element.
					if ( 'object' === typeof( el.childrens ) && el.childrens.length ) {

						var $li = $( '<li/>' );

						// Only for input checkbox.
						if ( 'checkbox' === args.type ) {
							$li.append( $( '<input/>' )
								.attr( 'type', args.type )
								.attr( 'name', el.name )
								.attr( 'value', el.value )
								.attr( 'class', 'node' )
								.attr( 'id', el.id )
								.prop( 'checked', el.checked )
							);
						}

						$li.append( $( '<span class="node"/> ' )
							.addClass( args.collapsable ? ( args.collapsed ? 'open' : 'closed' ) : '' )
							.append( $( '<label/>' ).append(  el.label ).attr( 'class', 'node' ) )
						);

						var $ul = $( '<ul/>' );
						args.ul.append( $li );
						$li.append( $ul );
						if ( true === args.collapsed ) {
							$ul.hide();
						}

						// Build children nodes.
						build_flex_tree( {
							items: el.childrens,
							name: args.name,
							ul: $ul,
							collapsed: args.collapsed,
							collapsable: args.collapsable,
							type: args.type
						} );
					}
					// Create leaf element.
					else {
						args.ul.append(
							$( '<li/>' )
								.append( $( '<label/>' )
									.append( typeof( args.type ) !== 'undefined' ?
										$( '<input/>' )
											.attr( 'type', args.type )
											.attr( 'name', 'checkbox' === args.type ? ( el.name || args.name ) : args.name )
											.attr( 'value', el.value )
											.attr( 'class', 'leaf' )
											.attr( 'id', el.id )
											.prop( 'checked', el.checked )
										: undefined
									).
									append( el.label )
								)
						);
					}
				} );
			};

			// Build tree.
			build_flex_tree( args );

			$( args.targetElement ).append( $root );
		}
		else {
			$root = args.targetElement;
			$root.addClass( args.className );
		}

		// Handle toggle childrens of parent node item.
		if ( args.collapsable ) {
			$( 'li span.node', $root ).on( 'click', function( e ) {
				$( this )
					.toggleClass( 'closed' )
					.toggleClass( 'open' )
					.next().toggle( 200 );

			} );
		}

		// Events only for input checkbox.
		if ( 'checkbox' === args.type ) {

			// Check all/none over node item.
			$( 'input[type="checkbox"].node', $root ).on( 'click', function( e ) {

				// Remove third state.
				$( this ).removeClass( 'indeterminate' )
					.prop( 'indeterminate', false );

				var $cb = $( this );
				$cb.parent().find( 'ul input[type="checkbox"]' ).each( function() {
					$( this ).prop( 'checked', $cb.prop( 'checked' ) )
						.prop( 'indeterminate', false )
						.removeClass( 'indeterminate' );
				} );

			} );

			// Check items by traversing tree.
			var check_all_checkbox = function() {

				// Find first parent node.
				var $node_cb = $( this ).closest( 'ul' ).prevAll( 'input[type="checkbox"].node' );

				// Is parent node
				if ( $node_cb.length ) {

					// Remove checkall from parent node.
					if ( ! $( this ).prop( 'checked' ) ) {
						$node_cb.prop( 'checked', false );
					}

					var all_is_checked = $( this ).prop( 'checked' ),
						some_is_checked = $( this ).prop( 'checked' );

					// Compute siblings status.
					$( this ).closest( 'li' ).siblings( 'li' ).find( 'input:first' ).each( function() {

						if ( ! $( this ).prop( 'checked' ) || true === $( this ).prop( 'indeterminate') ) {
							all_is_checked = false;
						}
						if ( $( this ).prop( 'checked' ) || true === $( this ).prop( 'indeterminate') ) {
							some_is_checked = true;
						}
					} );

					if ( some_is_checked || true === $( this ).prop( 'indeterminate') ) {
						$node_cb.addClass( 'indeterminate' )
							.prop( 'indeterminate', true );
					}
					else {
						$node_cb.removeClass( 'indeterminate' )
							.prop( 'indeterminate', false );
					}

					if ( all_is_checked ) {
						$node_cb.prop( 'checked', true )
							.prop( 'indeterminate', false )
							.removeClass( 'indeterminate' );
					}

					// Go to closest parent.
					check_all_checkbox.apply( $node_cb );
				}
				// Root node.
				else {}
			};

			// Check parent at run time.
			$( 'input[type="checkbox"]', $root ).on( 'click', check_all_checkbox );

			// Setup indeterminate checkbox state on load.
			$( 'input[type="checkbox"].leaf', $root ).each( function() {
				check_all_checkbox.apply( this );
			} );

		}

	};

} ( jQuery ) );
