import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMyPillAPI } from '../../utils/axios';
import Spinner from 'react-native-loading-spinner-overlay';

const AccordionView = ({navigation}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [myPillList, setMyPillList] = useState([]);
  const [spinVisible, setSpinvisible] = useState();

  const renderHeader = (section) => {
    var date = section.alarmDayStart + " ~ " + section.alarmDayEnd;
    date = date.replace(/-/g, '.');
    
    let result = [];
    if(section.alarmMediList.length > 1){
      result = section.alarmMediList[0].umName + ' 외 ' + (section.alarmMediList.length-1).toString() + '개';
    } else if (section.alarmMediList.length === 1){
      result = section.alarmMediList[0].umName;
    }

    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{replaceHeaderUmName(result)}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Icon name="chevron-down" color="black" backgroundColor='white' size={35}/>
        </View>
      </View>
    );
  };

  const replaceHeaderUmName = (name) => {
    if (name.includes('(')) {
      return name.replace(/\(/g, '\n(');
    } else {
      return name;
    }
  }

  const renderContent = (section) => {
    var alarmMediList = section.alarmMediList;

    const navigateMyPillInfo = (object) => {

      if (object.mediSerialNum) {
        navigation.navigate('MyPillInfo', { name: `${object.umName}`, serialNumber: `${object.mediSerialNum}` });
      } else {
        alert("사용자가 직접 등록한 약은 상세정보가 존재하지 않습니다.");
      }
      
    }

    return (
      <View style={styles.contentList}>
        {alarmMediList.map((object, i) =>
          <TouchableOpacity key={i} onPress={() => { navigateMyPillInfo(object) }} style={styles.contents}>
            <View style={styles.contentTextContainer}>
              <Icon name="pill" color="#5383ad" backgroundColor='white' size={20} />
              <Text style={styles.contentText}>{(object.umName).replace(/\(/g, '\n(')}</Text>
            </View>
            <Icon name="chevron-right" color="black" backgroundColor='white' size={30} />
          </TouchableOpacity>
        )}
        <View style={styles.space}></View>
      </View>
    );
  };

  const getMyPillList = async () => {
    setSpinvisible(true);
    const res = await getMyPillAPI();
    setMyPillList(res);
    setSpinvisible(false);
  }
  
  useFocusEffect(
    useCallback(()=>{
      getMyPillList();
    }, [])
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  
  return (
    <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 15 }} >
      <Spinner visible={spinVisible} />
      {myPillList.length > 0 ? (
        <Accordion
          sections={myPillList}
          underlayColor={'#F9F9F9'}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
        />
      ) : (
        <View style={{ width: '100%', margin: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize:24, color:'#BBBBBB'}}>복용중인 약이 없습니다.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    paddingVertical: 5,
  },
  contentList: {
    borderColor: '#BBBBBB',
    borderTopWidth: 0.3,
  },
  header: {
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 20,
    paddingBottom: 15,
    borderRadius: 5,
    borderColor: '#BBBBBB',
    borderWidth: 0.3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '400'
  },
  contents: {
    backgroundColor:'white',
    borderRadius:3,
    elevation:0,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  contentTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400'
  }
});

export default AccordionView;