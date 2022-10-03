import { LightningElement, api } from 'lwc';

export default class WizardVerticalNavigation extends LightningElement {
    @api stages;

    handleNavSelected = (event) => {
        this.dispatchEvent(
            new CustomEvent('navselected', { detail : { selectedStage : event.detail.selectedStage } })
        );
    }
}