# ionic-steps-bar
A steps bar component for Ionic. 

Steps to start:

1.Include ion-pullup.js in your HTML : <script src="js/ionic-steps-bar.js"></script>

2.Add dependencies to your app : angular.module('yourApp', ['ionic', 'ionic-steps-bar'])

3.Usage: 

<ion-view view-title="Ionic Steps Bar">
    <ion-content scroll="false">
        <div ion-steps-bar
             class="ion-steps-bar"
             set-step="1"
             options="{numOfSteps: 4,cellSize: '20pt'}"></div>
    </ion-content>
</ion-view>
