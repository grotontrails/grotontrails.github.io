// Created by iWeb 3.0 local-build-20091009

function createMediaStream_id2()
{return IWCreateMediaCollection("http://www.grotontrails.org/GTC_Site_10.08.09/Photos/Photos_files/rss.xml",true,6,["No photos yet","%d photo","%d photos"],["","%d clip","%d clips"]);}
function initializeMediaStream_id2()
{createMediaStream_id2().load('http://www.grotontrails.org/GTC_Site_10.08.09/Photos',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget3'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id2',{pageIndex:0}));});}
function layoutMediaGrid_id2(range)
{createMediaStream_id2().load('http://www.grotontrails.org/GTC_Site_10.08.09/Photos',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id2',new IWPhotoGridLayout(3,new IWSize(203,152),new IWSize(203,31),new IWSize(229,198),27,27,0,new IWSize(2,2)),new IWEmptyStroke(),imageStream,range,(null),null,1.000000,null,'../Media/slideshow.html','widget3',null,'widget4',{showTitle:true,showMetric:true})});}
function relayoutMediaGrid_id2(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id2(range);}
function onStubPage()
{var args=window.location.href.toQueryParams();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id2(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('../Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,130),url:'Photos_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Photos_files/stroke_1.png'},{rect:new IWRect(5,-5,150,10),url:'Photos_files/stroke_2.png'},{rect:new IWRect(155,-5,10,10),url:'Photos_files/stroke_3.png'},{rect:new IWRect(155,5,10,130),url:'Photos_files/stroke_4.png'},{rect:new IWRect(155,135,10,10),url:'Photos_files/stroke_5.png'},{rect:new IWRect(5,135,150,10),url:'Photos_files/stroke_6.png'},{rect:new IWRect(-5,135,10,10),url:'Photos_files/stroke_7.png'}],new IWSize(160,140))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','../Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','../Media/Photo-Overlay-Movie.png')
loadMozillaCSS('Photos_files/PhotosMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');NotificationCenter.addObserver(null,relayoutMediaGrid_id2,'RangeChanged','id2')
adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('../Media/transparent.gif');applyEffects()
initializeMediaStream_id2()}
function onPageUnload()
{Widget.onunload();}
