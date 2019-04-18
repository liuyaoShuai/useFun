

//针对所有checkbox和radio进行统一优化

$compileProvider.directive('ngIcheck', function($compile) {
  return {
    restrict : 'A',
    require : '?ngModel',
    link : function($scope, $element, $attrs, $ngModel) {
      if (!$ngModel) {
        return;
      }
      //using iCheck
      $($element).iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_square-blue',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
      }).on('ifClicked', function(event) {
        if ($attrs.type == "checkbox") {
          //checkbox, $ViewValue = true/false/undefined
          $scope.$apply(function() {
            $ngModel.$setViewValue(!($ngModel.$modelValue == undefined ? false : $ngModel.$modelValue));
          });
        } else {
          // radio, $ViewValue = $attrs.value
          $scope.$apply(function() {
            $ngModel.$setViewValue($attrs.value);
          });
        }
      });
    },
  };
});


//angular 表单实例

<div ng-app="myApp" ng-controller="formCtrl">
  <form novalidate>
    First Name:<br>
    <input type="text" ng-model="user.firstName"><br>
    Last Name:<br>
    <input type="text" ng-model="user.lastName">
    <br><br>
    <button ng-click="reset()">RESET</button>
  </form>
  <p>form = {{user}}</p>
  <p>master = {{master}}</p>
</div>
 
<script>
var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
    $scope.master = {firstName: "John", lastName: "Doe"};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});
</script>


//书本实例
window.onload = preparenLinks ;
	function preparenLinks(){
		var links = document.getElementsByTagName('a');
			for(var m=0;m<links.length;m++){
				if(links[m].getAttribute('class') == 'popup')
					{
						popUp(this.getAttribyte('href'));
						return false;
					}
			}
}

function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById('imagegallery')) return false;
	
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementByTagName('a');
	for(var m=0;m<links.length;m++){
		links[m].onclick = function(){
			
			showPic(this);
			return false;
		}
	}
}

//共享onload事件

function addLoadEvent(func){
	
	var onload = window.onload;
	if(type of window.onload != 'function'){
		
		window.onload = func;
		
	}else{

		window.onload = function(){
			oldonload();
			func();
		}
	
	}
	
}
