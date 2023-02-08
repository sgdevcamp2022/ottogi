package devcamp.ottogi.userservice.entity;

import devcamp.ottogi.userservice.domain.FriendState;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

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

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void createdAt(){
        this.createdAt = LocalDateTime.now();
    }


    public Friend (Member sender, Member receiver, FriendState state){
        this.sender = sender;
        this.receiver = receiver;
        this.state = state;
    }

    public void stateModify(FriendState friendState) {
        this.state = friendState;
    }
}
