// Created by iWeb 3.0 local-build-20091009

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,251),url:'Videos_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Videos_files/stroke_1.png'},{rect:new IWRect(5,-5,303,10),url:'Videos_files/stroke_2.png'},{rect:new IWRect(308,-5,10,10),url:'Videos_files/stroke_3.png'},{rect:new IWRect(308,5,10,251),url:'Videos_files/stroke_4.png'},{rect:new IWRect(308,256,10,11),url:'Videos_files/stroke_5.png'},{rect:new IWRect(5,256,303,11),url:'Videos_files/stroke_6.png'},{rect:new IWRect(-5,256,10,11),url:'Videos_files/stroke_7.png'}],new IWSize(313,261))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Videos_files/VideosMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
