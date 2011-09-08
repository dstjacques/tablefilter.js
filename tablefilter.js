//     tablefilter.js
//     (c) 2011 Daniel St.Jacques
//     tablefilter.js may be freely distributed under the MIT license. See the LICENSE file.

/**
 * Creates an instance of the library
 * @param objectName name of the variable you are assigning your new instance to
 * @param classNames the library will act on any table with at least one of these class names
 * @param caseInsensitive filtering comparisons will be done in a case insensitive manner if true, case sensitive if false
 * @param refreshDelay tables will be refiltered automatically every refreshDelay milliseconds
 */
function tablefilter(objectName, classNames, caseInsensitive, refreshDelay)
{
   // Name of the object used to interact with the library
   this.OBJECTNAME = objectName;

   // The library will work with tables having these class names
   this.CLASSNAMES = classNames;

   // By default filtering will be case insensitive
   this.CASE_INSENSITIVE = "i";

   // Turn on case insensitivity if requested
   if(caseInsensitive == false)
   {
      this.CASE_INSENSITIVE = "";
   }

   // Bind the instance for later use
   var _this = this;

   // Set the library to start up after the page is loaded
   if (window.addEventListener)
   {
      // W3C
      window.addEventListener('load', function() { _this.init(); }, false);
   } 
   else if (window.attachEvent)
   {
      // Microsoft
      window.attachEvent('onload', _this.init);
   }

   // Add a continuous filter refresh for all of this object's tables if requested
   if(refreshDelay > 0)
   {
      window.setInterval(function() { _this.filterAll(); }, refreshDelay);
   }

   /**
    * Initializes the library.
    */
   this.init = function()
   {
      var lists = this.getTables();

      for(var i in lists)
      {
         // Find table headers and add input boxes for filtering
         var headers = lists[i].rows[0].cells;

         for(var j in headers)
         {
            headers[j].innerHTML = "<input class='filterInput' type='text' onkeyup='" + this.OBJECTNAME + ".filter(this.parentNode.parentNode.parentNode)' /><br />" + headers[j].innerHTML;
         }
      }
   }

   /**
    * Find all the tables that have been assigned specific classes
    * to indicate that the library should act on them.
    * @return List of HTML table elements having a class in the given list.
    */
   this.getTables = function()
   {
      // Find all the tables in the document
      var tableElements = document.getElementsByTagName('table');

      // Array to store all the tables we want to return
      var tables = new Array();

      for(var i = 0; i < tableElements.length; i++)
      {
         // Look for the current table's class in the list of classes specified
         // when the library was initialized
         var matchClass = new RegExp("(^|[ ,])" + tableElements[i].className + "([, ]|$)");                  
         if(matchClass.test(this.CLASSNAMES) == true)
         {     
            // Add any table to the return list if its class is found in the list
            tables.push(tableElements[i]);
         }
      }
      return tables;
   }

   /**
    * Filter a table based on the regular expression filter entered
    * @param table Table element to be filtered
    */
   this.filter = function(table)
   {
      var rows = table.rows;

      // Get all the filters from the input elements
      var filter = table.rows[0].getElementsByClassName('filterInput');

      // Apply the filter to all rows except row[0] since it is the headers
      for(var i = 1; i < rows.length; i++)
      {
         // Get the current row's cells
         var cells = rows[i].cells;

         // By default each row will be visible ie: style.display=''
         var visible = '';

         // Check each column's filter against the current cell's content
         for(var j = 0; j < cells.length; j++)
         {
            // Filter using the user's input as a regular expression
            // we'll treat "*" as a wildcard too
            var pattern = new RegExp(filter[j].value, this.CASE_INSENSITIVE);
            var content = cells[j].innerHTML;

            if(pattern.test(content) != true)
            {
               // Hide the current row if it doesn't match the filter
               visible = 'none';
            }
         }

         // Update the visibility of the current row
         rows[i].style.display = visible;      
      }
   }

   /**
    * Filter all tables based on the filters entered
    */
   this.filterAll = function()
   {
      var tables = this.getTables();

      for(var i in tables)
      {
         this.filter(tables[i]);
      }
   }
}