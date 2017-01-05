
# Store

## Graph
- Data is stored as a graph.
- It uses a id (cuid) for each unique object

## Query
- Data can be retrieved by using the cuid.
- Data within an object can be retrieved by using a path

Example

```typescript
const person = {
    id: "c11111",
    address: {
        street: ""
    }
};

store.get()

```