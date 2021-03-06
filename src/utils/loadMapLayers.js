const LoadLayers = (map, styles) =>{

  for (let source in styles){
    map.addSource(source, styles[source].sourceDef)
    for (let layer in styles[source].layers){
      let thisLayer = styles[source].layers[layer]
      let layerDef = {
        "id": `${source}-${layer}`,
        "type": thisLayer.type,
        "source": source,
        "paint": thisLayer.paint
      }
      !thisLayer.filter ? null : layerDef['filter'] = thisLayer.filter
      !thisLayer.layout ? null : layerDef['layout'] = thisLayer.layout
      !thisLayer.minzoom ? null : layerDef['minzoom'] = thisLayer.minzoom;
      !thisLayer.visibility ? null : layerDef["layout"] = { visibility: thisLayer.visibility }
      styles[source].sourceDef.type != 'vector' ? null : layerDef['source-layer'] = thisLayer.source
      map.addLayer(layerDef, thisLayer.placement)
    }
  }
}/*
  Author: Robert Beatty
  Purpose: Quickly add symbolized passenger rail lines for the DVRPC to a mapbox gl map with labels
*/

const passengerRail = {
  rail: {
    sourceDef: {
      type: 'geojson',
      data: 'https://arcgis.dvrpc.org/portal/rest/services/Transportation/PassengerRail/FeatureServer/0/query?where=1%3D1&outfields=type&outSR=4326&f=geojson'
    },
    layers: {
      lines: {
        type: 'line',
        paint: {
          "line-color": [
            'match',
            ['get', 'type'],
            'AMTRAK', '#004d6e',
            'NJ Transit', "#f18541",
            'NJ Transit Light Rail', '#ffc424',
            'PATCO', '#ed164b',
            'Rapid Transit', '#9e3e97',
            'Regional Rail', '#487997',
            'Subway', '#f58221',
            'Subway - Elevated', '#067dc1',
            'Surface Trolley',  '#529442',
            '#323232'
          ],
          "line-width":[
            'interpolate', ['linear'], ['zoom'],
            8, 1,
            12, 3
          ]
        },
        layout: { visibility: 'none' },
        placement: "admin-2-boundaries"
      },
      labels: {
        type: 'symbol',
        source: 'transitLines',
        layout: {
          "text-field": "{line_name}",
          "text-font": [
            "Montserrat SemiBold",
              "Open Sans Semibold"
            ],
            "text-size": [
              'interpolate', ['linear'], ['zoom'],
              8, 5,
              12, 12
            ],
            "symbol-placement":  "line",
            "visibility" : 'none'
        },
        paint: {
          "text-color": [
            'match',
            ['get', 'TYPE'],
            'AMTRAK', '#004d6e',
            'NJ Transit', "#f18541",
            'NJ Transit Light Rail', '#ffc424',
            'PATCO', '#ed164b',
            'Rapid Transit', '#9e3e97',
            'Regional Rail', '#487997',
            'Subway', '#f58221',
            'Subway - Elevated', '#067dc1',
            'Surface Trolley',  '#529442',
            '#323232'
          ],
            "text-halo-color": '#ececec',
            "text-halo-width": 4,
            "text-halo-blur": 3
        },
        placement: "admin-2-boundaries"
      }
    }
  }
}

/*
  addRailLayers(map) 
  @desc: Add passenger rail layer/labels to basemap
  @param:
    *!~ map: reference to mapbox gl instance that the layers will be added to
*/

const addRailLayers = map =>{
  for (let source in passengerRail){
    map.addSource(source, passengerRail[source].sourceDef)
    for (let layer in passengerRail[source].layers){
      let thisLayer = passengerRail[source].layers[layer]
      let layerDef = {
        "id": `${source}-${layer}`,
        "type": thisLayer.type,
        "source": source,
        "paint": thisLayer.paint
      }
      !thisLayer.layout ? null : layerDef['layout'] = thisLayer.layout
      !thisLayer.filter ? null : layerDef['filter'] = thisLayer.filter
      map.getLayer('admin-2-boundaries') ? map.addLayer(layerDef, 'admin-2-boundaries') : map.addLayer(layerDef, 'base-muniOutline')
    }

  }
}

export {addRailLayers, LoadLayers}