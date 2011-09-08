# tablefilter.js

Tablefilter is a small JavaScript library that adds the ability to filter by column the data in any HTML table.



It supports JavaScript regular expressions in filtering.



## Usage



Include `tablefilter.js` in your page:



```html

<script type="text/javascript" src="tablefilter.js"></script>

```



Next create a tablefilter object that will modify your table(s) on the fly:



```html

<script type="text/javascript">

   instanceName = new tablefilter("instanceName", [list of classes], caseInsensitive);

</script>

```



For example this tablefilter object will enable case insensitive filtering on tables having the class "someClass" and will refilter every 2000ms in case data is dynamically changing:



```html

<script type="text/javascript">

   myFilter = new tablefilter("myFilter", ["someClass"], true, 2000);

</script>

```



Tablefilter has no dependencies, can be used with styled tables and should not interfere with other JavaScript.



See examples.html for more examples.
