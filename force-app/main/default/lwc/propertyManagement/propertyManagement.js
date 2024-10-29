import { LightningElement, api, track, wire } from 'lwc';
import getProperty from '@salesforce/apex/PropertyHandler_LWC.getProperty';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class PropertyManagement extends LightningElement {
    @api recordId;
    userId = USER_ID;
    verifiedVar;
    typeVar;
    isFalse = true;
    isTrue = false;

    @track propertyList = [];
    columns = [
        { label: 'Property Name', fieldName: 'Property_Name__c' },
        { label: 'Property Type', fieldName: 'Type__c' },
        { label: 'Property Location', fieldName: 'Location__c' },
        { label: 'Property Link', fieldName: 'Property_Link__c' }
    ];
    propertyOptions = [
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Residential', value: 'Residential' },
        { label: 'Rental', value: 'Rental' }
    ];

    @wire(getRecord, { recordId: '$userId', fields: ['User.Verified__c'] })
    recordFunction({ data, error }) {
        if (data) {
            this.verifiedVar = data.fields.Verified__c.value;
        } else {
            console.error(error);
        }
    }

    changeHandler(event) {
        this.typeVar = event.target.value;
    }

    handleClick() {
        getProperty({ type: this.typeVar, verified: this.verifiedVar })
            .then((result) => {
                this.isFalse = result.length === 0;
                this.isTrue = result.length > 0;
                this.propertyList = result;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
