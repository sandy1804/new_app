public with sharing class PropertyHandler_LWC {
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getProperty(String type, Boolean verified) {
        return [SELECT Property_Name__c, Type__c, Location__c, Property_Link__c
                FROM Property__c
                WHERE Type__c = :type AND Verified__c = :verified];
    }
}
