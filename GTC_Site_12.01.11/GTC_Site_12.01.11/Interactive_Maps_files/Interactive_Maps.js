// Created by iWeb 3.0.4 local-build-20120109

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,321),url:'Interactive_Maps_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Interactive_Maps_files/stroke_1.png'},{rect:new IWRect(5,-5,620,10),url:'Interactive_Maps_files/stroke_2.png'},{rect:new IWRect(625,-5,11,10),url:'Interactive_Maps_files/stroke_3.png'},{rect:new IWRect(625,5,11,321),url:'Interactive_Maps_files/stroke_4.png'},{rect:new IWRect(625,326,11,11),url:'Interactive_Maps_files/stroke_5.png'},{rect:new IWRect(5,326,620,11),url:'Interactive_Maps_files/stroke_6.png'},{rect:new IWRect(-5,326,10,11),url:'Interactive_Maps_files/stroke_7.png'}],new IWSize(630,332))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Interactive_Maps_files/Interactive_MapsMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
