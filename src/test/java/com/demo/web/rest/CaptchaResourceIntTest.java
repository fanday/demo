package com.demo.web.rest;

import com.demo.DemoApp;
import com.demo.domain.Captcha;
import com.demo.repository.CaptchaRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.demo.domain.enumeration.CaptchaStatus;

/**
 * Test class for the CaptchaResource REST controller.
 *
 * @see CaptchaResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DemoApp.class)
@WebAppConfiguration
@IntegrationTest
public class CaptchaResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));

    private static final String DEFAULT_MOBILE_PHONE_NUMBER = "AAAAA";
    private static final String UPDATED_MOBILE_PHONE_NUMBER = "BBBBB";
    private static final String DEFAULT_CAPTCHA = "AAAAA";
    private static final String UPDATED_CAPTCHA = "BBBBB";

    private static final CaptchaStatus DEFAULT_CAPTCHA_STATUS = CaptchaStatus.NEW;
    private static final CaptchaStatus UPDATED_CAPTCHA_STATUS = CaptchaStatus.VERIFY_PASS;

    private static final ZonedDateTime DEFAULT_CREATE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_CREATE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_CREATE_DATE_STR = dateTimeFormatter.format(DEFAULT_CREATE_DATE);

    private static final ZonedDateTime DEFAULT_MODIFY_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_MODIFY_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_MODIFY_DATE_STR = dateTimeFormatter.format(DEFAULT_MODIFY_DATE);

    @Inject
    private CaptchaRepository captchaRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCaptchaMockMvc;

    private Captcha captcha;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CaptchaResource captchaResource = new CaptchaResource();
        ReflectionTestUtils.setField(captchaResource, "captchaRepository", captchaRepository);
        this.restCaptchaMockMvc = MockMvcBuilders.standaloneSetup(captchaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        captcha = new Captcha();
        captcha.setMobilePhoneNumber(DEFAULT_MOBILE_PHONE_NUMBER);
        captcha.setCaptcha(DEFAULT_CAPTCHA);
        captcha.setCaptchaStatus(DEFAULT_CAPTCHA_STATUS);
        captcha.setCreateDate(DEFAULT_CREATE_DATE);
        captcha.setModifyDate(DEFAULT_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void createCaptcha() throws Exception {
        int databaseSizeBeforeCreate = captchaRepository.findAll().size();

        // Create the Captcha

        restCaptchaMockMvc.perform(post("/api/captchas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(captcha)))
                .andExpect(status().isCreated());

        // Validate the Captcha in the database
        List<Captcha> captchas = captchaRepository.findAll();
        assertThat(captchas).hasSize(databaseSizeBeforeCreate + 1);
        Captcha testCaptcha = captchas.get(captchas.size() - 1);
        assertThat(testCaptcha.getMobilePhoneNumber()).isEqualTo(DEFAULT_MOBILE_PHONE_NUMBER);
        assertThat(testCaptcha.getCaptcha()).isEqualTo(DEFAULT_CAPTCHA);
        assertThat(testCaptcha.getCaptchaStatus()).isEqualTo(DEFAULT_CAPTCHA_STATUS);
        assertThat(testCaptcha.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testCaptcha.getModifyDate()).isEqualTo(DEFAULT_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void checkMobilePhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = captchaRepository.findAll().size();
        // set the field null
        captcha.setMobilePhoneNumber(null);

        // Create the Captcha, which fails.

        restCaptchaMockMvc.perform(post("/api/captchas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(captcha)))
                .andExpect(status().isBadRequest());

        List<Captcha> captchas = captchaRepository.findAll();
        assertThat(captchas).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCaptchaIsRequired() throws Exception {
        int databaseSizeBeforeTest = captchaRepository.findAll().size();
        // set the field null
        captcha.setCaptcha(null);

        // Create the Captcha, which fails.

        restCaptchaMockMvc.perform(post("/api/captchas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(captcha)))
                .andExpect(status().isBadRequest());

        List<Captcha> captchas = captchaRepository.findAll();
        assertThat(captchas).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCaptchaStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = captchaRepository.findAll().size();
        // set the field null
        captcha.setCaptchaStatus(null);

        // Create the Captcha, which fails.

        restCaptchaMockMvc.perform(post("/api/captchas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(captcha)))
                .andExpect(status().isBadRequest());

        List<Captcha> captchas = captchaRepository.findAll();
        assertThat(captchas).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCaptchas() throws Exception {
        // Initialize the database
        captchaRepository.saveAndFlush(captcha);

        // Get all the captchas
        restCaptchaMockMvc.perform(get("/api/captchas?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(captcha.getId().intValue())))
                .andExpect(jsonPath("$.[*].mobilePhoneNumber").value(hasItem(DEFAULT_MOBILE_PHONE_NUMBER.toString())))
                .andExpect(jsonPath("$.[*].captcha").value(hasItem(DEFAULT_CAPTCHA.toString())))
                .andExpect(jsonPath("$.[*].captchaStatus").value(hasItem(DEFAULT_CAPTCHA_STATUS.toString())))
                .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE_STR)))
                .andExpect(jsonPath("$.[*].modifyDate").value(hasItem(DEFAULT_MODIFY_DATE_STR)));
    }

    @Test
    @Transactional
    public void getCaptcha() throws Exception {
        // Initialize the database
        captchaRepository.saveAndFlush(captcha);

        // Get the captcha
        restCaptchaMockMvc.perform(get("/api/captchas/{id}", captcha.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(captcha.getId().intValue()))
            .andExpect(jsonPath("$.mobilePhoneNumber").value(DEFAULT_MOBILE_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.captcha").value(DEFAULT_CAPTCHA.toString()))
            .andExpect(jsonPath("$.captchaStatus").value(DEFAULT_CAPTCHA_STATUS.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE_STR))
            .andExpect(jsonPath("$.modifyDate").value(DEFAULT_MODIFY_DATE_STR));
    }

    @Test
    @Transactional
    public void getNonExistingCaptcha() throws Exception {
        // Get the captcha
        restCaptchaMockMvc.perform(get("/api/captchas/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCaptcha() throws Exception {
        // Initialize the database
        captchaRepository.saveAndFlush(captcha);
        int databaseSizeBeforeUpdate = captchaRepository.findAll().size();

        // Update the captcha
        Captcha updatedCaptcha = new Captcha();
        updatedCaptcha.setId(captcha.getId());
        updatedCaptcha.setMobilePhoneNumber(UPDATED_MOBILE_PHONE_NUMBER);
        updatedCaptcha.setCaptcha(UPDATED_CAPTCHA);
        updatedCaptcha.setCaptchaStatus(UPDATED_CAPTCHA_STATUS);
        updatedCaptcha.setCreateDate(UPDATED_CREATE_DATE);
        updatedCaptcha.setModifyDate(UPDATED_MODIFY_DATE);

        restCaptchaMockMvc.perform(put("/api/captchas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedCaptcha)))
                .andExpect(status().isOk());

        // Validate the Captcha in the database
        List<Captcha> captchas = captchaRepository.findAll();
        assertThat(captchas).hasSize(databaseSizeBeforeUpdate);
        Captcha testCaptcha = captchas.get(captchas.size() - 1);
        assertThat(testCaptcha.getMobilePhoneNumber()).isEqualTo(UPDATED_MOBILE_PHONE_NUMBER);
        assertThat(testCaptcha.getCaptcha()).isEqualTo(UPDATED_CAPTCHA);
        assertThat(testCaptcha.getCaptchaStatus()).isEqualTo(UPDATED_CAPTCHA_STATUS);
        assertThat(testCaptcha.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testCaptcha.getModifyDate()).isEqualTo(UPDATED_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void deleteCaptcha() throws Exception {
        // Initialize the database
        captchaRepository.saveAndFlush(captcha);
        int databaseSizeBeforeDelete = captchaRepository.findAll().size();

        // Get the captcha
        restCaptchaMockMvc.perform(delete("/api/captchas/{id}", captcha.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Captcha> captchas = captchaRepository.findAll();
        assertThat(captchas).hasSize(databaseSizeBeforeDelete - 1);
    }
}
