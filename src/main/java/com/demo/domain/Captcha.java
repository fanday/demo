package com.demo.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.demo.domain.enumeration.CaptchaStatus;

/**
 * A Captcha.
 */
@Entity
@Table(name = "captcha")
public class Captcha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "mobile_phone_number", nullable = false)
    private String mobilePhoneNumber;

    @NotNull
    @Column(name = "captcha", nullable = false)
    private String captcha;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "captcha_status", nullable = false)
    private CaptchaStatus captchaStatus;

    @Column(name = "create_date")
    private ZonedDateTime createDate;

    @Column(name = "modify_date")
    private ZonedDateTime modifyDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobilePhoneNumber() {
        return mobilePhoneNumber;
    }

    public void setMobilePhoneNumber(String mobilePhoneNumber) {
        this.mobilePhoneNumber = mobilePhoneNumber;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public CaptchaStatus getCaptchaStatus() {
        return captchaStatus;
    }

    public void setCaptchaStatus(CaptchaStatus captchaStatus) {
        this.captchaStatus = captchaStatus;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public ZonedDateTime getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(ZonedDateTime modifyDate) {
        this.modifyDate = modifyDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Captcha captcha = (Captcha) o;
        if(captcha.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, captcha.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Captcha{" +
            "id=" + id +
            ", mobilePhoneNumber='" + mobilePhoneNumber + "'" +
            ", captcha='" + captcha + "'" +
            ", captchaStatus='" + captchaStatus + "'" +
            ", createDate='" + createDate + "'" +
            ", modifyDate='" + modifyDate + "'" +
            '}';
    }
}
