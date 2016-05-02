package com.demo.util;

/**
 * Created by daiyungui on 16/4/30.
 */
public interface SMSSender {
    Integer  sendCaptcha(String moboliePhoneNumber,String captcha) throws Exception;
}
