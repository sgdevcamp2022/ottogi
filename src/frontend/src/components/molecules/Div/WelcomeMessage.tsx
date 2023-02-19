import MessageText from "@components/atoms/Div/MessageText";
import WelcomeIcon from "@components/atoms/Icons/WelcomeIcon";
import React from "react";
import styled from "styled-components";
interface WelcomeMessage {
  name: string;
}

const WelcomeMessage = ({ name }: WelcomeMessage) => {
  return (
    <WelcomeMessageProps>
      <IconWrapper>
        <WelcomeIcon />
      </IconWrapper>

      <MessageText
        hasDate={false}
        text={`${name} 님이 입장하셨어요!`}
        createdAt={new Date()}
      />
    </WelcomeMessageProps>
  );
};

const WelcomeMessageProps = styled.div`
  position: relative;
  display: flex;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
`;

export default WelcomeMessage;
