package com.demo.repository;

import com.demo.domain.Captcha;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Captcha entity.
 */
public interface CaptchaRepository extends JpaRepository<Captcha,Long> {

}
