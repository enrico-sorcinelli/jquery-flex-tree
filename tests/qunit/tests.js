
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

	QUnit.test( 'Collapsable tree with three-state checkbox', function( assert ) {

		$( '#flex-tree' ).append('<div>New collapsable tree with three-state checkbox</div>')
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

	QUnit.test( 'Collapsable tree with checkbox and without control on parent', function( assert ) {

		flex_name = 'foo_2[]';

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$div.append('<div>Collapsable tree with checkbox and without control on parent</div>')
		$div.flexTree( {
			type: 'checkbox',
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items,
			addControlOnParent: false
		} );

		assert.equal( true, true, 'Creating object' );

	});

	QUnit.test( 'Collapsable tree with checkbox and no three-state', function( assert ) {

		flex_name = 'foo_3[]';

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$div.append('<div>Collapsable tree with checkbox and and no three-state</div>')
		$div.flexTree( {
			type: 'checkbox',
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items,
			threeState: false
		} );

		assert.equal( true, true, 'Creating object' );
	});

	QUnit.module( 'Radio Tree' );

	QUnit.test( 'Collapsable tree with radio', function( assert ) {

		flex_name = 'radio-collapsable';

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$div.append('<div>Collapsable tree with radio</div>')
		$( $div ).flexTree( {
			type: 'radio',
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );
	});

	QUnit.test( 'Unollapsable tree with radio', function( assert ) {

		flex_name = 'radio-uncollasable_2';

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$div.append('<div>Unollapsable tree with radio</div>')
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

	QUnit.test( 'Collapsable tree plain text', function( assert ) {

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$div.append('<div>Collapsable tree plain  text</div>')
		$( $div ).flexTree( {
			name: flex_name,
			collapsed: false,
			collapsable: true,
			items: items
		} );

		assert.equal( true, true, 'Creating object' );
	});

	QUnit.test( 'Uncollapsable tree plain text', function( assert ) {

		var $div = $( '<div/>' );
		$( 'body' ).append( $div );

		$div.append('<div>Uncollapsable tree plain text</div>')
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