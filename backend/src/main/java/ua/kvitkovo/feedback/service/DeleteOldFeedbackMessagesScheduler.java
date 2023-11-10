package ua.kvitkovo.feedback.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
@Component
public class DeleteOldFeedbackMessagesScheduler {

    private final FeedbackService feedbackService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void performMonthlyTask() {
        log.info("start delete old feedback message");
        LocalDate currentDate = LocalDate.now();
        LocalDate newDate = currentDate.minusMonths(1);
        feedbackService.deleteClosedMessages(newDate);
    }
}
