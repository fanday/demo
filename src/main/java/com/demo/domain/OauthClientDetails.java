package com.demo.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by daiyungui on 16/5/3.
 */

@Entity
@Table(name = "oauth_client_details")
public class OauthClientDetails implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "client_id")
    private String clientId;

    @Column(name = "resource_ids")
    private String resourceIds;

    @Column(name="client_secret")
    private String clientSecret;

    @Column(name="Scope")
    private String scope;

    @Column(name="authorized_grant_types")
    private String authorizedGrantTypes;

    @Column(name="web_server_redirect_uri")
    private String webServerRedirectUri;

    @Column(name="authorities")
    private String authorities;

    @Column(name="access_token_validity")
    private Integer accessTokenValidity;

    @Column(name="refresh_token_validity")
    private Integer refreshTokenValidity;

    @Column(name="additional_information")
    private  String additionalInformation;

    @Column(name="autoapprove")
    private String autoapprove;

    public String getClientId(){
        return clientId;
    }

    public void setClientId(String newClientId){
        this.clientId = newClientId;
    }

    public String getResourceIds(){
        return resourceIds;
    }

    public void setResourceIds(String resourceIds){
        this.resourceIds = resourceIds;
    }

    public String getClientSecret(){
        return clientSecret;
    }

    public void setClientSecret(String clientSecret){
        this.clientSecret = clientSecret;
    }

    public String getScope(){
        return scope;
    }

    public void setScope(String scope){
        this.scope = scope;
    }

    public String getAuthorizedGrantTypes(){
        return authorizedGrantTypes;
    }

    public void setAuthorizedGrantTypes(String authorizedGrantTypes){
        this.authorizedGrantTypes = authorizedGrantTypes;
    }

    public String getWebServerRedirectUri(){
        return webServerRedirectUri;
    }

    public void setWebServerRedirectUri(String webServerRedirectUri){
        this.webServerRedirectUri = webServerRedirectUri;
    }

    public String getAuthorities(){
        return authorities;
    }

    public void setAuthorities(String authorities){
        this.authorities = authorities;
    }

    public Integer getAccessTokenValidity(){
        return accessTokenValidity;
    }

    public void setAccessTokenValidity(Integer accessTokenValidity){
        this.accessTokenValidity = accessTokenValidity;
    }

    public Integer getRefreshTokenValidity(){
        return refreshTokenValidity;
    }

    public void setRefreshTokenValidity(Integer refreshTokenValidity){
        this.refreshTokenValidity = refreshTokenValidity;
    }

    public String getAdditionalInformation(){
        return additionalInformation;
    }

    public void setAdditionalInformation(String additionalInformation){
        this.additionalInformation = additionalInformation;
    }

    public String getAutoapprove(){
        return  autoapprove;
    }

    public void setAutoapprove(String autoapprove){
        this.autoapprove = autoapprove;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OauthClientDetails entry = (OauthClientDetails) o;
        if(entry.clientId == null || clientId == null) {
            return false;
        }
        return Objects.equals(clientId, entry.clientId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(clientId);
    }

    @Override
    public String toString() {
        return "OauthClientDetails{" +
            "clientId=" + clientId +
            ", resourceIds='" + resourceIds + "'" +
            ", clientSecret='" + clientSecret + "'" +
            ", scope='" + scope + "'" +
            ", authorizedGrantTypes='" + authorizedGrantTypes + "'" +
            ", webServerRedirectUri='" + webServerRedirectUri + "'" +
            ", authorities='" + authorities + "'" +
            ", accessTokenValidity='" + accessTokenValidity + "'" +
            ", refreshTokenValidity='" + refreshTokenValidity + "'" +
            ", additionalInformation='" + additionalInformation + "'" +
            ", autoapprove='" + autoapprove + "'" +
            '}';
    }

}
