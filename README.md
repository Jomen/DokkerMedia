# DokkerMedia

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

<code>$ ionic emulate ios</code>       (xcode installert)
<code>$ ionic run android</code>       (Genymotion installert og kjørende)

<em>Installer og kjør app på USB-tilkoblet enhet/mobil:</em>

<code>$ ionic run ios --device</code></br>
<code>$ ionic run android --device</code>

<strong>Om DokkerMedia appen:</strong>
Det anbefales at appen kompileres(build) og installeres på mobil enhet da en må ha tilgang til enhetens kamera og video-bibliotek. Når video-opptak er gjort eller tidligere opptak valg, vil en Last opp video-knapp bli synlig. Det er denne knappen som skal igangsette opplastingen til Dokkers Vimeo-konto. Etter anbefalig fra Vimeo har jeg valgt å benytte et Cordova-tilrettelagt skript som er å finne på: <a href>https://github.com/websemantics/vimeo-upload</a>
