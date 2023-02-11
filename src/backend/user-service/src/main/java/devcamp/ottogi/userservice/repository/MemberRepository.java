package devcamp.ottogi.userservice.repository;

import devcamp.ottogi.userservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findMemberByEmail(String email);
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);

    @Modifying
    void deleteMemberById(Long id);


}
