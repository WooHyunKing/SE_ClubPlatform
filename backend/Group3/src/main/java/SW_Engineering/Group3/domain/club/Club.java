package SW_Engineering.Group3.domain.club;

import SW_Engineering.Group3.domain.auth.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Club {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clubName; // 클럽 이름
    private String presidentName; // 회장 이름
    private String introduce; // 한 줄 소개
    private String category;

    @JsonManagedReference
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    private List<ClubMemberList> clubMembers; // 동아리 부원들

    @Builder
    public Club(String clubName, String presidentName, String introduce, String category){
        this.clubName = clubName;
        this.presidentName = presidentName;
        this.introduce = introduce;
        this.category = category;
    }

}