import { LightningElement, api, wire } from 'lwc';
import { getContent } from 'experience/cmsDeliveryApi';
import siteId from '@salesforce/site/Id'
import basePath from '@salesforce/community/basePath'

export default class CkCarouselItem extends LightningElement {
    @api contentId;
    title;
    bannerImage;
    bannerMainTitle;
    bannerSubTitle;
    buttonTitle;
    urlRedirectionLink;

    url;

    tabIndex = '-1';

    data;

    altText;

    @wire(getContent, {channelOrSiteId: siteId, contentKeyOrId: '$contentId'})
    onGetContent(result) {
        if (result.data) {
            this.data = result.data;
            this.url = basePath + '/sfsites/c' + this.data.contentBody.Banner_Image.url;
            this.altText = this.data.contentBody.altText;
            this.title = this.data.contentBody.Title;
            this.bannerMainTitle = this.data.contentBody.Banner_Main_Title;
            this.bannerSubTitle = this.data.contentBody.Banner_Sub_Title;
            console.log(this.data);
        }
    }
}