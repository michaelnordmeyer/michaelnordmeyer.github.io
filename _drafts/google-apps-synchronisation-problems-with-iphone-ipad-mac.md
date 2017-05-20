---
title: Google Apps Synchronisierungsprobleme mit iPhone, iPad und Mac
categories:
  - Apple
tags:
  - Google Apps
  - iPad
  - iPhone
  - Mac
---
[Google Sync (ActiveSync): Known Limitations](https://support.google.com/a/users/answer/139635) The iPhone can synchronize up to 3 email address. Phone number synchronization is limited to 2 Home numbers, 1 Home Fax, 1 Mobile, 1 Pager, 3 Work (one will be labeled ‘Company Main’) and one Work Fax number. At this time Google Sync does not support custom “From:” addresses. The iPhone doesn’t reflect the attendee status (Yes/No/Maybe) of guests in the user interface of the Calendar application. Google Sync provides a hint in the form of a checkmark in front of a guest’s first name. Exchange Die hier beschriebenen Probleme treten auch mit GoogleMail und dem normalen Google Kalender auf und nicht nur mit Google Apps.

## Limitierungen

Google Contacts

### Übernimmt kein

* Geburtstag
* URLs
* (Bilder)
* frei definierte Felder wie z.B. von den Telefonnummern

### Unvollständig

* Notizen. Es fehlen sämtliche Formatierungen.

### Verändert

* Namen durch Zusammenfassung. Aus „Vorname” und „Nachname” wird „Vorname Nachname”. Dabei lässt Google den zweiten Vornamen unter den Tisch fallen.
* Adressen druch Zusammenfassung, Aus den Feldern „Straße”, „PLZ”, „Stadt” und „Land” wird ein Feld „Adresse”

> Google verwendet E-Mail-Adressen als eindeutige Kennung für die einzelnen Gmail-Kontakte. Falls einige Ihrer Kontakte dieselbe E-Mail-Adresse haben, werden u. U. nicht alle synchronisiert. Standardgemäß werden alle Adressen in Ihrem Gmail-Account, mit denen Sie korrespondiert haben, in die Synchronisierung aufgenommen. Es ist eventuell sinnvoll, die Kontaktliste in Ihrem Google Gmail-Account vor der Synchronisierung mit iTunes zu überprüfen und zu bearbeiten. Wenn Sie mit Mac OS X arbeiten und doppelte Kontaktinformationen zusammenführen müssen, ist es empfehlenswert, die Funktion zum Zusammenführen der Kontakte im OS X-Adressbuch zu verwenden, um die Liste mit den Kontakten nach der Synchronisierung noch zu verfeinern. Vergessen Sie nicht, dass diese Kontakte, falls Sie Ihren Computer mit MobileMe synchronisieren, womöglich auch mit MobileMe synchronisiert werden. Ein anderes, erheblich gefährlicheres Beispiel ist der Aufbau des Namens. Das iPhone kennt (wenn man alle Felder, die mit dem Namen zusammenhängen, hinzufügt): Titel, Vorname, Zweiter Vorname, Nachname, Namenszusatz, Spitzname. Google Contacts kennt allerdings nur Name und Titel, wobei „Titel” auch noch unterschiedliche Bedeutungen haben; beim iPhone ist damit „Herr” bzw. „Frau” gemeint, bei Google Contacts die Position, also beispielsweise „Geschäftsführer”. Zwar ist Google Contacts nicht dumm und setzt im Namensfeld beim Synchronisieren bzw. Importieren von Kontakten den Namen aus einzelnen Namensfeldern selbstständig zusammen, das funktioniert jedoch mitunter nicht fehlerfrei.

## Google Kalender / Google Calendar

* Übernimmt keine Alarme von Termine mit Erinnerung “Nachricht und Ton” aus iCal, sondern nur mit Nachricht. Auf dem iPhone und iPad kommt trotzdem ein Ton.
* Übernimmt das URL-Feld nicht
* Stellt die Zeitzone in iCal von mittels Google Calendar abonnierten Kalendern wie z.B. Facebook oder XING falsch dar, wenn in iCals Einstellungen > Erweitert die Zeitzonenunterstützung aktiviert ist.
* in der mobilen html5 ansicht können keine Termine mit Erinnerung angelegt werden bzw die Erinnerung verändert werden. Es wird nich nicht mal die voreinstellen übernommen, dass bei jedem neuen Kalendereintrag automatisch eine Erinnerung hinzu gefügt wird.

Wenn jetzt diese Daten von Google per Push auf das iPhone geschickt werden, passen die Daten nicht in die Felder des iPhone- und iPad-Adressbuches. Schön doof.

## Probleme der Mobile Apps

* Settings im HTML5-Kalender drücken: ohne Hinweis wird der angefangene Kalendereintrag gelöscht.
* Settings des normalen Kalenders (Zeitformat etc.) wird nicht honoriert: bei englischer Sprache wird AM genutzt. Abhängig von der Telefonsprache?
* Bis vor kurzem kein Senden mit custom sender möglich, sondern immer mit der normalen Google Account E-Mail-Adresse

Vor dem Synchronisieren immer ein Backup anlegen.