---
title: Storing Videos in iCloud Drive on iOS
date: 2016-03-24T13:56:37+00:00
excerpt: After 1.5 years iCloud Drive works reliably. But because of the intricacies of iOS data storage it's not straight forward to use.
layout: post
permalink: /storing-videos-in-icloud-drive-on-ios
categories:
  - Apple
tags:
  - iCloud
  - iOS
---
iCloud Drive has come a long way. After one and a half years iCloud Drive syncing works reliably and can be used as a cloud drive for iOS and macOS. It might even allow for replacing ordinary computers with iPhones and iPads. But because of the intricacies of iOS data storage it’s not straight forward to use.

## Sandboxes

iOS apps can only access their own data. Therefor all data is stored on the device “within” the apps itself. No other app can access this data. Exceptions are apps like Photos or Contacts which can grant access to their data for another app if the user agrees.

If for example a tutorial video is stored in iCloud Drive, there’s no easy way to view it in another app. It can be downloaded using the iCloud Drive app on iOS to watch it in this same app. But if you do this, it cannot easily be deleted from the iOS device, because deleting the file deletes it in iCloud Drive on all your devices as well.

## Access via Sharing Menu

Another option is to _save_ the video using the share sheet. The video will be saved in Photos, which means that a) it will be uploaded to iCloud Photo Library, which doubles the storage space needed for this video, and b) it is stored among your personal videos and photos, automatically sorted by date. This is quite unfortunate because it’s hard to find (who knows when this tutorial video has been created) and in the wrong spot among your very personal stuff.

The last option is to use the sharing menu to _copy_ it to another app. Then the video will be downloaded and stored within this app in the device. While the video downloads the receiving app can’t be used, because a modal (blocking) download dialog is displayed. Switching apps might stop a large download, because background activity is stopped by iOS after some time.

In my testing downloading seems to fail depending on the app I choose. Infuse for example didn’t show the video in its file view after downloading it. The size of the app increased for the amount of the downloaded video, but it isn’t displayed in the app and therefore not playable. VLC however worked flawlessly.

## Access via iCloud File Picker

VLC also has the ability to access iCloud Drive from within VLC itself. The file picker allows for convenient access to the files in iCloud Drive. Unfortunately it failed to download the file after picking it. Only the sharing menu worked.

## Conclusion

Bottom line is: you can access your videos from iCloud Drive, but it’s not straight forward, has some pitfalls and might fail.

Cloud storage is currently the only way to get rid of an ordinary computer and use touch devices only. Upload the data to the cloud only once from the soon to be replaced computer and download it just in time on the iPhone or iPad.

## Alternatives

Dropbox, Google Drive or Microsoft OneDrive are contenders for iCloud Drive. But iCloud Drive is the natural choice. It’s better integrated with iOS and most likely all iPhone photos are already on there. So you might already be spending some money for iCloud Drive. Spending money for more than one cloud storage service seems to be unreasonable. All cloud storages work about the same. If only iCloud Drive would work as expected all would be fine.