package com.demo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.demo.domain.Captcha;
import com.demo.repository.CaptchaRepository;
import com.demo.util.SMSSender;
import com.demo.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Captcha.
 */
@RestController
@RequestMapping("/api")
public class CaptchaResource {

    private final Logger log = LoggerFactory.getLogger(CaptchaResource.class);

    @Inject
    private CaptchaRepository captchaRepository;

    @Inject
    private SMSSender sender;

    /**
     * POST  /captchas : Create a new captcha.
     *
     * @param captcha the captcha to create
     * @return the ResponseEntity with status 201 (Created) and with body the new captcha, or with status 400 (Bad Request) if the captcha has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/captchas",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Captcha> createCaptcha(@Valid @RequestBody Captcha captcha) throws URISyntaxException {
        log.debug("REST request to save Captcha : {}", captcha);
        if (captcha.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("captcha", "idexists", "A new captcha cannot already have an ID")).body(null);
        }
        Captcha result = captchaRepository.save(captcha);
        try{
            Integer errorCode = sender.sendCaptcha(captcha.getMobilePhoneNumber(), captcha.getCaptcha());
            if(errorCode == 0) {
                log.info("send sms to mobile phone number:" + captcha.getMobilePhoneNumber() + " success");
            }else{
                log.error("send sms to mobile phone number:" + captcha.getMobilePhoneNumber() + " failed");
            }
        }catch( Exception e){
            log.error("send sms to mobile phone number:" + captcha.getMobilePhoneNumber() + " exception raised");
        }
        return ResponseEntity.created(new URI("/api/captchas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("captcha", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /captchas : Updates an existing captcha.
     *
     * @param captcha the captcha to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated captcha,
     * or with status 400 (Bad Request) if the captcha is not valid,
     * or with status 500 (Internal Server Error) if the captcha couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/captchas",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Captcha> updateCaptcha(@Valid @RequestBody Captcha captcha) throws URISyntaxException {
        log.debug("REST request to update Captcha : {}", captcha);
        if (captcha.getId() == null) {
            return createCaptcha(captcha);
        }
        Captcha result = captchaRepository.save(captcha);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("captcha", captcha.getId().toString()))
            .body(result);
    }

    /**
     * GET  /captchas : get all the captchas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of captchas in body
     */
    @RequestMapping(value = "/captchas",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Captcha> getAllCaptchas() {
        log.debug("REST request to get all Captchas");
        List<Captcha> captchas = captchaRepository.findAll();
        return captchas;
    }

    /**
     * GET  /captchas/:id : get the "id" captcha.
     *
     * @param id the id of the captcha to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the captcha, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/captchas/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Captcha> getCaptcha(@PathVariable Long id) {
        log.debug("REST request to get Captcha : {}", id);
        Captcha captcha = captchaRepository.findOne(id);
        return Optional.ofNullable(captcha)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /captchas/:id : delete the "id" captcha.
     *
     * @param id the id of the captcha to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/captchas/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCaptcha(@PathVariable Long id) {
        log.debug("REST request to delete Captcha : {}", id);
        captchaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("captcha", id.toString())).build();
    }

}
