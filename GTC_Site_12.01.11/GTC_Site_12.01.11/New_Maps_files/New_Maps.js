// Created by iWeb 3.0.4 local-build-20111203

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,300),url:'New_Maps_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'New_Maps_files/stroke_1.png'},{rect:new IWRect(5,-5,620,10),url:'New_Maps_files/stroke_2.png'},{rect:new IWRect(625,-5,11,10),url:'New_Maps_files/stroke_3.png'},{rect:new IWRect(625,5,11,300),url:'New_Maps_files/stroke_4.png'},{rect:new IWRect(625,305,11,11),url:'New_Maps_files/stroke_5.png'},{rect:new IWRect(5,305,620,11),url:'New_Maps_files/stroke_6.png'},{rect:new IWRect(-5,305,10,11),url:'New_Maps_files/stroke_7.png'}],new IWSize(630,310))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('New_Maps_files/New_MapsMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();applyEffects()}
function onPageUnload()
{Widget.onunload();}
