import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import moment from 'moment';
import { ITEM } from "styled-components";
import { callApiCheckedStatus, callApiCreateZzim, callApiDeleteZzim } from '../../api/ProductApi';
import { callConnetChat } from '../../api/ChatApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store';
import { useDispatch } from 'react-redux';
import { commonActions } from "../../state/common";

interface ProductInfoProps {
  item: ITEM;
  buy: boolean;
}

const Container = styled.div`
  display: flex;
  padding: 30px 0px;
`;

const ImgBox = styled.div`
  margin-right: 5%;
  flex-shrink: 0;
  width: 45%;
  height: 45%;
  border: 1px solid rgb(238, 238, 238);
  padding: 2px;
`;

const ProductInfoBox = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoArea = styled.div`
`;

const InfoTitlePrice = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
  width: 100%;
`;

const InfoTitle = styled.div`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 1.4;
`;

const InfoPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const InfoText = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const InfoSubText = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin-left: 5px;
`;

const DetailBox = styled.div`
  text-align: left;
  padding-top: 15px;
  color: rgb(33, 33, 33);
  letter-spacing: -0.5px;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const ItemTitle = styled.div`
  position: relative;
  font-size: 14px;
  width: 90px;
  padding-left: 5px;
  color: rgb(153, 153, 153);
`;

const ItemContent = styled.div`
  font-size: 14px;
  position: relative;
  display: flex;
`;

const ButtonBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.div`
  cursor: pointer;
  background-color: grey;
  color: white;
  position: relative;
  flex: 1 1 0%;
  font-weight: 600;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  height: 56px;
  font-size: 18px;
  align-items: center;
