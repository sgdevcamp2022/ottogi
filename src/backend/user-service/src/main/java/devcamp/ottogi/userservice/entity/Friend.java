package devcamp.ottogi.userservice.entity;

import devcamp.ottogi.userservice.domain.FriendState;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Friend {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender")
    private Member sender;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver")
    private Member receiver;

    private FriendState state;

    private String channelId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Friend (Member sender, Member receiver, FriendState state, String channelId){
        this.sender = sender;
        this.receiver = receiver;
        this.state = state;
        this.channelId = channelId;
    }

    public void modifyState(FriendState friendState) {
        this.state = friendState;
    }

    public void modifyCreatedAt(){
        this.createdAt = LocalDateTime.now();
    }

}
