import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';

import axios, {AxiosHeaders} from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {back} from 'react-native/Libraries/Animated/Easing';
import {useRecoilState} from 'recoil';
import userToken from '../../recoils/userToken';
import Topbar from '../Bar/Topbar';
import Home_Contents from '../Container/Home_Contents';
import Home_Profile from '../Container/Home_Profile';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function Home({navigation}) {
  const [userToken_R, setUserToken] = useRecoilState(userToken);
  const [clubId, setClubId] = useState();
  const [clubInfo, setClubInfo] = useState();
  const [noticeList, setNoticeList] = useState();
  const [workList, setWorkList] = useState();
  const [comList, setComList] = useState();

  async function getClubInfo(token, clubId) {
    try {
      // console.log(token);
      // console.log(clubId);
      const response = await axios.get(
        'http://sogong-group3.kro.kr/club/' + clubId + '/mainpage',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setClubInfo(response.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getData(token, clubId) {
    try {
      const response = await axios.get(
        'http://sogong-group3.kro.kr/club/' + clubId + '/mainpage-board',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response) {
        console.log(response.data.data);
        setNoticeList(response.data.data);
      }

      const response2 = await axios.get(
        'http://sogong-group3.kro.kr/club/' + clubId + '/work',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response2) {
        console.log(response2.data.content);
        setWorkList(response2.data.content);
      }

      const response3 = await axios.get(
        'http://sogong-group3.kro.kr/club/' + clubId + '/community',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response3) {
        console.log(response3.data);
        setComList(response3.data);
      }

      // setNoticeList(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getClubInfo(`Bearer ${userToken_R}`, 1);
    getData(`Bearer ${userToken_R}`, 1);
  }, []);
  // console.log(clubInfo);
  // console.log(noticeList);
  const postData = [
    {
      post_id: 1, // 게시물 ID(인덱스)
      title: '동아리방 사용 관련 공지사항', // 게시물 제목
      author: 'GM우현', // 게시물 작성자
      date: '2022/11/04', // 게시물 작성 날짜
      time: '09:15', // 게시물 작성 시간
      commentCount: 5, // 게시물 댓글 수
      isFinish: false, // 게시물 모집완료 여부
    },
    {
      post_id: 2,
      title: 'MT 관련 공지사항',
      author: 'GM준수',
      date: '2022/10/25',
      time: '11:10',
      commentCount: 10,
      isFinish: false,
    },
    {
      post_id: 3,
      title: '대여사업 관련 공지사항',
      author: 'GM지영',
      date: '2022/10/11',
      time: '16:17',
      commentCount: 3,
      isFinish: false,
    },
    {
      post_id: 4,
      title: '개강총회 관련 공지사항',
      author: 'GM우진',
      date: '2022/10/09',
      time: '12:11',
      commentCount: 14,
      isFinish: false,
    },
    {
      post_id: 5,
      title: '정기모임 관련 공지사항',
      author: 'GM상훈',
      date: '2022/07/21',
      time: '10:12',
      commentCount: 10,
      isFinish: false,
    },
  ];

  const postData2 = [
    {
      post_id: 6,
      title: '텔레토비 동산 피크닉 갈 사람 구합니다',
      author: '김채원',
      date: '2022/12/02',
      time: '19:15',
      commentCount: 6,
      isFinish: false,
    },
    {
      post_id: 7,
      title: '아웃닭 파티원 구해요',
      author: '장원영',
      date: '2022/11/25',
      time: '11:10',
      commentCount: 10,
      isFinish: false,
    },
    {
      post_id: 8,
      title: '저녁식사 팟 구함',
      author: '백종원',
      date: '2022/10/10',
      time: '16:17',
      commentCount: 3,
      isFinish: false,
    },
    {
      post_id: 9,
      title: '동아리 박람회 구경갈 사람 구해요',
      author: '주지훈',
      date: '2022/10/01',
      time: '14:11',
      commentCount: 14,
      isFinish: true,
    },
    {
      post_id: 10,
      title: '벚꽃 보러갈 멤버 구함',
      author: '박보검',
      date: '2022/09/21',
      time: '17:12',
      commentCount: 8,
      isFinish: false,
    },
    {
      post_id: 11,
      title: '피시방 롤 내전 팟 구합니당',
      author: '차은우',
      date: '2022/08/22',
      time: '08:12',
      commentCount: 20,
      isFinish: true,
    },
  ];
  const postData3 = [
    {
      activity_id: 1,
      title: '한국고 멘토링 프로그램',
      author: 'GM준수',
      date: '2022/12/02',
      time: '19:15',
      commentCount: 6,
      isFinish: false,
    },
    {
      activity_id: 2,
      title: '선배님들과 함께하는 OBYB',
      author: 'GM준수',
      date: '2022/12/02',
      time: '19:15',
      commentCount: 6,
      isFinish: false,
    },
    {
      activity_id: 3,
      title: 'SW 창업 아이디어 경진대회',
      author: 'GM준수',
      date: '2022/12/02',
      time: '19:15',
      commentCount: 6,
      isFinish: false,
    },
    {
      activity_id: 4,
      title: '교수님과 함께하는 즐거운 나들이 프로그램',
      author: 'GM준수',
      date: '2022/12/02',
      time: '19:15',
      commentCount: 6,
      isFinish: false,
    },
    {
      activity_id: 5,
      title: '청소년 멘토멘티 프로그램',
      author: 'GM준수',
      date: '2022/12/02',
      time: '19:15',
      commentCount: 6,
      isFinish: false,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Topbar navigation={navigation} />
      <ScrollView>
        <Home_Profile navigation={navigation} clubInfo={clubInfo} />
        <Home_Contents
          title="공지사항"
          location="Notice"
          title1={noticeList ? noticeList[0].title : ''}
          title2={noticeList ? noticeList[1].title : ''}
          title3={noticeList ? noticeList[2].title : ''}
          title4={noticeList ? noticeList[3].title : ''}
          title5={noticeList ? noticeList[4].title : ''}
        />
        <Home_Contents
          title="활동 모아보기"
          location="WorkFlow"
          title1={workList ? workList[0].title : ''}
          title2={workList ? workList[1].title : ''}
          title3={workList ? workList[2].title : ''}
          title4={workList ? workList[3].title : ''}
          title5={workList ? workList[4].title : ''}
        />
        <Home_Contents
          title="소모임 모집"
          location="Group"
          title1={comList ? comList[0].title : ''}
          title2={comList ? comList[1].title : ''}
          title3={comList ? comList[2].title : ''}
          title4={comList ? comList[3].title : ''}
          title5={comList ? comList[4].title : ''}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container_sub: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
    padding: 5,
  },
  container_right: {
    flex: 2,
    flexDirection: 'row',
  },
  clubImg: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    elevation: 3,
    padding: 20,
    paddingBottom: 30,
  },
  gray_card: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    alignSelf: 'baseline',
    marginTop: 10,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  cardTitle: {
    flex: 1,
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gray_card_title: {
    flex: 1,
    marginRight: 10,
  },
  gray_card_content: {
    flex: 1,
    marginLeft: 15,
  },
});

export default Home;
