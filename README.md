# React Shopping Cart Page
* [Chocolate Shop](https://secure-tor-00222.herokuapp.com/) is an example of a list and aggregator interface in React.

## Application Architecture: 

### Organization of the components
* A list of components:
   * App - the main part
     * Filter - has a name, a list of options (FilterValue), and a value (this is the selected value by the user; initially it is "" representing "All" )
       * FilterValue - represents each option for a Filter
     * SortBy - is a list of SortByItems (name, sort-by function)
     * Product - has id, name, description, price, color and size
     * Cart - has a total, and a list of CartLines
       * CartLine - a CartLine has product name, qty, (unit)price, total
  
### How data is passed down through the components
* The App 
  * receives props that have:
    * a list of data products
    * a list of Filters
    * a SortBy (which is a list of SortByItems)
  * App's state:
    * products (initially given by the props)
    * filters (initially given by the props, all selected values should be """)
    * cartLines (initially empty)
    * totalAmount (initially 0.0)
    * sortByFn (default sortBy function)

### How user interactions can trigger changes in the state of components
* User presses a FilterValue:
  * FilterValue tells its parent Filter that its value should be selected by the user
  * Filter asks its parent App to add/process this new Value (together with its name)
  * App set the state of its filters (changing one filter's selected value) and looping over all the filters to set the state of the products
  * filters are re-rendered, and FilterValue receives the corresponding font color
  * products are re-rendered to show only the filtered products 
* User changes SortBy:
  * Based on the selection, SortBy calls its parent App with the corresponding sort function
  * App changes the order of the current products according to the sort function and set the state of the products 
  * current products are re-rendered to show the selected order
* User clicks the "Add to Cart" button from a Product:
  * Product calls its parent App to handle "add to cart"
  * Depending on whether the product is already in the cart or not, App will either update the existing line or push a new line to the cartLines - App sets the state of the cartlines and the totalAmount
  * totalAmount and cartlines are re-rendered
* User clicks the "+" or "-" or trash icon from a CartLine:
  * Cartline calls its parent App to handle qty increase/decrease or remove accordingly
  * App sets the state of the cartlines and the totalAmount
  * totalAmount and cartlines are re-rendered
