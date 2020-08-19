# jQuery Flex Tree

jQuery Flex Tree is a lightweight jQuery plugin that provides creation of interactive trees.

* Checkbox collapsable tree with three state handling.
* Radio collapsable tree.
* Plain text collapsable tree.

jQuery Flex Tree is extendable and skinnable.

jQuery Flex Tree has been tested with jQuery 1.12.4, 2.2.4 and 3.5.1.

## Getting started

### Include library files

```
<script type="text/javascript" src="//code.jquery.com/jquery-3.3.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="flex-tree.min.css">
<script type="text/javascript" src="flex-tree.min.js"></script>

<div id="my-tree"></div>
<script type="text/javascript">
$( '#my-tree' ).flexTree( options );
</script>
```
### Arguments

|Name|Type|Default|Description|
|---|---|---|---|
|`items`|_array_|`undefined`|Tree items. Each item should be an object with following keys: `label`, `value`, `checked` (optional), `id` (optional), and `name` (optional).|
|`build`|_boolean_|`true`|Build HTML structure.|
|`targetElement`|_object_|`$(this)`|jQuery target element object.|
|`debug`|_boolean_|`false`|Debug mode.|
|`type`|_string_|`undefined`|Type of `<input>`. Possible values are: `checkbox`, `radio`. Default to plain text.|
|`name`|_string_|`flex_tree`|Name of `<input>` elements.|
|`className`|_string_|`flex-tree`|Class name widget.|
|`collapsable`|_boolean_|`true`|Make tree collapsable.|
|`collapsed`|_boolean_|`false`|Collapsed tree on load|
|`addControlOnParent`|_boolean_|`true`|Add radio/checkbox `<input>` element also on parent item.|
|`threeState`|_boolean_|`true`|Enable three state behavior with checkboxes.|

### Creating tree

```
<div id="my-tree"></div>
<script type="text/javascript">
$( '#my-tree' ).flexTree( {
	type: 'checkbox',
	name: 'foo',
	collapsed: false,
	items: [
		{
			label: 'Item 1',
			childrens: [
				{
					label: 'Item 1.1',
					value: 'item_1_1',
					checked: true
				},
				{
					label: 'Item 1.2',
					value: 'item_1_2',
					childrens: [
						{
							label: 'Item 1.2.1',
							value: 'item_1_2_1',
							childrens: [
								{
									label: 'Item 1.2.2.1',
									value: 'item_1_2_2_1'
								},
								{
									label: 'Item 1.2.2.2',
									value: 'item_1_2_2_2',
									id: 'foo'
								}
							]
						},
						{
							label: 'Item 1.2.2',
							value: 'item_1_2_2'
						}
					]
				},
				{
					label: 'Item 1.3',
					value: 'item_1_3',
					checked: true
				}
			]
		},
		{
			label: 'Item 2',
			childrens: [
				{
					label: 'Item 2.1',
					value: 'item_2_1',
					checked: true
				}
			]
		}
	]
} );
</script>
```

## Live examples

* [Three state checkbox collapsable tree](https://codepen.io/enrico-sorcinelli/pen/Zmjegw)
* [Radio button collapsable tree](https://codepen.io/enrico-sorcinelli/pen/qQyXZg)
* [Text collapsable tree](https://codepen.io/enrico-sorcinelli/pen/yQqopK)
