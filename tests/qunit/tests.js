
;( function( $ ) {

QUnit.config.reorder = false;

$( document ).ready( function() {

	var flex_name = 'foo[]',
		items = [
			{
				label: 'Item 1',
				id: 'item-1',
				childrens: [
					{
						label: 'Item 1.1',
						value: 'item_1_1',
						checked: true,
						id: 'item-1-1'
					},
					{
						label: 'Item 1.2',
						value: 'item_1_2',
						id: 'item-1-2',
						childrens: [
							{
								label: 'Item 1.2.1',
								value: 'item_1_2_1',
								id: 'item-1-2-1',
								childrens: [
									{
										label: 'Item 1.2.1.1',
										value: 'item_1_2_1_1',
										id: 'item-1.2-1-1',
										checked: true
									},
									{
										label: 'Item 1.2.1.2',
										value: 'item_1_2_1_2',
										id: 'item-1-2-1-2'
									}
								]
							},
							{
								label: 'Item 1.2.2',
								value: 'item_1_2_2',
								id: 'item-1-2-2'
							},
							{
								label: 'Item 1.2.3',
								value: 'item_1_2_3',
								id: 'item-1-2-3'
							}
						]
					},
					{
						label: 'Item 1.3',
						value: 'item_1_3',
						checked: false,
						id: 'item-1-3'
					}
				]
			},
			{
				label: 'Item 2',
				id: 'item-2',
				childrens: [
					{
						label: 'Item 2.1',
						value: 'item_2_1',
						name: 'baz',
						checked: true
					}
				]
			}
		];

	QUnit.module( 'Checkbox Tree' );

	QUnit.test( 'New collapsable tree', function( assert ) {

		$( '#flex-tree' ).flexTree( {
			type: 'checkbox',
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );

		assert.deepEqual(
			$('#flex-tree-form').serializeArray(),
			[
				{
					"name": flex_name,
					"value": "item_1_1"
				},
				{
					"name": flex_name,
					"value": "item_1_2_1_1"
				},
				{
					"name": 'baz',
					"value": "item_2_1"
				}
			],
			'Input values on load'
		);

		assert.equal( true, $( '#item-1' ).prop( 'indeterminate' ), 'Status' );
		assert.equal( true, $( '#item-1' ).hasClass( 'indeterminate' ), 'Class' );
		assert.equal( false, $( '#item-1' ).prop( 'checked' ), 'Checked' );
		assert.equal( true, $( '#item-2' ).prop( 'checked' ), 'Checked' );
	});

	QUnit.test( 'Show/hide items', function( assert ) {

		$( '#item-1' ).next().trigger( 'click' );

		assert.expect( 1 );
		var done = assert.async( 1 );

		// We have to wait al least 200ms for toggle.
		setTimeout( function() {
			assert.equal( false, $('#item-1').siblings('ul').is(":visible"), 'Hide item 1');
			$( '#item-1' ).next().trigger( 'click' );
			done();
		}, 500 );
	} );

	QUnit.test( 'Update item', function( assert ) {
		$( '#item-1-2-1-2' ).trigger( 'click' );
		assert.equal( true, $( '#item-1-2-1' ).prop( 'checked' ), 'Click item 1.2.1.2' );
		assert.equal( false, $( '#item-1-2-1' ).prop( 'indeterminate' ) );
		assert.deepEqual(
			$('#flex-tree-form').serializeArray(),
			[
				{
					"name": flex_name,
					"value": "item_1_1"
				},
				{
					"name": flex_name,
					"value": "item_1_2_1_1"
				},
				{
					"name": flex_name,
					"value": "item_1_2_1_2"
				},
				{
					"name": 'baz',
					"value": "item_2_1"
				}
			],
			'Input modified values'
		);

		$( '#item-1-3' ).trigger( 'click' );
		assert.equal( true, $( '#item-1' ).prop( 'indeterminate' ) );

		$( '#item-1' ).trigger( 'click' );
		assert.deepEqual(
			$('#flex-tree-form').serializeArray(),
			[
				{
					name: flex_name,
					value: "item_1_1"
				},
				{
					name: flex_name,
					value: "item_1_2_1_1"
				},
				{
					name: flex_name,
					value: "item_1_2_1_2"
				},
				{
					name: flex_name,
					value: "item_1_2_2"
				},
				{
					name: flex_name,
					value: "item_1_2_3"
				},
				{
					name: flex_name,
					value: "item_1_3"
				},
				{
					name: 'baz',
					value: "item_2_1"
				}
			],
			'Item 1 click'
		);

		// Uncheck some leafs.
		$( '#item-1-2-1-2, #item-1-2-2, #item-1-2-3' ).trigger( 'click' );
		assert.equal( true, $( '#item-1-2' ).prop( 'indeterminate' ) );

	} );

	QUnit.module( 'Radio Tree' );

	flex_name = 'radio-collapsable';
	QUnit.test( 'New collapsable tree', function( assert ) {

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$( $div ).flexTree( {
			type: 'radio',
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );

	});

	flex_name = 'radio-uncollasable';
	QUnit.test( 'New uncollapsable tree', function( assert ) {

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$( $div ).flexTree( {
			type: 'radio',
			name: flex_name,
			collapsed: false,
			collapsable: false,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );

	});

	QUnit.module( 'Plain text' );

	QUnit.test( 'New plain text tree', function( assert ) {

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$( $div ).flexTree( {
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );
	});

	QUnit.test( 'New plain text tree', function( assert ) {

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$( $div ).flexTree( {
			name: flex_name,
			collapsed: false,
			collapsable: false,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );
	});

} );


} ( jQuery ) );