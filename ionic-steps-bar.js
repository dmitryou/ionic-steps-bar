/**
 * The MIT License (MIT)

 Copyright (c) 2016 dmitryou

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

angular.module('ionic-steps-bar', [])
  .constant('ionStepsBarDefaultConfigs', {
    numOfSteps: 2,
    numsColor: 'white',
    componentBack: 'transparent',
    barHeigth: '20pt',
    componentMargin: '0 auto',
    highColor: '#8AA39B',
    backColor: '#95D9C3',
    radius: true,
    dir: 'rtl',
    testing: false,
    areola: false
  })
  .directive('ionStepsBar', [ionStepsBarDirective]);

function ionStepsBarDirective() {

  var ionDirective = {
    restrict: 'A',
    scope: {
      options:'=',
      setStep: '=',
    },
    template: function(){

      var template = [
        '<ul>',
        '<li>',
        '<div ng-style="higthlight"></div>',
        '</li>',
        '<style>',
        '{{lastChildStyle}}',
        '</style>',
        '<li dir="{{options.dir ? options.dir : defaultConfigs.dir}}" class="step-indicator-container" ng-repeat="item in stepsNumbers track by $index" ng-bind="$index + 1" style="display: inline-block;position: relative;height: 100%;width:{{barHeigth}};{{everyChildStyle}}line-height: {{barHeigth}};font-size:{{fontSize}}">',
        '</li>',
        '</ul>'
      ];

      return template.join('\n');
    },
    controller: ['$scope', '$element', '$attrs', '$timeout', '$rootScope', '$window', '$ionicPlatform', 'ionStepsBarDefaultConfigs', function ($scope, $element, $attrs, $timeout, $rootScope, $window, $ionicPlatform, defaultConfigs) {

      $scope.defaultConfigs = defaultConfigs;
      $scope.areola = $scope.options.areola ? $scope.options.areola : $scope.defaultConfigs.areola;
      //get bar height in pt from options
      $scope.barHeigth = $scope.options.barHeigth ? $scope.options.barHeigth : $scope.defaultConfigs.barHeigth;

      //direction and last child margin
      $scope.direction = $scope.options.dir ? $scope.options.dir : $scope.defaultConfigs.dir;
      $scope.lastChildStyle = $scope.direction === 'rtl'? 'li.step-indicator-container:last-child {margin-left: 0 !important;}':'li.step-indicator-container:last-child {margin-right: 0 !important;}';
      $scope.everyChildStyle = $scope.direction === 'rtl'? 'margin-left: ' + $scope.barHeigth + ';':'margin-right: ' + $scope.barHeigth + ';';


      $scope.step = parseInt($scope.options.numOfSteps && $scope.options.numOfSteps < 5? $scope.options.numOfSteps : $scope.defaultConfigs.numOfSteps);

      $scope.fontSize = calculateFontSize();
      $scope.stepsNumbers= new Array($scope.step);
      $scope.higthlight = {width: "100%"};
      $scope.setStep = $scope.setStep || 1;
      $scope.init = init;
      $scope.runTests = runTests;

      init();

      function init() {
        //Add step watcher
        $scope.$watch('setStep', function(newVal, oldVal){
          if(newVal > $scope.step ) {
            return;
          }
          if(newVal > 4) {
            $scope.setStep = 4;
          }
          if(newVal !== oldVal){
            calculateHighlightWidth(newVal);
          }
        }); //pass true as third element, for watching object

        runTests();
      }

      function runTests() {

        //testing
        if($scope.options.testing) {
          $timeout(function () {
            $scope.setStep = 2;
          },1000);

          $timeout(function () {
            $scope.setStep = 3;
          },2000);

          $timeout(function () {
            $scope.setStep = 4;
          },3000);

          $timeout(function () {
            $scope.setStep = 3;
          },4000);

          $timeout(function () {
            $scope.setStep = 2;
          },5000);

          $timeout(function () {
            $scope.setStep = 1;
          },6000);
        }
      }

      function calculateHighlightWidth(toNum) {
        if(toNum === 1) {
          $scope.higthlight = {width: "100%"};
        } else {
          var percents;
          if($scope.areola === true) {
            percents = ((2 * toNum - 1) * 100) - (4 * toNum);
          } else {
            percents = (2 * toNum - 1) * 100;
          }

          $scope.higthlight = {width: percents + "%"};
        }
      }

      function calculateFontSize() {
        var barHeigth = parseInt($scope.options.barHeigth ? $scope.options.barHeigth.split("pt")[0] : $scope.defaultConfigs.barHeigth.split("pt")[0]);
        return barHeigth / 2 + "pt";
      }

    }],
    link: function(scope, element) {

      setComponentInitialStyles();

      function setComponentInitialStyles() {
        /**
         * Stroke and numbers direction
         */
        scope.direction = scope.options.dir ? scope.options.dir : scope.defaultConfigs.dir;
        scope.radius = scope.options.radius ? scope.options.radius : scope.defaultConfigs.radius;

        element.css('background-color', scope.options.componentBack ? scope.options.componentColor : scope.defaultConfigs.componentBack);
        element.css('color', scope.options.numsColor ? scope.options.numsColor : scope.defaultConfigs.numsColor);
        element.css('height', scope.options.barHeigth ? scope.options.barHeigth : scope.defaultConfigs.barHeigth);
        element.css('margin', scope.options.componentMargin ? scope.options.componentMargin : scope.defaultConfigs.componentMargin);
        element.find('ul').eq(0).css('background-color', scope.options.backColor ? scope.options.backColor : scope.defaultConfigs.backColor);
        element.find('ul').eq(0).css('direction', scope.options.dir ? scope.options.dir : scope.defaultConfigs.dir);

        //relative position of highlight
        element.find('ul').eq(0).css('position', 'relative');
        if(scope.direction === 'rtl') {
          element.find('li').eq(0).css('right', '1%');//should be equal to top pos
        } else {
          element.find('li').eq(0).css('right', '85%');//should be equal to top pos
        }
        element.find('ul').eq(0).css('width', calculateBarWidth());
        element.find('ul').eq(0).css('text-align', 'center');
        element.find('ul').eq(0).css('margin', 'auto');

        //rounded corners of bar and highlight
        if(scope.radius === true) {
          element.find('ul').eq(0).css('border-radius', scope.options.barHeigth ? scope.options.barHeigth : scope.defaultConfigs.barHeigth);
          element.find('li').eq(0).find('div').eq(0).css('border-radius', scope.options.barHeigth ? scope.options.barHeigth : scope.defaultConfigs.barHeigth);

        }
        // } else {
        //   element.find('li').eq(0).css('height', '100%');
        // }

        //areola
        scope.areola = scope.options.areola ? scope.options.areola : scope.defaultConfigs.areola;
        if(scope.areola === true) {
          element.find('li').eq(0).css('height', '86%');
          element.find('li').eq(0).css('position', 'absolute');
          element.find('li').eq(0).css('top', '7%');//should be equal to right pos
        } else {
          console.log("no hila");
          element.find('li').eq(0).css('height', '100%');
          element.find('li').eq(0).css('position', 'absolute');
          element.find('li').eq(0).css('top', '0%');//should be equal to right pos
          if(scope.direction === 'rtl') {
            element.find('li').eq(0).css('right', '0%');//should be equal to top pos
          } else {
            element.find('li').eq(0).css('right', calculateAbsoluteHighligthPosition());//should be equal to top pos
          }

        }

        element.find('li').eq(0).css('width', scope.options.barHeigth ? scope.options.barHeigth : scope.defaultConfigs.barHeigth);
        element.find('li').eq(0).find('div').eq(0).css('background-color', scope.options.highColor ? scope.options.highColor : scope.defaultConfigs.highColor);
        element.find('li').eq(0).find('div').eq(0).css('height', '100%');
        element.find('li').eq(0).find('div').eq(0).css('transition', 'width 0.5s');
      }

      function calculateBarWidth() {
        var numOfSteps = parseInt(scope.options.numOfSteps && scope.options.numOfSteps < 5? scope.options.numOfSteps : scope.defaultConfigs.numOfSteps);
        var barHeigth = parseInt(scope.options.barHeigth ? scope.options.barHeigth.split("pt")[0] : scope.defaultConfigs.barHeigth.split("pt")[0]);
        var barSize = barHeigth * (numOfSteps + numOfSteps - 1);
        return barSize + "pt";
      }

      function calculateAbsoluteHighligthPosition() {
        var numOfSteps = parseInt(scope.options.numOfSteps && scope.options.numOfSteps < 5? scope.options.numOfSteps : scope.defaultConfigs.numOfSteps);
        var barHeigth = parseInt(scope.options.barHeigth ? scope.options.barHeigth.split("pt")[0] : scope.defaultConfigs.barHeigth.split("pt")[0]);
        var barSize = barHeigth * (numOfSteps + numOfSteps - 2 );
        return barSize + "pt";
      }

    }
  }

  return ionDirective;
}
