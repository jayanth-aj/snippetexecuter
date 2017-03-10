'use strict';

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
                  
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller('homeCtrl', function($scope, $http) {

    $scope.execute = function(){
        var codestring = "" ;
        var file = $scope.codedfile;
        var reader = new FileReader();
        reader.onload = function(){
            var lines = this.result.split('\n');
            for(var line = 0; line < lines.length; line++){
                codestring = codestring +" "+lines[line];
            }
            $http({
            method : 'POST',
            url : 'http://cloudcompiler.esy.es/api/submissions',
            headers: {'Content-Type': 'application/json'},
            data : JSON.stringify({sourceCode:codestring, langId:$scope.language, timelimit:1, stdin:null}),
            }).then(function (response){
                $http({
                    method : 'GET',
                    url : 'http://cloudcompiler.esy.es/api/submissions/'+response.data.id,
                    headers: {'Content-Type': 'application/json'},
                }).then(function (response){
                    // $scope.timecompx = "sdfgh";
                    $scope.timecompx = response.data.time+" "+"sec";
                    $scope.memcompx = response.data.memory+" "+"kb";
                    $scope.comperr = response.data.cmperr;
                    $scope.stdout = response.data.stdout;
                });
            });
        };
        reader.readAsText(file);
    }

});