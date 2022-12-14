package SW_Engineering.Group3.dto.Board;

import SW_Engineering.Group3.domain.Board.Category;
import SW_Engineering.Group3.domain.Board.Community;
import SW_Engineering.Group3.domain.auth.Member;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityDto {

    private Long communityId;
    private String title;
    private String content;
    private Category category;

    public CommunityDto(Long communityId, String title, String content, Category category) {
        this.communityId = communityId;
        this.title = title;
        this.content = content;
        this.category = category;
    }

    public Community toCommunity() {
        return Community.builder()
                .title(title)
                .content(content)
                .category(category)
                .build();
    }
}
