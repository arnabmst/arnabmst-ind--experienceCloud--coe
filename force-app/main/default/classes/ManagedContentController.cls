/**
 * @description       : 
 * @author            : Arijit Naskar
 * @group             : 
 * @last modified on  : 03-22-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   03-22-2024   Arijit Naskar   Initial Version
**/
public with sharing class ManagedContentController {
    @AuraEnabled(cacheable=true)
    public static String getContent(
        String contentId,
        Integer page,
        Integer pageSize,
        String language,
        String filterby
    ) {
        try {
            String networkId = Network.getNetworkId();
            String siteId = Site.getSiteId();
            System.debug('HELLO '+ siteId);

            ConnectApi.ManagedContentDeliveryDocument contentCollection = ConnectApi.ManagedContentDelivery.getManagedContentForSite(
                siteId,
                contentId,
                language,
                false
            );

            Map<String, Object> contentBody = contentCollection.contentBody;
            System.debug('HELLO WORLD '+ contentBody);
            System.debug('HELLO WORLD '+ contentCollection.contentBody);
            System.debug('TTT '+ contentBody.get('Banner_Image'));
            
            // System.debug('HBD 1: '+ contentCollection.title);
            // System.debug('HBD 2: '+ contentCollection.contentBody);
            // System.debug('HBD 1: '+ contentCollection.title);
            // System.debug('hello Ram '+ contentCollection.contentBody.Banner_Image);
            return (contentCollection.contentBody).toString();
        } catch (ConnectApi.ConnectApiException e) {
            System.debug('Error Message : ' + e);
            return null;
            // Map<String, ConnectApi.ManagedContentNodeValue> mcnvMap = new Map<String, ConnectApi.ManagedContentNodeValue>();
            // return mcnvMap;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<ConnectApi.ManagedContentVersion> getContentList(
        Integer page,
        Integer pageSize,
        String language,
        String filterby
    ) {
        try {
            String networkId = Network.getNetworkId();
            ConnectApi.ManagedContentVersionCollection contentCollection = ConnectApi.ManagedContent.getAllManagedContent(
                networkId,
                page,
                pageSize,
                language,
                filterby
            );
            return contentCollection.items;
        } catch (ConnectApi.ConnectApiException e) {
            System.debug('Error Message : ' + e);
            List<ConnectApi.ManagedContentVersion> mcnvMap = new List<ConnectApi.ManagedContentVersion>();
            return mcnvMap;
        }
    }
}