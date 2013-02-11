(function () {
  "use strict";
  window.GV = window.GV || {};
  window.GV.chart = {
    chartContainer: {},
    dataSource: {},
    labels: [],
    entireUS: [],
    keys: {
      state: 0,
      abbr: 1,
      totalMurders: 2,
      gunKill2011: 3,
      gunKill2010: 4,
      change: 5,
      gunKillPerAll: 6,
      gunKillPerCap: 7,
      gunRobbPerCap: 8,
      gunAssaultPerCap: 9
    },

    initialize: function () {
      $.ajax({
        type: "get",
        success: $.proxy(this, 'buildChart'),
        url: "data/stats.min.json"
      });
    },

    buildChart: function (data) {
      this.dataSource     = data;
      this.chartContainer = d3.select("#graph-container");
      this.labels         = this.dataSource.shift();
      this.entireUS       = this.dataSource.shift();

      this.display('gunAssaultPerCap');
    },

    display: function (key) {

      var position = this.keys[key];
      var values = _.map(this.dataSource, function (data) {
        return data[position];
      });
      var max = _.max(values, function (data) {
        return parseInt(data, 10);
      });

      var barHolders = this.chartContainer.selectAll("div")
        .data(this.dataSource).enter()

        .append("div").attr("class", "bar-container").sort(function (a, b) {
          return b[position] - a[position];
        });

      barHolders.append("div").attr("class", "label")
        .text(function (data, index) {
          return data[0] + " (" + data[position] + ")";
        });

      barHolders.append("div").attr("class", "bar")
        .transition().duration(function (data, index) {
          return Math.abs(((index + 1) * 0.03) * 1000);
        })
        .delay(100)
        .style("width", function (data) {
          // console.log("/////")
          // console.log(max)
          // console.log(data[position])
          // console.log( data[position] / max )
          return (data[position] / max) * 100 + "%";
        });
    }

  };
}());
