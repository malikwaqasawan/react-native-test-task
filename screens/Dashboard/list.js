import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, } from "react-redux";
import { SetState } from '../../redux/slices/image-slice';

const List = ({
  items,
  pageNumber,
  pageLimit,
  count,
  loading,
  getImages
}) => {
  const dispatch = useDispatch();

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


  const getData = () => {
    if (pageNumber * pageLimit < count) {
      dispatch(SetState({ field: "pageNumber", value: pageNumber + 1 }));
      getImages()
    }
  };

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
    <FlatList
      numColumns={2}
      data={items}
      horizontal={false}
      keyExtractor={(item, index) => index}
      renderItem={renderItem}
      ViewStyle={{ height: '100vh' }}
      ListFooterComponent={pageNumber * pageLimit < count ? renderFooter : null}
    />
  );
};

export default List;