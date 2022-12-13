package SW_Engineering.Group3.dto.Board;

import SW_Engineering.Group3.domain.Board.Anonymous;
import SW_Engineering.Group3.domain.auth.Member;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnonymousDto {

    private Long anonymousId;
    private String title;
    private String content;
    private Boolean isAnonymous;

    public AnonymousDto(Long anonymousId, String title, String content, Boolean isAnonymous) {
        this.anonymousId = anonymousId;
        this.title = title;
        this.content = content;
        this.isAnonymous = isAnonymous;
    }

    public Anonymous toAnonymous() {
        return Anonymous.builder()
                .title(title)
                .content(content)
                .isAnonymous(isAnonymous)
                .build();
    }
}
