package devcamp.ottogi.userservice.repository;

import devcamp.ottogi.userservice.entity.Friend;
import devcamp.ottogi.userservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    @Query("select f from Friend f join f.receiver where f.sender.id = :sender")
    List<Friend> findFriends(@Param("sender") Long userId);
}
