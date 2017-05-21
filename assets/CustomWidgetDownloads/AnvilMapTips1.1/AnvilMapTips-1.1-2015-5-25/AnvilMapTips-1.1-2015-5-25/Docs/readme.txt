This widget is a sample of how to create a "headless" widget for the Wed AppBuilder (WAB).  By "headless," I mean it is invisible and it is loaded at startup.  This sample adds map tips on feature layers.

There is no live sample for this widget, as it is invisible.

I called it AnvilMapTips because the original "headless" widget I wrote is called Acme, and I wanted to stay with the Roadrunner theme.

This widget is configured for two layers, "Parcels" and "Address Points (E911)".  You will need to modify the config.json to use feature layers from your map.  Use layer titles (not ids or names) and the field names (not the aliases) for that layer.

If you want to drop this widget into the WAB and configure it in an app, you will need to copy its folder into the client\stemapp\widgets folder and then add it to the client\stemapp\predefined-apps\default\config.json file.

If you want to add this widget to an app you have already built with the WAB, then add it to the main config.json file like this:


"widgetOnScreen": {
  "widgets": [
  {
    "uri": "widgets/AnvilMapTips/Widget",
    "position": {
      "left": -1000,
      "bottom": -1000
    },
    "version": "1.1",
    "id": "widgets/AnvilMapTips/Widget_101",
    "positionRelativeTo": "map",
    "name": "AnvilMapTips",
    "label": "Anvil Map Tips"
    },
    . . .
    . . .
  ],
  "panel": {
    "uri": "jimu/PreloadWidgetIconPanel",
    "positionRelativeTo": "map"
  }
},
. . .
. . .

