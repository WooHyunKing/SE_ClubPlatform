import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Topbar from '../Bar/Topbar';
import {Dimensions} from 'react-native';
import {Platform} from 'react-native';
import AddClubCard from '../Container/AddClubCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userName from '../../recoils/userName';
import {useRecoilState, useRecoilValue} from 'recoil';

import axios, {AxiosHeaders} from 'axios';
import userid from '../../recoils/userId';
import userToken from '../../recoils/userToken';
import {getDynamicThemeElevations} from 'react-native-paper/lib/typescript/core/theming';
import {useIsFocused} from '@react-navigation/native';
import {useMemo} from 'react';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Main({navigation}) {
  const name = useRecoilValue(userName);
  const [userId, setUserId] = useRecoilState(userid);
  const [userToken_R, setUserToken] = useRecoilState(userToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchClub, setSearchClub] = useState(null);
  const [clubList, setClubList] = useState();
  const [randomList, setRandomList] = useState();

  const isFocused = useIsFocused();

  async function getJoin(token) {
    try {
      const response = await axios.get(
        'http://sogong-group3.kro.kr/member/join-clubs',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.data) {
        setClubList(response.data.data.content);
      }

      const response2 = await axios.get(
        'http://sogong-group3.kro.kr/member/random-clubs',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response2.data) {
        console.log(response2.data.data.content);
        setRandomList(response2.data.data.content);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // async function getRandom(){

  // }

  useEffect(() => {
    getJoin(`Bearer ${userToken_R}`);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <View style={{margin: Width * 0.05, flex: 0.6}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.fontStyle}>{userId}님의 동아리</Text>
          <TouchableOpacity
            style={{
              width: Width * 0.17,
              height: Height * 0.03,
              marginBottom: Height * 0.012,
              borderRadius: 5,
              backgroundColor: '#7181c4',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              Alert.alert('로그아웃 하시겠습니까?', '', [
                {
                  text: '네',
                  onPress: () => {
                    AsyncStorage.removeItem('user_id');
                    navigation.replace('Auth');
                  },
                },
                {
                  text: '아니오',
                },
              ]);
            }}>
            <Text style={{color: 'white'}}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginBottom: Height * 0.02}}>
          <TouchableOpacity
            style={styles.myClubButton}
            onPress={() => navigation.navigate('ClubMain')}>
            <Image
              style={styles.clubImage}
              resizeMode="stretch"
              source={{
                uri: clubList
                  ? 'data:image/png;base64,' + clubList[0].image
                  : null,
              }}
            />
            <Text>{clubList ? clubList[0].clubName : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.myClubButton}
            onPress={() => navigation.navigate('ClubMain')}>
            <Image
              style={styles.clubImage}
              resizeMode="stretch"
              source={{
                uri: clubList
                  ? 'data:image/png;base64,' + clubList[1].image
                  : null,
              }}
            />
            <Text>{clubList ? clubList[1].clubName : null}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity
            style={styles.myClubButton}
            onPress={() => navigation.navigate('ClubMain')}>
            <Image
              style={styles.clubImage}
              resizeMode="stretch"
              source={require('../../images/Sweat.png')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.myClubButton}
            onPress={() => setModalVisible(true)}>
            <Image
              style={styles.clubImage}
              resizeMode="stretch"
              source={require('../../images/AddClub.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{margin: Width * 0.05, flex: 0.4}}>
        <Text style={styles.fontStyle}>동아리 정보가 궁금하다면?</Text>
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.otherClubButton}>
            <Text>{randomList ? randomList[0].clubName : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherClubButton}>
            <Text>{randomList ? randomList[1].clubName : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherClubButton}>
            <Text>{randomList ? randomList[2].clubName : null}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 모달 레이아웃 구성 */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(60, 60, 60, 0.5)',
            width: Width,
            height: Height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: Width * 0.7,
              borderRadius: 10,
              padding: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, flex: 1}}>동아리 가입신청</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Image
                  source={require('../../icons/ic_close.png')}
                  resizeMode="contain"
                  style={{
                    flex: 1,
                    height: Height * 0.05,
                    width: Height * 0.05,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'space-between',
                justifyContent: 'center',
              }}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => {
                  setSearchClub(text);
                }}
                placeholder="동아리명을 입력해주세요."
              />
              <TouchableOpacity onPress={() => console.log({searchClub})}>
                <Image
                  style={{
                    flex: 1,
                    height: Height * 0.04,
                    width: Height * 0.04,
                    margin: 5,
                  }}
                  source={require('../../icons/ic_search.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>
              <AddClubCard club_id={1} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  clubImage: {
    width: Width * 0.44,
    height: Height * 0.2,
    borderRadius: 10,
  },
  myClubButton: {
    // elevation: 3,
    borderRadius: 10,
    marginRight: Width * 0.02,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: Height * 0.05,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  fontStyle: {
    fontSize: 20,
    marginBottom: Height * 0.01,
  },
  otherClubButton: {
    borderRadius: 10,
    height: Height * 0.08,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Height * 0.01,
  },
});

export default Main;
