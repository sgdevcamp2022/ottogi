package devcamp.ottogi.userservice.repository;

import devcamp.ottogi.userservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMemberByName(String name);
    Member findMemberByEmail(String email);
    Member findMemberById(Long id);
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);



}
