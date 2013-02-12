(function () {
  "use strict";
  window.GV = window.GV || {};
  window.GV.chart = {
    currentKey: "",
    chartContainer: {},
    textLabels: {},
    barHolders: {},
    bars: {},
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
        success: $.proxy(this, 'build'),
        url: "data/stats.min.json"
      });
    },

    build: function (data) {
      this.dataSource     = data;
      this.chartContainer = d3.select("#graph-container");
      this.labels         = this.dataSource.shift();
      this.entireUS       = this.dataSource.shift();

      this.buildButtons();
      this.buildChart();
      this.display('gunAssaultPerCap');
    },

    buildButtons: function () {
      _.each(_.keys(this.keys), _.bind(function (key) {
        $('#right-col').append("<button class=\"switcher\" data-key=\"" + key + "\">" + this.labels[this.keys[key]] + "</button>");
      }, this));

      $('#right-col button').click(function () {
        window.GV.chart.display($(this).data('key'));
      });
    },

    buildChart: function () {
      this.barHolders = this.chartContainer.selectAll("div")
        .data(this.dataSource).enter()
        .append("div").attr("class", "bar-container");


      this.barHolders.append("div").attr("class", "label")
        .text(function (data, index) {
          return data[0];
        });

      this.barHolders.append("svg").append("rect")
        .attr("class", "bar").attr("height", "30")
        .attr("fill", "#9e000c");

      this.bars       = this.chartContainer.selectAll(".bar");
      this.textLabels = this.chartContainer.selectAll('.label');
    },

    display: function (key) {

      this.currentKey = key;

      var position = this.keys[key];
      var values = _.map(this.dataSource, function (data) {
        return data[position];
      });
      var max = _.max(values, function (data) {
        return parseInt(data, 10);
      });

      // this.barHolders.sort(function (a, b) {
      //   return b[position] - a[position];
      // });

      this.textLabels.text(function (data, index) {
        return data[0] + " (" + data[position] + ")";
      });

      this.bars
        .transition().duration(1000)
        .delay(function (data, index) {
          return Math.abs(((index + 1) * 0.03));
        })
        .attr("width", function (data) {
          return (data[position] / max) * 100 + "%";
        })
        .attr("opacity", function (data) {
          return (data[position] / max) + 0.09;
        });
    }

  };
}());
