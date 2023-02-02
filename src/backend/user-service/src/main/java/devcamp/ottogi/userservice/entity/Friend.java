package devcamp.ottogi.userservice.entity;

import devcamp.ottogi.userservice.domain.FriendState;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Friend {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender")
    private Member sender;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver")
    private Member receiver;

    private FriendState state;

    public Friend (Member sender, Member receiver, FriendState state){
        this.sender = sender;
        this.receiver = receiver;
        this.state = state;
    }
}
