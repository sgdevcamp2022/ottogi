package devcamp.ottogi.userservice.repository;

import devcamp.ottogi.userservice.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    Optional<List<Invitation>> findAllByReceiver(Long receiver_id);

}
