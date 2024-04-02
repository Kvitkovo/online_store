package ua.kvitkovo.users.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ua.kvitkovo.users.repository.UserRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserDeleteScheduler {

    private final UserRepository userRepository;

    @Scheduled(cron = "0 * * * * *")
    public void deleteUsers() {
        userRepository.deleteNotValidatedUsers(LocalDateTime.now().minusHours(2));
    }
}
