import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import { useState } from 'react';
const Container = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  padding: 25px 0;
  width: 100%;
`;
const StateLabel = styled.label`
  :hover {
    cursor: pointer;
  }
`;
interface ProductEventAgreeProps {
  onIsEventAgree: (name: any) => void;
}
const ProductEventAgree = ({ onIsEventAgree }: ProductEventAgreeProps) => {
  const [stateSelectedValue, setStateSelectedValue] = useState('');
  const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateSelectedValue(event.target.value);
    onIsEventAgree(event.target.value);
  };
  return (
    <Container id="address">
      <div
        style={{
          width: '20%',
          fontSize: '17px',
          fontWeight: 'bolder',
          minWidth: '120px',
        }}
      >
        이벤트경매<span style={{ color: 'red' }}>* </span>
      </div>
      <div
        style={{
          width: '80%',
          paddingLeft: '20px',
          minWidth: '650px',
          textAlign: 'left',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <div>
              <Radio
                id="radio11"
                checked={stateSelectedValue === 'true'}
                onChange={handleState}
                value="true"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
              />
              <StateLabel htmlFor="radio11">동의</StateLabel>
            </div>
            <div>
              <Radio
                id="radio22"
                checked={stateSelectedValue === 'false'}
                onChange={handleState}
                value="false"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'B' }}
              />
              <StateLabel htmlFor="radio22">미동의</StateLabel>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductEventAgree;
