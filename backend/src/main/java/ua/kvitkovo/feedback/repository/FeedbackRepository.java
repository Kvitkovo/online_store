package ua.kvitkovo.feedback.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.feedback.entity.FeedbackMessage;
import ua.kvitkovo.feedback.entity.MessageStatus;
import ua.kvitkovo.feedback.entity.MessageType;

import java.time.LocalDate;
import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Repository
public interface FeedbackRepository extends FeedbackRepositoryBasic {

    Page<FeedbackMessage> findByStatusAndTypeNot(MessageStatus status, MessageType type, Pageable pageable);

    List<FeedbackMessage> findByStatusAndCreatedLessThan(MessageStatus status, LocalDate date);
}
