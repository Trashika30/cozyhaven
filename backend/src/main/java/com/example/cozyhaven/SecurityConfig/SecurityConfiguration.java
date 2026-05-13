package com.example.cozyhaven.SecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() throws Exception {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                //  OWNER + ADMIN
                .requestMatchers(
                        "/hotel/owner/searchByOwnerId/**"
                ).hasAnyRole("OWNER", "ADMIN")
                //  (permit all)
                .requestMatchers(
                        "/auth/**",
                        "/hotel/all/**",
                        "/payment/all/**",
                        "/booking/all/**",
                        "/review/all/**",
                        "/room/all/**"
                ).permitAll()
                //  OWNER 
                .requestMatchers(
                        "/hotel/owner/**",
                        "/payment/owner/**",
                        "/booking/owner/**",
                        "/room/owner/**",
                        "/review/owner/**"
                ).hasRole("OWNER")
                //  ADMIN
                .requestMatchers(
                        "/hotel/admin/**",
                        "/payment/admin/**",
                        "/booking/admin/**",
                        "/review/admin/**",
                        "/room/admin/**",
                        "/user/admin/**"
                ).hasRole("ADMIN")
                //CUSTOMER 
                .requestMatchers(
                        "/payment/customer/**",
                        "/booking/customer/**",
                        "/review/customer/**"
                ).hasRole("CUSTOMER")
                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
