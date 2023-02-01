package devcamp.ottogi.userservice.entity;

import devcamp.ottogi.userservice.domain.FriendState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_one")
    private Member user_one;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_two")
    private Member user_two;

    private FriendState state;

    public Friend (Member user_one, Member user_two, FriendState state){
        this.user_one = user_one;
        this.user_two = user_two;
        this.state = state;
    }
}
