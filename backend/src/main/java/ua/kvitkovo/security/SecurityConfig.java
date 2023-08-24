package ua.kvitkovo.security;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import ua.kvitkovo.security.jwt.AccessDeniedHandlerJwt;
import ua.kvitkovo.security.jwt.AuthenticationEntryPointJwt;
import ua.kvitkovo.security.jwt.JwtConfigure;
import ua.kvitkovo.security.jwt.JwtTokenProvider;

/**
 * @author Andriy Gaponov
 */
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private static final String ADMIN_ENDPOINT = "/v1/admin/**";
    private static final String LOGIN_ENDPOINT = "/v1/auth/login";
    private static final String REGISTER_ENDPOINT = "/v1/auth/register";
    private static final String[] AUTH_WHITELIST = {
            LOGIN_ENDPOINT,
            REGISTER_ENDPOINT,
            // -- Swagger UI v2
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };
    private static final String[] GET_PERMITTED_ENDPOINTS = {
            "/v1/categories/**",
            "/v1/products/**",
            "/v1/shops/**",
            "/v1/orders/**",
            "/v1/colors/**",
            "/v1/sizes/**",
            "/v1/filter/**",
            "/v1/types/**",
            "/v1/users/email/**",
    };

    private static final String[] POST_PERMITTED_ENDPOINTS = {
        "/v1/users/resetPassword/**",
    };

    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationEntryPointJwt authenticationEntryPointJwt;
    @Autowired
    private AccessDeniedHandlerJwt accessDeniedHandlerJwt;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().disable().csrf()
                .disable()
                .httpBasic().disable()
                .formLogin().disable()
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(AUTH_WHITELIST).permitAll()
                        .requestMatchers(ADMIN_ENDPOINT).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, GET_PERMITTED_ENDPOINTS).permitAll()
                        .requestMatchers(HttpMethod.POST, POST_PERMITTED_ENDPOINTS).permitAll()
                        .anyRequest().hasRole("ADMIN"))
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPointJwt)
                .and().exceptionHandling().accessDeniedHandler(accessDeniedHandlerJwt)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().apply(new JwtConfigure(jwtTokenProvider))
        ;

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .build();
    }

}
