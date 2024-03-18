import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import CK_LOGO from '@salesforce/resourceUrl/ckLogo';

export default class CkHeaderLogo extends NavigationMixin(LightningElement) {
    logo = CK_LOGO;

    handleClick(evt) {
        // use the NavigationMixin from lightning/navigation to perform the navigation.
        // prevent default anchor link since lightning navigation will be handling the click
        evt.stopPropagation();
        evt.preventDefault();
        // Navigate to the home page
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        });
    }
}