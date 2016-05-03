package com.demo.repository;

import com.demo.domain.OauthClientDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by daiyungui on 16/5/3.
 */
public interface OauthClientDetailsRepository extends JpaRepository<OauthClientDetails,String>{

}
