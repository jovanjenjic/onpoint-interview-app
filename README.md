# Running the Application

This repository contains instructions on how to run this React application.

## Steps to Run the Application

1. **Install Dependencies**

   Before running the application, you need to install all dependencies. You can do this using the following command:

   ```bash
   npm ci
   ```

2. **Check Code with ESLint**

   To ensure that the code does not have any syntax or stylistic errors, you can run ESLint with the following command:

   ```bash
   npm run eslint
   ```

3. **Run Cypress Tests**

   The application includes Cypress component tests. To run them, use the following command:

   ```bash
   npm run cy-open
   ```

   This command will open the Cypress test runner, where you can execute tests and monitor their performance.

4. **Start the Application**

   Finally, to start the application, use the following command:

   ```bash
   npm start
   ```

   The application will start and be accessible in your browser at `http://localhost:3000`.

   Certainly! Here's a brief documentation for the `Select` component, including the purpose of each prop and an example of how to use the component:

---

# Select Component Documentation

The `Select` component is a custom React component designed to create a flexible dropdown selection interface with various features. Below are the main props and their usage:

## Props:

1. **`dropdownValues` (Array)**
   - Description: An array of dropdown values to be displayed as options.
   - Example: `dropdownValues={[{ id: '1', name: 'Option 1' }, { id: '2', name: 'Option 2' }]}`
   
2. **`itemKey` (String)**
   - Description: The key used to uniquely identify items in the `dropdownValues` array.
   - Default Value: `'id'`
   - Example: `itemKey="name"`

3. **`isLoading` (Boolean)**
   - Description: Indicates whether data is still loading. It affects the appearance of the dropdown.
   - Example: `isLoading={true}`

4. **`multiple` (Boolean)**
   - Description: Allows selecting multiple items if set to `true`.
   - Default Value: `false`
   - Example: `multiple={true}`

5. **`onInputChangeHandler` (Function)**
   - Description: A callback function to handle changes in the input field value.
   - Example: `onInputChangeHandler={(value) => console.log('Input value changed:', value)}`

6. **`initValue` (String or Array)**
   - Description: The initial value(s) to be displayed in the input field when the component loads.
   - Example: `initValue="Option 1"` or `initValue={['Option 1', 'Option 2']}`

## Usage Example:

Here's an example of how to use the `Select` component in your React application:

```javascript
import React from 'react';
import Select from './Select'; // Adjust the import path as needed

function App() {
  const dropdownOptions = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
  ];

  const handleInputChange = (value) => {
    console.log('Input value changed:', value);
  };

  return (
    <div>
      <h1>Dropdown Selection Example</h1>
      <Select
        dropdownValues={dropdownOptions}
        itemKey="name"
        isLoading={false}
        multiple={true}
        onInputChangeHandler={handleInputChange}
        initValue={['Option 1']}
      />
    </div>
  );
}

export default App;
```
---

# useFetch Hook Documentation

The `useFetch` hook is designed to manage data fetching with optional caching. It provides a way to fetch and cache data, refetch data based on query strings, and invalidate cached data. Below are the main features and usage of the hook:

## Features:

1. **Data Fetching:**
   - The hook fetches data based on query strings and can simulate an API call.

2. **Caching:**
   - Data can be cached to improve performance and reduce redundant API calls.

3. **Query-Based Data Refetch:**
   - You can refetch data based on a query string, making it flexible for dynamic data retrieval.

4. **Debounced Refetch:**
   - The hook provides a debounced version of the refetch function to control how often data is refetched.

5. **Data Invalidation:**
   - You can invalidate specific cached data or clear all cached data.

## Usage:

   ```javascript
   const { loading, data, refetch, inValidate } = useFetch({
     initialEnabled: true, // Optional: Set to true to fetch data initially
     cache: {
       enabled: true, // Optional: Enable caching
       expiryDuration: 60 * 15, // Optional: Set cache expiry duration in seconds
     },
   });

   // Example usage of refetch:
   // refetch data based on a query string
   refetch('searchQuery');

   // Example usage of inValidate:
   // Invalidate cached data for a specific query
   inValidate('searchQuery');
   // Or, clear all cached data
   inValidate(null);
   ```

---

# Cache Context and Cache Provider Documentation

The `CacheContext` and `CacheProvider` components are designed to manage caching within your React application. They provide a context and methods for caching data. Below are the details of their usage:

- `CacheContext` is a React Context that provides caching functionality to child components. It allows components to access caching methods.

- `CacheProvider` is a React component responsible for managing caching. It creates a cache context and provides caching methods to child components.

### Usage:

1. **Create CacheProvider:**
   - Import `CacheProvider` into your application and wrap your component tree with it.

   ```javascript
   import CacheProvider from './CacheProvider'; // Adjust the import path as needed

   function App() {
     return (
       <CacheProvider>
         {/* Your component tree */}
       </CacheProvider>
     );
   }
   ```

2. **Caching Methods:**
   - `CacheProvider` offers methods to manage caching:
     - `getCache(key)`: Retrieve a cached value by its key.
     - `setCache(key, value, expiryDuration)`: Set a value in the cache with an optional expiration duration.
     - `clearCache()`: Clear the entire cache.
     - `deleteCache(key)`: Delete a specific entry from the cache.

3. **Error Handling:**
   - Use the `useCache` hook within child components to access the cache context methods.
   - If a component tries to use `useCache` without being wrapped in `CacheProvider`, it will log an error message.

4. **Customization:**
   - You can customize the maximum cache size (`MAX_CACHE_SIZE`) and other caching-related configurations inside `CacheProvider`.

## Example Usage:

Here's an example of how to use `CacheContext` and `CacheProvider`:

```javascript
import React from 'react';
import CacheProvider, { useCache } from './CacheProvider'; // Adjust the import paths as needed

function App() {
  const { setCache, getCache } = useCache();

  // Set a value in the cache
  setCache('myKey', 'myValue', 3600);

  // Retrieve a cached value
  const cachedValue = getCache('myKey');

  return (
    <div>
      <h1>Cache Context and Cache Provider Example</h1>
      <p>Cached Value: {cachedValue}</p>
    </div>
  );
}

export default function Root() {
  return (
    <CacheProvider>
      <App />
    </CacheProvider>
  );
}
```
