//
//  iWeb - WebGallery.js
//  Copyright (c) 2008 Apple Inc. All rights reserved.
//

var WebGalleryWidget=Class.create(PrefMarkupWidget,{widgetIdentifier:"com-apple-iweb-widget-DotMacAlbumOrMovie",noAlbumSelectedGalleryURL:"",noMobileMeAccountGalleryURL:"no_mobileme_account",upgradeGalleryURL:"upgrade",initialize:function($super,instanceID,widgetPath,sharedPath,sitePath,preferences,runningInApp)
{if(instanceID)
{$super(instanceID,widgetPath,sharedPath,sitePath,preferences,runningInApp);}
this.m_initializingDefaultPreferences=true;this.initializeDefaultPreferences({galleryURL:this.upgradeGalleryURL});this.m_initializingDefaultPreferences=undefined;if(runningInApp)
{window.onresize=this.resize.bind(this);}
var parentDiv=this.div('webGallery');this.m_views={};this.m_views["web-gallery-snippet"]=new WebGallerySnippetView(this,parentDiv);if(runningInApp)
{this.m_views["no-album-selected-status"]=new WebGalleryNoAlbumStatus(this,parentDiv);this.m_views["no-mobileme-account-status"]=new WebGalleryNoMobileMeAccountStatus(this,parentDiv);this.m_views["user-offline-status"]=new WebGalleryUserOfflineStatus(this,parentDiv);}
else
{this.m_views["no-album-selected-status"]=new WebGalleryPublishedErrorStatus(this,parentDiv);this.m_views["no-mobileme-account-status"]=this.m_views["no-album-selected-status"];this.m_views["user-offline-status"]=this.m_views["no-album-selected-status"];}
var iframe_src=eval(instanceID+'_htmlMarkupURL');this.m_iframe='<iframe id="'+instanceID+'-frame" '+'src="'+iframe_src+'" '+'frameborder="0" style="width: 100%; height: 100%;" '+'scrolling="no" marginheight="0" marginwidth="0" allowTransparency="true"></frame>';this.updateFromPreferences();},updateFromPreferences:function()
{var galleryURL=this.preferenceForKey('galleryURL');if(this.preferenceForKey("x-online")===false)
{this.showView("user-offline-status");}
else if(galleryURL==this.noAlbumSelectedGalleryURL)
{this.showView("no-album-selected-status");}
else if(galleryURL==this.noMobileMeAccountGalleryURL)
{this.showView("no-mobileme-account-status");}
else
{this.showView("web-gallery-snippet");}},changedPreferenceForKey:function(key)
{if(key=="galleryURL")
{if(this.preferenceForKey(key)==this.noAlbumSelectedGalleryURL)
{this.showView("no-album-selected-status");}
else if(this.preferenceForKey(key)==this.noMobileMeAccountGalleryURL)
{this.showView("no-mobileme-account-status");}
else
{if(this.m_currentView==this.m_views["web-gallery-snippet"])
{this.m_views["web-gallery-snippet"].render();}
this.showView("web-gallery-snippet");}}},resize:function()
{$H(this.m_views).each(function(pair){pair.value.resize();});}});var WebGallerySnippetView=Class.create(View,{m_divId:"web-gallery-snippet",m_divClass:"WebGallerySnippetView",render:function()
{var galleryURL=this.m_widget.preferenceForKey("galleryURL");if((galleryURL!=this.m_widget.noAlbumSelectedGalleryURL)&&(galleryURL!=this.m_widget.noMobileMeAccountGalleryURL))
{this.ensureDiv().update(this.m_widget.m_iframe);}
else
{this.ensureDiv().update("");}
if(this.m_widget.runningInApp)
{this.m_widget.preferences.postNotification("BLWidgetIsSafeToDrawNotification",0);}}});var WebGalleryNoMobileMeAccountStatus=Class.create(StatusView,{m_divId:"no-mobileme-account-status",m_divClass:"WebGalleryStatusView",statusMessageKey:"<b>You must be logged in to a MobileMe account to add a MobileMe Gallery to your page.</b>",statusMessageVerticallyCentered:true,upperRightBadge:"error-glyph.png",upperRightBadgeWidth:24,upperRightBadgeHeight:19});var WebGalleryNoAlbumStatus=Class.create(StatusView,{m_divId:"no-album-selected-status",m_divClass:"WebGalleryStatusView",statusMessageKey:"<b>Upload an album or movie to MobileMe and then select it from this widget&#8217;s menu.</b>",statusMessageVerticallyCentered:true,upperRightBadge:"error-glyph.png",upperRightBadgeWidth:24,upperRightBadgeHeight:19});var WebGalleryUserOfflineStatus=Class.create(StatusView,{m_divId:"user-offline-status",m_divClass:"WebGalleryStatusView",statusMessageKey:"<b>You must be connected to the Internet to view your MobileMe album or movie.</b>",statusMessageVerticallyCentered:true,upperRightBadge:"error-glyph.png",upperRightBadgeWidth:24,upperRightBadgeHeight:19});var WebGalleryPublishedErrorStatus=Class.create(StatusView,{m_divId:"published-error-status",m_divClass:"WebGalleryStatusView",badgeImage:"MobileMe-Gallery-Placeholder_disabled.png",badgeImageWidth:145,badgeImageHeight:94});