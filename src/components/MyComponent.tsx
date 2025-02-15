import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Item} from '../screens/Main';

interface MyComponentProps {
  data: Item[];
}

const MyComponent: React.FC<MyComponentProps> = ({data}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
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
    ({item}: {item: Item}) => {
      const isSelected = selectedItems.some(
        selected => selected.id === item.id,
      );
      return (
        <TouchableOpacity
          style={[
            styles.itemContainer,
            isSelected && styles.selectedItemContainer,
          ]}
          onPress={() => handleSelect(item)}>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View>
              <Text>{isSelected ? 'Selected' : 'Not Selected'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedItems, handleSelect],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Item Selector</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search items..."
          placeholderTextColor="#95A5A6"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        {searchTerm !== '' && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No items found</Text>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}{' '}
          selected
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  header: {
    backgroundColor: '#2C3E50',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
    height: Dimensions.get('screen').width * 0.14,
    paddingHorizontal: 16,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearButtonText: {
    color: '#3498DB',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 12,
    elevation: 1,
  },
  selectedItemContainer: {
    backgroundColor: '#E8F6FD',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#34495E',
    fontWeight: '500',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 24,
  },
  footer: {
    backgroundColor: '#2C3E50',
    padding: 16,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default React.memo(MyComponent);

/*OLD CODE*/
// const MyComponent = ({ data }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [dataSource, setDataSource] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const inputRef = useRef(null);

//   useEffect(() => {
//     setDataSource(data);
//   }, [data]);

//   useEffect(() => {
//     setTimeout(() => {
//       setDataSource(data.filter((item) => item.name.includes(searchTerm)));
//     }, 1000);
//   }, [searchTerm]);

//   const handleSelect = (item) => {
//     setSelectedItems((currentSelectedItems) => [...currentSelectedItems, item]);
//   };

//   const handleClear = () => {
//     inputRef.current.clear();
//   };

//   return (
//     <View>
//       <TextInput
//         ref={inputRef}
//         onChangeText={setSearchTerm}
//         value={searchTerm}
//       />
//       <TouchableOpacity onPress={handleClear}>
//         <Text>Clear</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={dataSource}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleSelect(item)}>
//             <Text>{item.name}</Text>
//             <Text>
//               {selectedItems.includes(item) ? "Selected" : "Not selected"}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default MyComponent;
