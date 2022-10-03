import { LightningElement, api } from 'lwc';

export default class WizardVerticalNavigationItem extends LightningElement {
    @api stage;

    get isActiveClass() {
        return this.stage.active ? 'slds-nav-vertical__item slds-is-active' : 'slds-nav-vertical__item';
    }

    handleClick = (event) => {
        event.preventDefault();

        const selectedStage = {...this.stage, active: true};

        this.dispatchEvent(
            new CustomEvent('selected', { detail : { selectedStage } })
        );
    }
}