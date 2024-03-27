import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

export default class CkNavigationMenuItem extends NavigationMixin(LightningElement) {
    /**
     * The NavigationMenuItem from the Apex controller,
     * contains a label and a target.
     */
    @api item = {};
    @track href = '#';

    /**
     * the PageReference object used by lightning/navigation
     */
    pageReference;

    connectedCallback() {
        const { type, target, defaultListViewId } = this.item;
        if(type === 'InternalLink') {
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: basePath + target
                }
            };
        }

        if (this.pageReference) {
            this[NavigationMixin.GenerateUrl](this.pageReference).then(
                (url) => {
                    this.href = url;
                }
            );
        }
    }

    handleNavigation() {
        this.dispatchEvent(new CustomEvent('navigation'));
    }

    handleClick(evt) {
        // use the NavigationMixin from lightning/navigation to perform the navigation.
        evt.stopPropagation();
        evt.preventDefault();
        this.handleNavigation();
        if (this.pageReference) {
            this[NavigationMixin.Navigate](this.pageReference);
        } else {
            console.log(
                `Navigation menu type "${
                    this.item.type
                }" not implemented for item ${JSON.stringify(this.item)}`
            );
        }
    }
}