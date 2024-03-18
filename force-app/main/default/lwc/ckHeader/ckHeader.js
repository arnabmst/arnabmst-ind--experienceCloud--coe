import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';

export default class CkHeader extends NavigationMixin(LightningElement) {
    @api menuName;
    @api buttonLabel;
    @api buttonRedirectPageUrl;

    error;
    menuItems = [];
    publishedState;
    isLoaded;

    handleBtnClick() {
        console.log(this.buttonRedirectPageUrl);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.buttonRedirectPageUrl
            }
        });
    }

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app =
            currentPageReference &&
            currentPageReference.state &&
            currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishedState = 'Draft';
        } else {
            this.publishedState = 'Live';
        }
    }

    @wire(getNavigationMenuItems, {
        menuName: '$menuName',
        publishedState: '$publishedState'
    })
    wiredMenuItems({error, data}){
        if(data && !this.isLoaded) {
            this.menuItems = data
                .map((item, index) => {
                    return {
                        target: item.target,
                        id: index,
                        label: item.label,
                        defaultListViewId: item.DefaultListViewId,
                        type: item.Type,
                        accessRestriction: item.AccessRestriction
                    }
                })
                .filter((item) => {
                    // Only show "Public" items if guest user
                    return (
                        item.accessRestriction == 'None' ||
                        (item.accessRestriction == 'LoginRequired' && 
                            !isGuestUser)
                    )
                })
                this.error = undefined;
                this.isLoaded = true;
        }else if(error){
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
        }
    }
}