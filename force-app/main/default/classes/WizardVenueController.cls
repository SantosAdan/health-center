public with sharing class WizardVenueController {
    
    @AuraEnabled
    public static Account obtainVenue(String venueId) {
        try {
            return [SELECT Id, Name, BillingStreet, BillingCity, BillingCountry FROM Account WHERE Id = :venueId WITH SECURITY_ENFORCED];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
