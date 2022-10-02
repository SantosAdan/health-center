import { LightningElement } from 'lwc';
import { getSObjectValue } from "@salesforce/apex";
import obtainVenue from "@salesforce/apex/WizardVenueController.obtainVenue";

import DOCTOR_APPOINTMENT_OBJECT from "@salesforce/schema/Doctor_Appointment__c";
import VENUE_FIELD from "@salesforce/schema/Doctor_Appointment__c.Venue__c";

import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_BILLING_ADDRESS_FIELD from "@salesforce/schema/Account.BillingAddress";
import ACCOUNT_BILLING_STREET_FIELD from "@salesforce/schema/Account.BillingStreet";
import ACCOUNT_BILLING_CITY_FIELD from "@salesforce/schema/Account.BillingCity";
import ACCOUNT_BILLING_COUNTRY_FIELD from "@salesforce/schema/Account.BillingCountry";

export default class WizardVenueSection extends LightningElement {
    doctorAppointmentApiName = DOCTOR_APPOINTMENT_OBJECT;
    accountApiName = ACCOUNT_OBJECT;

    fields = {
        venue: VENUE_FIELD,
        venueAddress: ACCOUNT_BILLING_ADDRESS_FIELD
    }

    _venueSelected;
    _venue;
    mapMarkers = [];

    get venueSelected() {
        return this._venueSelected && Array.isArray(this._venueSelected) && this._venueSelected.length > 0;
    }

    get venueId() {
        return this.venueSelected ? this._venueSelected[0] : undefined;
    }

    handleChange = (event) => {
        this._venueSelected = event.detail.value;

        obtainVenue({ venueId: this.venueId })
            .then(venue => {
                this._venue = venue;

                this.mapMarkers = [
                    {
                        location: {
                            Street: getSObjectValue(this._venue, ACCOUNT_BILLING_STREET_FIELD),
                            City: getSObjectValue(this._venue, ACCOUNT_BILLING_CITY_FIELD),
                            Country: getSObjectValue(this._venue, ACCOUNT_BILLING_COUNTRY_FIELD),
                        },
                        title: getSObjectValue(this._venue, ACCOUNT_NAME_FIELD),
                        description: '',
                        icon: 'standard:account'
                    }
                ];
            })
            .catch(error => console.error(error))
    }
}