# Storage

```TypeScript
    interface IStoreObject {
        id: string; // Unique id in the store
        onChange: () => void;
        // TODO: add validationRules
    }
```

```TypeScript
    interface IStoreArray<T> extends Array<T> {
    
    }
```



    



