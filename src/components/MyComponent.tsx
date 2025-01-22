import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';

interface Item {
  id: string;
  name: string;
}

interface MyComponentProps {
  data: Item[];
}

const MyComponent: React.FC<MyComponentProps> = ({data}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const debouncedSearchTerm = useMemo(() => {
    const handler = setTimeout(() => searchTerm, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setDataSource(
      data.filter(item =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    );
  }, [debouncedSearchTerm, data]);

  const handleSelect = useCallback((item: Item) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.some(selected => selected.id === item.id)) {
        return prevSelected.filter(selected => selected.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    inputRef.current?.clear();
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: Item; index: number}) => (
      <TouchableOpacity
        key={index}
        style={styles.itemContainer}
        onPress={() => handleSelect(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.selectionText}>
          {selectedItems.some(selected => selected.id === item.id)
            ? 'Selected'
            : 'Not Selected'}
        </Text>
      </TouchableOpacity>
    ),
    [selectedItems, handleSelect],
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default React.memo(MyComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  clearButtonText: {
    color: '#007BFF',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  selectionText: {
    fontSize: 14,
    color: '#888',
  },
});

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   StyleSheet,
// } from "react-native";

// // Define types for props and data
// interface Item {
//   id: string;
//   name: string;
// }

// interface MyComponentProps {
//   data: Item[];
// }

// const MyComponent: React.FC<MyComponentProps> = ({ data }) => {
//   const [selectedItems, setSelectedItems] = useState<Item[]>([]);
//   const [dataSource, setDataSource] = useState<Item[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Debounce function
//   const debounce = (func: Function, delay: number) => {
//     let timer: NodeJS.Timeout;
//     return (...args: any[]) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };
//   };

//   // Filter dataSource based on searchTerm
//   const handleSearch = useCallback(
//     debounce((term: string) => {
//       setDataSource(
//         data.filter((item) =>
//           item.name.toLowerCase().includes(term.toLowerCase())
//         )
//       );
//     }, 300),
//     [data]
//   );

//   useEffect(() => {
//     handleSearch(searchTerm);
//   }, [searchTerm, handleSearch]);

//   useEffect(() => {
//     setDataSource(data);
//   }, [data]);

//   const handleSelect = useCallback(
//     (item: Item) => {
//       setSelectedItems((currentSelectedItems) => {
//         if (currentSelectedItems.some((selected) => selected.id === item.id)) {
//           return currentSelectedItems.filter(
//             (selected) => selected.id !== item.id
//           );
//         } else {
//           return [...currentSelectedItems, item];
//         }
//       });
//     },
//     []
//   );

//   const handleClear = useCallback(() => {
//     setSearchTerm("");
//   }, []);

//   const renderItem = useCallback(
//     ({ item }: { item: Item }) => (
//       <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
//         <Text style={styles.itemText}>{item.name}</Text>
//         <Text style={styles.statusText}>
//           {selectedItems.some((selected) => selected.id === item.id)
//             ? "Selected"
//             : "Not selected"}
//         </Text>
//       </TouchableOpacity>
//     ),
//     [selectedItems, handleSelect]
//   );

//   const memoizedRenderItem = useMemo(() => renderItem, [renderItem]);

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         onChangeText={setSearchTerm}
//         value={searchTerm}
//         placeholder="Search..."
//       />
//       <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
//         <Text style={styles.clearText}>Clear</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={dataSource}
//         keyExtractor={(item) => item.id}
//         renderItem={memoizedRenderItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   searchInput: {
//     height: 40