`;

const ProductInfo = ({item, buy}: ProductInfoProps) => {
  const [ isLike, setIsLike ] = useState(false);
  const [ time, setTime ] = useState('');
  const userNo = useSelector((state: RootState) => state.user.userData.uNo);
  const like = useSelector((state: RootState) => state.common.isLike);
  const dispatch = useDispatch();
  const CalTime = useCallback(()=> {
    let t1;
    buy ? t1 = moment(item.isEndDate) : t1 = moment(item.ibEndDate)
    let t2 = moment();
    const duTime = moment.duration(t1.diff(t2)).asSeconds();
    if (duTime < 0) {
      setTime('?????? ???!');
      return
    }
    const day = parseInt(String(duTime / (60*60*24)));
    const hour = parseInt(String((duTime - day*60*60*24) / (60*60)));
    const minute = parseInt(String((duTime - day*60*60*24 - hour*3600) / 60));
    const second = parseInt(String((duTime % 60)));
    const text = day + '??? ' + hour + '?????? ' + minute + '??? ' + second + '???';
    setTime(text);
  }, [buy, item.ibEndDate, item.isEndDate])
  
  useEffect(()=>{
    const countdown = setInterval(CalTime, 1000);
    return () => clearInterval(countdown);
  }, [CalTime])
  useEffect(()=>{
    const fetchData = async() => {
      let itemNo;
      buy ? itemNo = item.isItemNo : itemNo = item.ibItemNo;
      if (userNo !== undefined && itemNo !== undefined){
        const is = await callApiCheckedStatus(itemNo, userNo);
        if (is === "?????? ???????????????."){
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      }
    }
    fetchData();
  }, [buy, item.ibItemNo, item.isItemNo, userNo])
  
  const goChat = async() => {
    let userNo2;
    buy ? userNo2 = item.isUserNo : userNo2 = item.ibUserNo;
    let itemNo;
    buy ? itemNo = item.isItemNo : itemNo = item.ibItemNo;
    if (userNo === userNo2){
      alert('????????? ????????? ??????????????????.');
      return;
    }
    const body = {
      crItemNo: itemNo,
      crUserNoOne: userNo,
      crUserNoTwo: userNo2,
    };
    const RoomNo = await callConnetChat(body);
    window.open(
      `../chat/${userNo}/${RoomNo}`,
      '_blank',
      'width=387,height=667'
    );
  };

  return (
    <Container>
      <ImgBox>
        <ImageSlider itemNo={buy ? item.isItemNo : item.ibItemNo}/>
      </ImgBox>
      <ProductInfoBox>
        <InfoArea>
          <InfoTitlePrice>
            <InfoTitle>
              {buy ? item.isItemName : item.ibName}
            </InfoTitle>
            <InfoPrice>
              <InfoText>????????? : </InfoText>
              <span style={{ color: 'red' }}>
                {buy ? 
                item.isAuctionIngPrice !== undefined && item.isAuctionIngPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):
                item.ibAuctionIngPrice !== undefined && item.ibAuctionIngPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }</span> 
              <InfoText>???</InfoText>
            </InfoPrice>
            <InfoPrice>
              <InfoText>{buy ? "????????? : " : "????????? : "}</InfoText>
              <span>{buy ? item.isCoolPrice !== undefined && item.isCoolPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : item.ibAuctionInitPrice !== undefined && item.ibAuctionInitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              <InfoText>???</InfoText></span>
              {buy ? <InfoSubText>(????????? : {item.isAuctionInitPrice !== undefined && item.isAuctionInitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???)</InfoSubText>:<></>}
            </InfoPrice>
          </InfoTitlePrice>
        </InfoArea>
        <DetailBox style={{borderBottom: '1px solid rgb(238, 238, 238)'}}>
          <DetailItem>
            <ItemTitle>?? ?????????</ItemTitle><ItemContent>{item.joinerCnt}???</ItemContent>
          </DetailItem>
          <DetailItem>
            <ItemTitle>?? ????????????</ItemTitle><ItemContent>{time} <br />(??????: 
            {buy ? item.isEndDate !== undefined && item.isEndDate.slice(5,) :
            item.ibEndDate !== undefined && item.ibEndDate.slice(5,)} 24:00) </ItemContent>
          </DetailItem>
        </DetailBox>
        <DetailBox>
          <DetailItem>
            <ItemTitle>?? ????????????</ItemTitle><ItemContent>{buy ? item.isUsedStatus : '?????????'}</ItemContent>
          </DetailItem>
          <DetailItem>
            <ItemTitle>?? ????????????</ItemTitle><ItemContent>???????????????</ItemContent>
          </DetailItem>
          <DetailItem>
            <ItemTitle>?? ?????????</ItemTitle><ItemContent>??????</ItemContent>
          </DetailItem>
        </DetailBox>
        <ButtonBox>
          <StyledButton onClick={async() => {
            let itemNo;
            buy ? itemNo = item.isItemNo : itemNo = item.ibItemNo;
            let itemUserNo;
            buy ? itemUserNo = item.isUserNo : itemUserNo = item.ibUserNo;
            if (userNo === itemUserNo){
              alert('?????? ????????? ?????? ??? ????????????.');
              return;
            }
            if (userNo !== undefined && itemNo !== undefined) {
              if (isLike){
                await callApiDeleteZzim(itemNo, userNo);
                setIsLike(false);
              } else{
                const data = {
                  bItemNo: itemNo,
                  bUserNo: userNo
                }
                await callApiCreateZzim(data);
                setIsLike(true);
              }
              await dispatch(commonActions.setIsLike(!like));
            }
          }}>
            <span style={
              isLike? 
              {color: "red", marginRight: "4px", paddingBottom: "2px"} : 
              {color: "white", marginRight: "4px", paddingBottom: "2px"}}
            >???</span>
            {isLike ? '?????????' : '?????????'}
          </StyledButton>
          <StyledButton style={{ backgroundColor: '#ffceae' }} onClick={
            () => {
              let itemUserNo;
              buy ? itemUserNo = item.isUserNo : itemUserNo = item.ibUserNo;
              if (userNo === itemUserNo){
                alert('?????? ????????? ?????? ??? ????????? ??? ????????????.');
                return;
              }
              buy ? window.open(`../auction/buy/${item.isItemNo}`, '_blank') :
              window.open(`../auction/sell/${item.ibItemNo}`, '_blank')
              }
            }>
            ????????????
          </StyledButton>
          <StyledButton style={buy ? { backgroundColor: 'red' }:{ backgroundColor: 'orange'}} 
            onClick={buy ? () => {
              let itemUserNo;
              buy ? itemUserNo = item.isUserNo : itemUserNo = item.ibUserNo;
              if (userNo === itemUserNo){
                alert('?????? ????????? ?????? ??? ????????????.');
                return;
              }
              window.open(`../purchase/buy/${item.isItemNo}`, '_blank');
            }
             : goChat}>
            {buy ? '????????????' : '????????????'}
          </StyledButton>
        </ButtonBox>
      </ProductInfoBox>
    </Container>
  )
}

export default ProductInfo;
