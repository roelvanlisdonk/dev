# Storage

* Changes are stored as immutable data (append only), so writers don't block readers.
* Each peace of data, that can be updated independently (think of a table cell), will be stored independently.
* Data is stored in a tree structure.


