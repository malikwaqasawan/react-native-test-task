import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import axios from 'axios';
import getURLSearch from '../../helpers';
import { TextInput } from '../../components';
import { GetImages, SetState } from '../../redux/slices/image-slice';
import List from './list';

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    pageNumber,
    count,
    items,
    loading
  } = useSelector((state) => state.images);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageLimit, setPageLimit] = useState(10);

  const styles = StyleSheet.create({
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: '#800000',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
  });

  const getImages = async () => {
    if (searchKeyword) {
      dispatch(GetImages({ url: getURLSearch({ query: searchKeyword, offset: pageNumber * pageLimit + 1 }) }))
    } else {
      dispatch(SetState({ field: "items", value: [] }));
      dispatch(SetState({ field: "pageNumber", value: 1 }));
      dispatch(SetState({ field: "count", value: 0 }));
    }
  }

  useEffect(() => {
    getImages()
  }, [searchKeyword]);

  const getData = () => {
    if (pageNumber * pageLimit < count) {
      dispatch(SetState({ field: "pageNumber", value: pageNumber + 1 }));
      getImages()
    }
  };

  const handleSearch = debounce((value) => {
    dispatch(SetState({ field: "items", value: [] }));
    dispatch(SetState({ field: "pageNumber", value: 1 }));
    dispatch(SetState({ field: "count", value: 0 }));
    setSearchKeyword(value);
  }, 500);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, }}>
      {item?.images?.original?.url && (
        <Image
          source={{ uri: item?.images?.original?.url }}
          style={{ width: 160, height: 160, backgroundColor: '#c4c4c4', }}
        />
      )}
    </View>
  );

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View >
        <View>
          <TextInput
            placeholder="Search..."
            onChangeText={handleSearch}
          />

        </View>
        <View style={{ paddingBottom: 250 }}>
          <List
            items={items}
            pageNumber={pageNumber}
            pageLimit={pageLimit}
            count={count}
            loading={loading}
            getImages={getImages}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard