package ua.kvitkovo.feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.kvitkovo.feedback.entity.FeedbackMessage;

/**
 * @author Andriy Gaponov
 */
public interface FeedbackRepositoryBasic extends JpaRepository<FeedbackMessage, Long>, JpaSpecificationExecutor {

}
