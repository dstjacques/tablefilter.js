# tablefilter.js

Tablefilter is a small JavaScript library that adds the ability to filter by column the data in any HTML table.



It supports JavaScript regular expressions in filtering.



There are no dependencies, it can be used with styled tables, and it should not interfere with other JavaScript.



## Usage



Include `tablefilter.js` in your page:



```html

<script type="text/javascript" src="tablefilter.js"></script>

```



Next create a tablefilter object with desired options:

* instanceName: should be a string indicating the variable you are assigning this new object to
* classList: the library will treat any tables having one or more of the classes in this array
* caseInsensitive: true if filtering should be case insensitive, false otherwise
* refreshDelay: a number greater than zero for table filters to be reapplied every refreshDelay milliseconds (useful when tables have dynamic data)

```javascript

new tablefilter(instanceName, classList, caseInsensitive, refreshDelay);

```



## Examples



For example this tablefilter object will enable case insensitive filtering on tables having the class "someClass" and will refilter every 2000ms:



```html

<script type="text/javascript" src="tablefilter.js"></script>
<script type="text/javascript">

   myFilter = new tablefilter("myFilter", ["someClass"], true, 2000);

</script>

```



See examples.html for more examples.
