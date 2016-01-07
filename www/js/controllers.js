angular.module('dokkermedia.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ArkivCtrl', function($scope) {})

.controller('VideoCtrl', function($scope, $timeout, $ionicLoading, $ionicActionSheet, $cordovaCapture, $cordovaCamera, $cordovaFileTransfer, $ionicPopup, $cordovaProgress){

  /*
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Et øyeblikk...</p><ion-spinner icon="ios"></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

  */
 $scope.show = false;

 $scope.data = {
    videoPath: ""
  };

  $scope.caption = "Velg Video";

  // old captureVideo function
  $scope.captureVideo = $scope.captureVideo = function(){
    var options = {
      quality: 50,
      limit: 3,
      duration: 15 };

      $cordovaCapture.captureVideo(options).then(function(videoData){
      // Success! Video data is here
      $scope.data.videoPath = "file:/" + videoData[0].fullPath;
      $scope.show = true;
      $scope.caption = "Velg ny Video";
    }, function(err){
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }

  // new getPicture(get recorded video) function
  $scope.getPicture = function(sourceType){
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    mediaType:Camera.MediaType.VIDEO
  };


  $cordovaCamera.getPicture(options).then(function(imageData){
      // $scope.hide($ionicLoading);
      // Success! Video data is here
      $scope.data.videoPath = imageData;
      $scope.show = true;
      $scope.caption = "Velg annen Video";
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }


  $scope.showOptions = function(){
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: 'Velge et opptak'
      }, {
        text: 'Gjøre nytt opptak'
      }],
      destructiveText: '',
      titleText: 'Hva ønsker du?',
      cancelText: 'Avbryt',
      cancel: function(){
        //hideSheet();
      },
      buttonClicked: function (index){
                        // Choose existing recording
                        if(index === 0){
                             $scope.getPicture();
                        }
                        // Create new recording
                        else if(index === 1){
                              $scope.captureVideo();
                        }
                        // Cancel operation
                        else {

                        }
                        return true;
                    }

    });

  };


  /**
   * Update progress bar.
   */
  $scope.updateProgress = function(progress) {
    progress = Math.floor(progress * 100);
    var element = document.getElementById('progress');
    element.setAttribute('style', 'width:'+progress+'%');
    element.innerHTML = progress+'%';
  };


  $scope.uploadVideo = function(){
    // Here the video object(video file for upload) must be identified and the upload-cordova.js(functions) is intended to be triggered
    var files = [];
    files[0] = $scope.data.videoPath; // FileList object.

    var accessToken = "ebe7fcd1378b55765fb124fcc6464e0e";

    // Rest the progress bar
    $scope.updateProgress(0);

    var uploader = new MediaUploader({
      file: files[0],
      token: accessToken,

      onError: function(data) {

        console.log('Error ', data);

        var errorResponse = JSON.parse(data);
        message = errorResponse.error;
      },

      onProgress: function(data) {
        console.log('in progress...');

        $scope.updateProgress(data.loaded / data.total);
      },

      onComplete: function(videoId) {
        console.log('Complete ',videoId);

        var url = "https://vimeo.com/"+videoId;
        var a = document.createElement('a');
        a.appendChild(document.createTextNode(url));
        a.setAttribute('href',url);

        var element = document.createElement("div");
        element.setAttribute('class', "alert alert-success");
        element.appendChild(a);

        document.getElementById('results').appendChild(element);
      }
    });

    uploader.upload();

  };



  $scope.showVidNamePopup = function() {
  //$scope.data = {}

  // An elaborate, custom popup
   var vidNamePopup = $ionicPopup.show({
     template: '<input type="text" ng-minlength= "8", ng-maxlength="16", ng-model="data.videoName">',
     title: 'Gi video et navn',
     subTitle: 'Bruk 8 til 16 tegn',
     scope: $scope,
     buttons: [
       { text: 'Avbryt' },
       {
         text: '<b>Lagre</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.videoName) {
             //don't allow the user to close unless he enters videoName text
             e.preventDefault();
           } else {
             return $scope.data.videoName;
           }
         }
       },
     ]
   });
   vidNamePopup.then(function(res) {
     console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 20000);
 };


});


