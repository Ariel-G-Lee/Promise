import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../../pages/Home';
import Info from '../../pages/Info';
import Search from '../../pages/Search';
import Pharmacy from '../../pages/Pharmacy';
import CalendarPage from '../../pages/Calendar';
import AlarmAdd from '../../pages/AlarmAdd';
import AlarmInfo from '../../pages/AlarmInfo';
import Alarm from '../../pages/Alarm';
import Timeline from '../../pages/Timeline';
import CommunityPage from '../../pages/Community';
import CommunitySearchPage from '../../pages/CommunitySearchPage';
import PostCreatePage from '../../pages/PostCreate';
import PostUpdatePage from '../../pages/PostUpdate';
import PostDetailPage from '../../pages/PostDetail';
import TimelineDetail from '../../pages/TimelineDetail';
import Mypage from '../../pages/Mypage';
import ModifyInfo from '../../pages/ModifyInfo';
import MyPillHistory from '../../pages/MyPillHistory';
import MyPillNowPill from '../../pages/MyPillNowPill';
import MyPillInfo from '../../pages/MyPillInfo';
import Login from '../../pages/Login';

const MyApp = () => {

    const Stack = createNativeStackNavigator();
    const TopTab = createMaterialTopTabNavigator();
    const Tab = createBottomTabNavigator();

    function CalendarNav(){
      return (
        <Stack.Navigator 
        screenOptions={{
          headerShown : false,
          initialRouteName : 'Calendar'
        }}
        >
          <Stack.Screen name="Calendar" component={CalendarPage} />
          <Stack.Screen name="Add" component={AlarmAdd} />
        </Stack.Navigator>
      );
    }

    function AlarmNav(){
      return(
        <Stack.Navigator 
        screenOptions={{
          headerShown : false,
          initialRouteName : 'AlarmScreen'
        }}
        >
          <Stack.Screen name="AlarmScreen" component={Alarm} />
          <Stack.Screen name="AlarmInfo" component={AlarmInfo} />
        </Stack.Navigator>
      )
    }

    function TimelineNav(){
      return(
        <Stack.Navigator 
        screenOptions={{
          headerShown : false,
          initialRouteName : 'TimelineScreen'
        }}
        >
          <Stack.Screen name="TimelineScreen" component={Timeline} />
          <Stack.Screen name="TimelineDetail" component={TimelineDetail} />
        </Stack.Navigator>
      )
    }

    function CalendarTop() {
      return (
        <TopTab.Navigator screenOptions={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor:'black', 
          tabBarIndicatorStyle:{backgroundColor:'black'}, 
          tabBarLabelStyle:{fontSize:15},
          initialRouteName:'CalendarScreen'
          }}>
            <TopTab.Screen name='CalendarScreen' component={CalendarNav}  options={{title:'??????'}}/>
            <TopTab.Screen name='Alarm' component={AlarmNav} options={{title:'??????'}} />
            <TopTab.Screen name='Timeline' component={TimelineNav} options={{title:'??????'}}/>
        </TopTab.Navigator>
      );
    }

    function CommunityNav() {
      return (
        <Stack.Navigator screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName:'community'
          }}>
          <Stack.Screen name='community' component={CommunityPage} options={{title:'????????????'}}/>
          <Stack.Screen name='communitysearch' component={CommunitySearchPage} options={{title:'?????? ??????'}}/>
          <Stack.Screen name='communitywrite' component={PostCreatePage} options={{title:'??? ??????'}}/>
          <Stack.Screen name='communityupdate' component={PostUpdatePage} options={{title:'??? ??????'}}/>
          <Stack.Screen name='communitydetail' component={PostDetailPage} options={{title:''}}/>
        </Stack.Navigator>
      );
    }

    function TopTabStackScreen(){
      return(
        <Stack.Navigator screenOptions={{
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen name="CalendarTab" component={CalendarTop} options={{ title: '?????? ??????' }}/>
        </Stack.Navigator>
      );
    }

    function MyPillScreen(){
      return (
        <Stack.Navigator>
          <Stack.Screen name="MyPillTab" component={MyPillTop} options={{ headerShown : false }}/>
        </Stack.Navigator>
      )
    }

    function HomeNav({navigation}) {
      return (
        <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName : 'Homes',
          headerRight: ()=>(<Icon.Button onPress={()=>navigation.navigate('Search', {navigation:`${navigation}`})} name="magnify" color="black" backgroundColor='white' />),
        }}>
          <Stack.Screen name="Homes" component={HomePage} options={{title: '???'}}/>
          <Stack.Screen name="Search" component={Search} options={{ title: '??????', headerRight: null }}/>
          <Stack.Screen name="Info" component={Info} options={{ title: '??? ??????' }} />
        </Stack.Navigator>
      );
    }

    function MyPageNav() {
      return (
        <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName:'mypageScreen'
        }}>
          <Stack.Screen name='mypageScreen' component={Mypage} options={{ title: '??? ??????' }}/>
          <Stack.Screen name='modifyInfo' component={ModifyInfo} options={{ title: '????????????' }}/>
          <Stack.Screen name='mypill' component={MyPillScreen} options={{ title: '?????????' }}/>
        </Stack.Navigator>
      )
    }

    function MyPillTop() {
      return (
        <TopTab.Navigator screenOptions={{
            headerTitleAlign: 'center',
            tabBarActiveTintColor:'black', 
            tabBarIndicatorStyle:{backgroundColor:'black'},
            tabBarLabelStyle:{fontSize:15},
            initialRouteName:'NowPill'
           }}>
            <TopTab.Screen name='NowPill' component={NowPillNav} options={{title:'???????????? ???'}} />
            <TopTab.Screen name='PillHistory' component={MyPillHistory} options={{title:'?????? ?????? ??????'}}/>
        </TopTab.Navigator>
      );
    }

    function NowPillNav() {
      return (
        <Stack.Navigator screenOptions={{initialRouteName : 'MyPillNowPill'}}>
            <Stack.Screen name="MyPillNowPill" component={MyPillNowPill} options={{ headerShown : false }}/>
            <Stack.Screen name="MyPillInfo" component={MyPillInfo} options={{ headerShown : false }} />
        </Stack.Navigator>
      )
    }

    function MyAppNav() {
      return(
      <Tab.Navigator 
        screenOptions={({route})=>({
          initialRouteName:'Home',
          tabBarActiveTintColor: 'black',
          headerShown : false, 
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home',
              Pharmacy : 'map-marker',
              CalendarPage: 'calendar-blank',
              Mypage: 'account',
              CommunityScreen: 'account-group'
            }
            return(
              <Icon name={icons[route.name]} color={color} size={size} />
            )},
        })}>
          <Tab.Screen name="Home" component={HomeNav} options={{tabBarLabel:'???'}}/>
          <Tab.Screen name="Pharmacy" component={Pharmacy} options={{ title: '??????' }} />
          <Tab.Screen name="CalendarPage" component={TopTabStackScreen} options={{ title: '??????' }} />
          <Tab.Screen name='CommunityScreen' component={CommunityNav} options={{ title: '????????????' }}/>
          <Tab.Screen name="Mypage" component={MyPageNav} options={{ title: '??? ??????' }}/>
        </Tab.Navigator>
        )
    }

    return (
      <Stack.Navigator 
      screenOptions={{
        headerShown : false
        }}>
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="appscreen" component={MyAppNav} />
      </Stack.Navigator>
    )
}

export default MyApp;