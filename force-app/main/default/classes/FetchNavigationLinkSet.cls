/**
 * @description       : 
 * @author            : Arijit Naskar
 * @group             : 
 * @last modified on  : 03-18-2024
 * @last modified by  : Arijit Naskar
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   03-18-2024   Arijit Naskar   Initial Version
**/
global class FetchNavigationLinkSet extends VisualEditor.DynamicPickList {
    global override VisualEditor.DataRow getDefaultValue() {
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow(
            'Default Navigation',
            'Default Navigation'
        );
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {
        VisualEditor.DynamicPickListRows picklistValues = new VisualEditor.DynamicPickListRows();
        List<NavigationLinkSet> navigationLinkSetList = [
            SELECT MasterLabel, DeveloperName
            FROM NavigationLinkSet
        ];
        for (NavigationLinkSet navigationLinkSet : navigationLinkSetList) {
            VisualEditor.DataRow value = new VisualEditor.DataRow(
                navigationLinkSet.MasterLabel,
                navigationLinkSet.DeveloperName
            );
            picklistValues.addRow(value);
        }
        return picklistValues;
    }
}