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
    cellSize: '20pt',
    componentMargin: '1% 0',
    highColor: '#8AA39B',
    highPadding: '0 0.5%', //not configurable
    backColor: '#95D9C3'
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
        'li.step-indicator-container:last-child {margin-left: 0 !important;}',
        '</style>',
        '<li class="step-indicator-container" ng-repeat="item in stepsNumbers track by $index" ng-bind="$index + 1" style="display: inline-block;position: relative;height: 100%;width: calc({{cellSize}} - 0.5%);margin-left: {{cellSize}};line-height: {{cellSize}};font-size:{{fontSize}}">',
        '</li>',
        '</ul>'
      ];

      return template.join('\n');
    },
    controller: ['$scope', '$element', '$attrs', '$timeout', '$rootScope', '$window', '$ionicPlatform', 'ionStepsBarDefaultConfigs', function ($scope, $element, $attrs, $timeout, $rootScope, $window, $ionicPlatform, defaultConfigs) {

      $scope.defaultConfigs = defaultConfigs;
      $scope.step = parseInt($scope.options.numOfSteps && $scope.options.numOfSteps < 5? $scope.options.numOfSteps : $scope.defaultConfigs.numOfSteps);
      $scope.cellSize = $scope.options.cellSize ? $scope.options.cellSize : $scope.defaultConfigs.cellSize;
      $scope.fontSize = calculateFontSize();
      $scope.stepsNumbers= new Array($scope.step);
      $scope.higthlight = {width: "100%"};
      $scope.currentStep = $scope.setStep;

      $scope.$watch('currentStep', function(newVal, oldVal){
        if(newVal > $scope.step ) {
          return;
        }
        if(newVal > 4) {
          $scope.currentStep = 4;
        }
        if(newVal !== oldVal){
          calculateHighlightWidth(newVal);
        }
      }); //pass true as third element, for watching object

      function calculateHighlightWidth(toNum) {
        if(toNum === 1) {
          $scope.higthlight = {width: "100%"};
        } else {
          var percents = ((2 * toNum - 1) * 100) - (4 * toNum);
          $scope.higthlight = {width: percents + "%"};
        }
      }

      function calculateFontSize() {
        var cellSize = parseInt($scope.options.cellSize ? $scope.options.cellSize.split("pt")[0] : $scope.defaultConfigs.cellSize.split("pt")[0]);
        return cellSize / 2 + "pt";
      }

    }],
    link: function(scope, element) {

      setComponentInitialStyles();

      function setComponentInitialStyles() {
        element.css('background-color', scope.options.componentBack ? scope.options.componentColor : scope.defaultConfigs.componentBack);
        element.css('color', scope.options.numsColor ? scope.options.numsColor : scope.defaultConfigs.numsColor);
        element.css('height', scope.options.cellSize ? scope.options.cellSize : scope.defaultConfigs.cellSize);
        element.css('margin', scope.options.componentMargin ? scope.options.componentMargin : scope.defaultConfigs.componentMargin);
        element.find('ul').eq(0).css('background-color', scope.options.backColor ? scope.options.backColor : scope.defaultConfigs.backColor);
        element.find('ul').eq(0).css('direction', 'rtl');
        element.find('ul').eq(0).css('width', calculateBarWidth());
        element.find('ul').eq(0).css('text-align', 'center');
        element.find('ul').eq(0).css('height', '100%');
        element.find('ul').eq(0).css('position', 'relative');
        element.find('ul').eq(0).css('margin', 'auto');
        element.find('ul').eq(0).css('border-radius', scope.options.cellSize ? scope.options.cellSize : scope.defaultConfigs.cellSize);
        element.find('li').eq(0).css('height', '80%');
        element.find('li').eq(0).css('position', 'absolute');
        element.find('li').eq(0).css('top', '10%');//should be equal to right pos
        element.find('li').eq(0).css('right', '1%');//should be equal to top pos
        element.find('li').eq(0).css('width', scope.options.cellSize ? scope.options.cellSize : scope.defaultConfigs.cellSize);
        element.find('li').eq(0).find('div').eq(0).css('background-color', scope.options.highColor ? scope.options.highColor : scope.defaultConfigs.highColor);
        element.find('li').eq(0).find('div').eq(0).css('padding', scope.defaultConfigs.highPadding);
        element.find('li').eq(0).find('div').eq(0).css('height', '100%');
        element.find('li').eq(0).find('div').eq(0).css('transition', 'width 0.5s');
        element.find('li').eq(0).find('div').eq(0).css('border-radius', scope.options.cellSize ? scope.options.cellSize : scope.defaultConfigs.cellSize);
      }

      function calculateBarWidth() {
        var numOfSteps = parseInt(scope.options.numOfSteps && scope.options.numOfSteps < 5? scope.options.numOfSteps : scope.defaultConfigs.numOfSteps);
        var cellSize = parseInt(scope.options.cellSize ? scope.options.cellSize.split("pt")[0] : scope.defaultConfigs.cellSize.split("pt")[0]);
        var barSize = cellSize * (numOfSteps + numOfSteps - 1);
        return barSize + "pt";
      }
    }
  }

  return ionDirective;
}
