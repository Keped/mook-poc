import styled from "styled-components";

export const ButtonsContainer = styled.div`
display: flex;
flex-direction: column;
align-items:center;
`;

export const InputContainer = styled.div`
`;

export const ButtonsRow = styled.div`
display: flex;
flex-direction: row;
width: 80%;
justify-content: center;
height: 50px;
align-items: center;
line-height: 50px;
&& div,button {
    width: 120px;
    text-align :center;
}
`;