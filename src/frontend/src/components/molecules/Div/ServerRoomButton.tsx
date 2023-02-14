import ButtonWrapper from "@components/atoms/Button/ButtonWrapper";
import PersonAddIcon from "@components/atoms/Icons/PersonAddIcon";
import TagIcon from "@components/atoms/Icons/TagIcon";
import VolumeIcon from "@components/atoms/Icons/VolumeIcon";
import Text from "@components/atoms/Text/Text";
import useModalStore from "@store/useModalStore";
import styled from "styled-components";

interface ServerRoomButtonProps {
  type: "chat" | "voice";
  text: string;
}

const ServerRoomButton = ({ type, text }: ServerRoomButtonProps) => {
  const { setInviteFriendModal } = useModalStore();
  return (
    <ButtonContainer>
      <ButtonWrapper ph={6} onClick={() => null} height={34}>
        <ServerRoomButtonContainer>
          <LeftContainer>
            {type === "chat" ? <TagIcon /> : <VolumeIcon />}
            <Text text={text} />
          </LeftContainer>
          <div
            className="right-icon"
            onClick={() => setInviteFriendModal(true)}
          >
            <PersonAddIcon />
          </div>
        </ServerRoomButtonContainer>
      </ButtonWrapper>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  svg {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
  .right-icon {
    svg {
      font-size: ${({ theme }) => theme.fontSize.base};
    }
    visibility: hidden;
  }
  margin: 0 0.5rem;
  &:hover {
    .right-icon {
      visibility: visible;
    }
  }
`;

const ServerRoomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export default ServerRoomButton;
