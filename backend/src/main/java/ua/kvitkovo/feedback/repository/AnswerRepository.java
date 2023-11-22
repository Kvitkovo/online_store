package ua.kvitkovo.feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.kvitkovo.feedback.entity.AnswerMessage;

/**
 * @author Andriy Gaponov
 */
public interface AnswerRepository extends JpaRepository<AnswerMessage, Long>,
    JpaSpecificationExecutor {

}
