IONIC STEPS BAR
================================

A steps bar component for Ionic. 
---------------------------------

Steps to start:
---------------------------------
0.Install via bower or npm: <br />
```bower install ionic-steps-bar```
```npm install ionic-steps-bar```

1.Include ion-pullup.js in your HTML : <br />
    ```<script src="js/ionic-steps-bar.js"></script>```

2.Add dependencies to your app : <br />
   ```angular.module('yourApp', ['ionic', 'ionic-steps-bar'])```

3.Usage: <br />

```<ion-view view-title="Ionic Steps Bar">```<br />
    ```<ion-content scroll="false">```<br />
        ```<div ion-steps-bar set-step="1" options="{numOfSteps: 4,barHeigth: '20pt'}"></div>```<br />
    ```</ion-content>```<br />
```</ion-view>```<br />

Default options:
---------------------------------
```options = {```<br />
    ```numOfSteps: 2,```<br />
    ```numsColor: 'white',```<br />
    ```componentBack: 'transparent',```<br />
    ```barHeigth: '20pt',```<br />
    ```componentMargin: '1% 0', //not configurable```<br />
    ```highColor: '#8AA39B',```<br />
    ```highPadding: '0 0.5%', //not configurable```<br />
    ```backColor: '#95D9C3'```<br />
    ```}```<br />

Configurable options:
---------------------------------
numOfSteps    - Number of steps to show in the bar.<br />
numsColor     - Color of numbers in the bar.<br />
componentBack - Color of div container for ionic component (TRANSPARENT by DEFAULT).<br />
barHeigth     - Bar heigth (IF PROVIDED MUST BE IN PTs - 20pt,50pt,100pt etc. and 20pt is MINIMUM ).<br />
highColor     - Filling color(Color that fills steps when increased / decreased.).<br />
backColor     - Background color of steps bar.<br />
