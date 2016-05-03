package com.demo.security;

import com.demo.domain.OauthClientDetails;
import com.demo.repository.OauthClientDetailsRepository;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;

import javax.inject.Inject;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.ArrayList;
import org.springframework.security.oauth2.provider.client.BaseClientDetails;

/**
 * Created by daiyungui on 16/5/3.
 */


@Component
public class ClientDetailService implements ClientDetailsService  {

    @Inject
    OauthClientDetailsRepository clientDetails;
    @Override
    public ClientDetails loadClientByClientId(String clientId) throws ClientRegistrationException {
        OauthClientDetails client = clientDetails.findOne(clientId);

        if(client == null){
            return null;
            //FIXME:throw an exception
        }else{
            List<String> authorizedGrantTypes = new ArrayList<String>();
            authorizedGrantTypes.add("password");
            authorizedGrantTypes.add("refresh_token");
            authorizedGrantTypes.add("client_credentials");

            BaseClientDetails clientDetails = new BaseClientDetails();
            clientDetails.setClientId(client.getClientId());
            clientDetails.setClientSecret(client.getClientSecret());
            clientDetails.setAuthorizedGrantTypes(authorizedGrantTypes);

            return clientDetails;

        }

        /*
        * ClientDetails clientDetails = clientDetailsStore.loadClientByClientId(clientId);
		if(null == clientDetails)
			throw new ClientRegistrationException(clientId);
		return clientDetails;
        * */
    }
}
