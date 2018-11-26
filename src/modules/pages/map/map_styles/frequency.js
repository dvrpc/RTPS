const styles = {
  base: {
    sourceDef: {
      type: 'vector',
      url: 'https://tiles.dvrpc.org/data/dvrpc-freight-story.json'
    },
    layers: {
      countyLabels : {
        source: 'dvrpc-places',
        type: 'symbol',
        layout: {
          "text-field": "{NAME}",
          "text-font": [
            "Montserrat SemiBold",
              "Open Sans Semibold"
            ],
            "text-size": [
              'interpolate', ['linear'], ['zoom'],
              8, 10,
              12, 20
            ]
        },
        paint: {
            "text-color": "#a6a6a6",
              "text-halo-color": '#ececec',
              "text-halo-width": 4,
              "text-halo-blur": 3
        }
      },
      muniLabels : {
        source: 'municipalities',
        type: 'symbol',
        layout: {
          "text-field": "{MUN_LABEL}",
          "text-font": [
            "Montserrat SemiBold",
              "Open Sans Semibold"
            ],
            "text-size": [
              'interpolate', ['linear'], ['zoom'],
              9.25, 4,
              12, 12
            ],
            "text-anchor": "bottom-left"
        },
        minzoom: 9,
        paint: {
            "text-color": "#a6a6a6",
              "text-halo-color": '#ececec',
              "text-halo-width": 4,
              "text-halo-blur": 3,
        }
      },
      hwyLabels:{
        type: 'symbol',
        source: 'interstates',
        layout: {
          "text-field": "{route}",
          "text-font": [
            "Montserrat SemiBold",
              "Open Sans Semibold"
            ],
            "text-size": [
              'interpolate', ['linear'], ['zoom'],
              9.25, 8,
              12, 18
            ],
            "text-anchor": "center",
            "symbol-placement" : 'line'
        },
        paint: {
            "text-color": "#a6a6a6",
              "text-halo-color": '#ececec',
              "text-halo-width": 4,
              "text-halo-blur": 3,
        }
      },
      interstates: {
        type: 'line',
        paint: {
          'line-width': [
            'interpolate', ['linear'], ['zoom'],
            8, 1.25,
            12, 3.75
          ],
          'line-color': '#fff',
        },
        source: 'interstates',
        placement: 'base-countyLabels'
      },
      countyOutline: {
        source: 'county',
        type: 'line',
        filter: [
          '==',
          'DVRPC_REG',
          'Yes'
        ],
        paint: {
          "line-color" : "#646464",
          "line-width": 1,
          'line-dasharray': [2, 4]
        },
        placement: 'base-interstates'
      },
      muniOutline: {
        source: 'municipalities',
        type: 'line',
        paint: {
          "line-color" : '#c9c9c9',
          "line-width": [
            'interpolate', ['linear'], ['zoom'],
            8, .25,
            12, .75
          ],
          "line-opacity": [
            'interpolate', ['linear'], ['zoom'],
            8, .25,
            12, 1
          ]
        },
        placement: 'base-countyOutline'
      },
      countyFill: {
        source: 'county',
        type: 'fill',
        filter: [
          '==',
          'DVRPC_REG',
          'Yes'
        ],
        paint: {
          "fill-color": '#ececec'
        },
        placement: 'base-muniOutline'
      },
    }
  }
}

export { styles }