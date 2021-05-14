import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import moment from 'moment';
import { ITEM } from "styled-components";

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
  const endDate = item.isEndDate;
  const CalTime = useCallback(()=> {
    let t1 = moment(endDate);
    let t2 = moment();
    const duTime = moment.duration(t1.diff(t2)).asSeconds();
    if (duTime < 0) {
      setTime('경매 끝!');
      return
    }
    const day = parseInt(String(duTime / (60*60*24)));
    const hour = parseInt(String((duTime - day*60*60*24) / (60*60)));
    const minute = parseInt(String((duTime - day*60*60*24 - hour*3600) / 60));
    const second = parseInt(String((duTime % 60)));
    const text = day + '일 ' + hour + '시간 ' + minute + '분 ' + second + '초';
    setTime(text);
  }, [endDate])
  
  useEffect(()=>{
    const countdown = setInterval(CalTime, 1000);
    return () => clearInterval(countdown);
  }, [CalTime])
  
  return (
    <Container>
      <ImgBox>
        <ImageSlider images={[item.ipValue]}/>
      </ImgBox>
      <ProductInfoBox>
        <InfoArea>
          <InfoTitlePrice>
            <InfoTitle>
              {item.isItemName}
            </InfoTitle>
            <InfoPrice>
              <InfoText>현재가 : </InfoText>
              <span style={{ color: 'red' }}>{item.isAuctionIngPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span> 
              <InfoText>원</InfoText>
            </InfoPrice>
            <InfoPrice>
              <InfoText>{buy ? "즉구가 : " : "시작가 : "}</InfoText>
              <span>{item.isCoolPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              <InfoText>원</InfoText></span>
              {buy ? <InfoSubText>(시작가 : {item.isAuctionInitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원)</InfoSubText>:<></>}
            </InfoPrice>
          </InfoTitlePrice>
        </InfoArea>
        <DetailBox style={{borderBottom: '1px solid rgb(238, 238, 238)'}}>
          <DetailItem>
            <ItemTitle>· 입찰수</ItemTitle><ItemContent>{item.joinerCnt}회</ItemContent>
          </DetailItem>
          <DetailItem>
            <ItemTitle>· 남은시간</ItemTitle><ItemContent>{time} (종료: {item.isEndDate.slice(5,)} 24:00)</ItemContent>
          </DetailItem>
        </DetailBox>
        <DetailBox>
          <DetailItem>
            <ItemTitle>· 상품상태</ItemTitle><ItemContent>중고</ItemContent>
          </DetailItem>
          <DetailItem>
            <ItemTitle>· 환불여부</ItemTitle><ItemContent>환불불가능</ItemContent>
          </DetailItem>
          <DetailItem>
            <ItemTitle>· 배송비</ItemTitle><ItemContent>별도</ItemContent>
          </DetailItem>
        </DetailBox>
        <ButtonBox>
          <StyledButton onClick={() => setIsLike(!isLike)}>
            <span style={
              isLike? 
              {color: "red", marginRight: "4px", paddingBottom: "2px"} : 
              {color: "white", marginRight: "4px", paddingBottom: "2px"}}
            >♥</span> 
            찜 {isLike ? 0+1 : 0}
          </StyledButton>
          <StyledButton style={{ backgroundColor: '#ffceae' }} onClick={() => window.open(`../auction/sell/${1}`, '_blank')}>
            입찰하기
          </StyledButton>
          <StyledButton style={buy ? { backgroundColor: 'red' }:{ backgroundColor: 'orange'}} 
            onClick={buy ? () => window.open(`../purchase/buy/${1}`, '_blank') : 
            () =>  window.open(`../purchase/sell/${1}`, '_blank')}>
            {buy ? '바로구매' : '연락하기'}
          </StyledButton>
        </ButtonBox>
      </ProductInfoBox>
    </Container>
  )
}

export default ProductInfo;
