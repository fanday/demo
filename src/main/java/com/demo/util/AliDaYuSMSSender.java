package com.demo.util;

import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.NotNull;

/**
 * Created by daiyungui on 16/4/30.
 */

@Component
//@ConfigurationProperties(prefix="sms")
public class AliDaYuSMSSender implements SMSSender {
    @NotNull
    @Value("${sms.url}")
    private String url;

    @NotNull
    @Value("${sms.appKey}")
    private String appKey;

    @NotNull
    @Value("${sms.appSecret}")
    private String appSecret;

    @NotNull
    @Value("${sms.signName}")
    private String signName;

    @NotNull
    @Value("${sms.product}")
    private String product;

    @NotNull
    @Value("${sms.templateCode}")
    private String templateCode;

    @NotNull
    @Value("${sms.extend}")
    private String extend;

    @NotNull
    @Value("${sms.type}")
    private String type;

    private final Logger log = LoggerFactory.getLogger(AliDaYuSMSSender.class);

//    public AliDaYuSMSSender(){
//        System.out.println("****************Init SMSSender******************");
//        url = "http://gw.api.taobao.com/router/rest";
//        appKey = "23355874";
//        appSecret = "e38470d2552d3b62dcb68b4a90b21ea6";
//        extend = "123456";
//        signName = "活动验证";
//        type = "normal";
//        product = "fnd_demo";
//        templateCode = "SMS_8320598";
//        //FIXME:get configuration from yml or database
//    }

    public Integer sendCaptcha(String mobilPhoneNumber,String captcha) throws Exception{
        TaobaoClient client = new DefaultTaobaoClient(url, appKey, appSecret);
        AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
        req.setExtend(extend);
        req.setSmsType(type);
        req.setSmsFreeSignName(signName);
        String sms = new String(String.format("{\"code\":\"%s\",\"product\":\"%s\"}", captcha, product));
        req.setSmsParamString(sms);
        req.setRecNum(mobilPhoneNumber);
        req.setSmsTemplateCode(templateCode);
        try {
            AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
            String errorCode = rsp.getErrorCode();
            if (errorCode == "0"){
                log.info("send SMS to:"+mobilPhoneNumber+" success.Info: "+rsp.getBody());

                return 0;
            }else{
                log.error("send SMS to:"+mobilPhoneNumber+" failed.Info: "+rsp.getBody());
                return 1;
            }


        }catch (Exception e) {
            log.error("send SMS to:" + mobilPhoneNumber + " raised an exception.Info: " + e);
            throw e;
        }
    }
}
