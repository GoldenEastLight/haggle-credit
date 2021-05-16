import ProfileTab from '../../components/profile/ProfileTab';
import styled from 'styled-components';
import ProfileSection from '../../components/profile/ProfileSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
`;

const Body = styled.div`
  margin: 0;
  padding: 0 200px;
  padding-top: 196px;
  font-size: 1vw;
  font-family: Bazzi;
`;
const Profile = () => {
  const history = useHistory();

  const userData = useSelector((state: RootState) => state.user.userData);
  useEffect(() => {
    if (!userData.uNo) {
      history.push('/home');
    }
  }, []);
  return (
    <Container>
      <Body>
        <ProfileSection />
        <ProfileTab />
      </Body>
    </Container>
  );
};

export default Profile;
