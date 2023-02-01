package devcamp.ottogi.userservice.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(length = 30, unique = true)
   @Email
   private String email;

   @Column(length = 100)
   private String password;

   @Enumerated(EnumType.STRING)
   private Authority authority;

   @Column(length = 30)
   private String name;

   @Column(columnDefinition = "TINYINT", length = 1)
   private int status;

   // 임시로 String
   private String profile;

   @OneToMany(mappedBy = "user_one", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   private List<Friend> user_one_list = new ArrayList<>();

   @OneToMany(mappedBy = "user_two", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   private List<Friend> user_two_list = new ArrayList<>();

   @Column(name = "created_at")
   private LocalDateTime createdAt;
   @Column(name = "updated_at")
   private LocalDateTime updatedAt;

   @Column(name = "accessed_at")
   private LocalDateTime accessAt;

   @PrePersist
   public void createdAt(){
      this.createdAt = LocalDateTime.now();
      this.updatedAt = createdAt;
   }

   @PreUpdate
   public void updatedAt(){
      this.updatedAt = LocalDateTime.now();
   }

   public enum Authority{
      ROLE_USER, ROLE_ADMIN
   }

}
