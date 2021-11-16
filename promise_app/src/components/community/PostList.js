import React, { useState, useCallback, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import useCommunityList from '../../utils/useCommunityList';
import useCommunity from '../../utils/useCommunity';
import { useSelector, useDispatch } from 'react-redux';
import { getCommunityAPI } from '../../utils/axios';
import { getMoreCommunityAction } from '../../modules/community/actions';
import Moment from 'moment';

const PostList = (props) => {

  // infinite scroll
  // const [pageNum, setPageNum] = useState(1);
  const pageNum = useSelector(state => state.community.pageNum)
  const hasMore = useSelector(state => state.community.hasMore)
  const communityList = useSelector(state => state.community.communityList)
  const totalPageCnt = useSelector(state => state.community.totalPageCnt)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)

  const dispatch = useDispatch()
  const navigation = useNavigation(); 


  const getMorePost = async () => {
    if (hasMore) {
      console.log(pageNum)
      const res = await useCommunity(communityList, pageNum, totalPageCnt)
      dispatch(getMoreCommunityAction(res))
    }
  }
    
  const lastPostRef = useRef()


  return (
    <FlatList
      data={communityList}
      onEndReachedThreshold = {0.5}
      onMomentumScrollBegin = {() => {setOnEndReachedCalledDuringMomentum(false)}}
      onEndReached = {() => {
          if (!onEndReachedCalledDuringMomentum) {
            getMorePost()    // LOAD MORE DATA
            setOnEndReachedCalledDuringMomentum(true)
          }
        }
      }
      renderItem={({item, index}) => {

        const subDate = item.commuDate.substr(0, 16)
        const postDate = Moment(subDate).format("YYYY.MM.DD HH:mm")
        const isLastPost = (communityList.length === index+1)

      return (
        isLastPost
        ? 
        <TouchableHighlight ref={lastPostRef} onPress={()=>navigation.navigate('communitydetail', {post: item, postDate: postDate})} underlayColor="white">
        <View style={styles.container} key={item.commuId}>
            <View>
                <Text style={styles.itemNameText}>이건 마지막</Text>
                <Text style={styles.itemNameText}>{item.userNickname}</Text>
                <Text style={styles.itemTitleText}>{item.commuTitle}</Text>
            </View>
            <View>
                <Text style={styles.itemDateText}>
                {postDate}
                </Text>
            </View>
        </View>
        </TouchableHighlight>
        :
        <>
        <TouchableHighlight onPress={()=>getMorePost()}><Text>{pageNum}{hasMore?'true':'false'}</Text></TouchableHighlight>
        <TouchableHighlight onPress={()=>navigation.navigate('communitydetail', {post: item, postDate: postDate})} underlayColor="white">
        <View style={styles.container} key={item.commuId}>
            <View>
                <Text style={styles.itemNameText}>{item.userNickname}</Text>
                <Text style={styles.itemTitleText}>{item.commuTitle}</Text>
            </View>
            <View>
                <Text style={styles.itemDateText}>
                {postDate}
                </Text>
            </View>
        </View>
        </TouchableHighlight>
        </>
      )}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
    marginHorizontal: 0,
    paddingVertical: 12,
    paddingHorizontal: 14,
    height: 120,
    shadowColor: '#f1f2f3',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 18.95,
    elevation: 1,
    zIndex: 1,
    backgroundColor: '#F4F4F4',
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: '600'
  },
  itemTitleText: {
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 25,
  },
  itemDateText: {
    paddingTop: 6,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PostList