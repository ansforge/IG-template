$(document).ready(function(){
  if(globalThis.location.hash != "") {
      $('a[href="' + globalThis.location.hash + '"]').click()
  }
});
