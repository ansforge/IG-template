try {
  var currentTabIndex = sessionStorage.getItem('fhir-resource-tab-index');
} catch(exception) {
  console.log(`Exception while retrieving tab index from sessionStorage: ${exception}`);
}

if (!currentTabIndex)
  currentTabIndex = '0';

$( '#tabs' ).tabs({
  active: currentTabIndex,
  activate: function( event, ui ) {
    currentTabIndex = ui.newTab.index();
    document.activeElement.blur();
    try {
      sessionStorage.setItem('fhir-resource-tab-index', currentTabIndex);
    } catch(exception) {
      console.log(`Exception while storing tab index to sessionStorage: ${exception}`);
    }
  }
});
