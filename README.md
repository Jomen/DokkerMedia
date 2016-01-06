# DokkerMedia

Kjøre/teste mobilappen:</br>
Node.js må være installert. 
Jeg bruker versjon: <code>4.2.2</code> (usikker om nyere versjoner fungerer optimalt ved build).

Installer Cordova og Ionic-framework: http://ionicframework.com/getting-started/

<code>$ npm install -g cordova ionic</code>

Jeg bruker <code>ionic -v 1.7.10</code>

og <code>bower -v 1.5.3</code> (anbefales ved plugin installasjoner)

Last ned prosjektmappa: DokkerMedia fra github

<code>cd</code> til DokkerMedia

<em>Test nav. mobilapp i nettleser:</em>

<code>$ ionic serve</code>   
og sett nettleservinduet i utviklermodus

<em>Emuler mobilapp:</em>

<code>$ ionic emulate ios</code>       (xcode installert)</br>
<code>$ ionic run android</code>       (Genymotion installert og kjørende)

<em>Installer og kjør app på USB-tilkoblet enhet/mobil:</em>

<code>$ ionic run ios --device</code></br>
<code>$ ionic run android --device</code>

<strong>Om DokkerMedia appen:</strong>
Det anbefales at appen kompileres(build) og installeres på mobil enhet da en må ha tilgang til enhetens kamera og video-bibliotek. Når video-opptak er gjort eller tidligere opptak valg, vil en Last opp video-knapp bli synlig. Det er denne knappen som skal igangsette opplastingen til Dokkers Vimeo-konto. Etter anbefalig fra Vimeo har jeg valgt å benytte et Cordova-tilrettelagt skript som er å finne på: <a href>https://github.com/websemantics/vimeo-upload</a>.</br>
<code>upload-cordova.js</code> vil lage et FileReader object og la dette ta hånd om opplastingen.

Her er utsnitt fra e-post kommunikasjon med Adnan:</br>
... for Cordova I avoided using content(blob object) and manually initiated a FileReader object.

Yes, you need the FileTransfer plugin, 

What you will is to use the plugin to load the content of the file, .. for uploading use the upload-cordova.js .. For example, here you will see the FileReader() which will read the content that will be sent.

Triggering the upload process goes the same as the example provided in index.html, but also, have a look in the changes make by another member to the upload-cordova.js that might give you a better idea, .. 

<a href>https://github.com/websemantics/vimeo-upload/pull/3/files</a>

Hope that helps .. Take care</br>
Adnan

Jeg ønsker at man tester Live versjonen av <a href="http://websemantics.github.io/vimeo-upload/">vimeo-upload</a> med <code>accessToken</code> key som er å finne i <code>controller.js</code> og <code>uploadVideo</code> funksjonen. Last gjerne også ned <code>index.html</code> og <code>upload-cordova.js</code> og gjør <code>local</code> test. <code>index.html</code> til vimeo-upload benytter en <code>drop_zone</code> div med <code>handleDragOver</code> funksjon som igjen fyrer av en <code>handleFileSelect</code> med <code>var uploader = new MediaUploader</code>... og ...<code>uploader.upload();</code>.

Selve opplastingsscriptet er i dette eksemplet lagt til på vanlig måte som en script source i <code>index.html</code> med Cordova indentifisering:</br>
<code>script src="js/upload-cordova.js" onload="javascript:window.isCordovaApp = true;"</code>

Det jeg tenker er å få "bygd om" index.html fra å bruke <code>drop_zone</code> og <code>handleDragOver</code> til at <code>handleFileSelect</code> funksjonen blir avfyrt av en knapp med <code>uploadVideo()</code>funksjon(<code>video.html</code> linje 37) og (<code>controllers.js</code> linje 105). <code>handleFileSelect</code> i <code>index.html</code> må da ha på plass både <code>files</code> og <code>accessToken</code> for at <code>upload-cordova.js</code> og <code>FileReader</code> kan starte.

Adnan som har skrevet <code>upload.js</code> anbefaler bruk av <code>FileReader</code> siden dette har god støtte i Cordova og dens <code>FileTransfer</code> plugin. Jeg mener at <code>FileReader</code>-objectet blir laget ved identifisering a Cordova i <code>upload-cordova.js</code> og ikke før.</br>
Jeg er litt usikker på om <code>upload-cordova.js</code> er implementert riktig eller på beste måte når det bare er som <code>src</code> til <code>index.html</code> eller at om kode i <code>upload-cordova.js</code> burde bygges inn i en Angular  <code>.controller</code> eller kanskje aller helst en <code>.service</code> i prosjektet?

