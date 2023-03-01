package devcamp.ottogi.userservice.repository;

import devcamp.ottogi.userservice.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    @Query("select f from Friend f join f.receiver where f.sender.id = :sender")
    Optional<List<Friend>> findFriends(@Param("sender") Long userId);

    @Query("select f from Friend f where f.sender.id = :sender and f.receiver.id = :receiver")
    Optional<Friend> findFriendRow(@Param("sender") Long sender, @Param(("receiver")) Long receiver);

    @Modifying
    @Query("delete from Friend f where f.sender.id = :sender and f.receiver.id = :receiver")
    void deleteFriendRow(@Param("sender") Long sender, @Param(("receiver")) Long receiver);

    @Query("select f from Friend f where f.sender.id = :sender and f.receiver.id = :receiver")
    Optional<Friend> existFriendRow(@Param("sender") Long sender, @Param(("receiver")) Long receiver);
}
