IONIC STEPS BAR
================================

A steps bar component for Ionic. 
---------------------------------

Steps to start:
---------------------------------

1.Include ion-pullup.js in your HTML : <br />
    ```<script src="js/ionic-steps-bar.js"></script>```

2.Add dependencies to your app : <br />
   ```angular.module('yourApp', ['ionic', 'ionic-steps-bar'])```

3.Usage: <br />

```<ion-view view-title="Ionic Steps Bar">```<br />
    ```<ion-content scroll="false">```<br />
        ```<div ion-steps-bar class="ion-steps-bar" set-step="1" options="{numOfSteps: 4,cellSize: '20pt'}"></div>```<br />
    ```</ion-content>```<br />
```</ion-view>```<br />

Default options:
---------------------------------
options = {
    numOfSteps: 2,
    numsColor: 'white',
    componentBack: 'transparent',
    cellSize: '20pt',
    componentMargin: '1% 0',
    highColor: '#8AA39B',
    highPadding: '0 0.5%', //not configurable
    backColor: '#95D9C3'
    }

Configurable options:
---------------------------------
