package com.demo.repository;

import com.demo.domain.UserInfo;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserInfo entity.
 */
public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {

}
