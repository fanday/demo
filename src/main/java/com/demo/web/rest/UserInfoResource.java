package com.demo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.demo.domain.UserInfo;
import com.demo.repository.UserInfoRepository;
import com.demo.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserInfo.
 */
@RestController
@RequestMapping("/api")
public class UserInfoResource {

    private final Logger log = LoggerFactory.getLogger(UserInfoResource.class);
        
    @Inject
    private UserInfoRepository userInfoRepository;
    
    /**
     * POST  /user-infos : Create a new userInfo.
     *
     * @param userInfo the userInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userInfo, or with status 400 (Bad Request) if the userInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/user-infos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserInfo> createUserInfo(@RequestBody UserInfo userInfo) throws URISyntaxException {
        log.debug("REST request to save UserInfo : {}", userInfo);
        if (userInfo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userInfo", "idexists", "A new userInfo cannot already have an ID")).body(null);
        }
        UserInfo result = userInfoRepository.save(userInfo);
        return ResponseEntity.created(new URI("/api/user-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userInfo", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-infos : Updates an existing userInfo.
     *
     * @param userInfo the userInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userInfo,
     * or with status 400 (Bad Request) if the userInfo is not valid,
     * or with status 500 (Internal Server Error) if the userInfo couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/user-infos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserInfo> updateUserInfo(@RequestBody UserInfo userInfo) throws URISyntaxException {
        log.debug("REST request to update UserInfo : {}", userInfo);
        if (userInfo.getId() == null) {
            return createUserInfo(userInfo);
        }
        UserInfo result = userInfoRepository.save(userInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userInfo", userInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-infos : get all the userInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userInfos in body
     */
    @RequestMapping(value = "/user-infos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserInfo> getAllUserInfos() {
        log.debug("REST request to get all UserInfos");
        List<UserInfo> userInfos = userInfoRepository.findAll();
        return userInfos;
    }

    /**
     * GET  /user-infos/:id : get the "id" userInfo.
     *
     * @param id the id of the userInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userInfo, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/user-infos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserInfo> getUserInfo(@PathVariable Long id) {
        log.debug("REST request to get UserInfo : {}", id);
        UserInfo userInfo = userInfoRepository.findOne(id);
        return Optional.ofNullable(userInfo)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /user-infos/:id : delete the "id" userInfo.
     *
     * @param id the id of the userInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/user-infos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserInfo(@PathVariable Long id) {
        log.debug("REST request to delete UserInfo : {}", id);
        userInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userInfo", id.toString())).build();
    }

}
