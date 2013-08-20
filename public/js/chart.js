(function () {
  "use strict";
  window.GV = window.GV || {};
  window.GV.chart = {
    currentKey: "",
    chartContainer: {},
    usMap: {},
    textLabels: {},
    barHolders: {},
    bars: {},
    dataSource: {},
    labels: [],
    entireUS: [],

    redColor: "#9e000c",

    keys: {
      state: 0,
      abbr: 1,
      totalMurders: 2,
      gunKill2011: 3,
      gunKill2010: 4,
      // change: 5,
      // gunKillPerAll: 6,
      gunKillPerCap: 7,
      gunRobbPerCap: 8,
      gunAssaultPerCap: 9
    },

    initialize: function () {
      $.ajax({
        type: "get",
        success: $.proxy(this, 'build'),
        url: "data/stats.json"
      });
    },

    build: function (data) {
      this.dataSource     = data;
      this.chartContainer = d3.select("#graph-container");
      this.labels         = this.dataSource.shift();
      this.entireUS       = this.dataSource.shift();

      this.buildButtons();
      this.buildChart();
      this.buildMap();
      this.display('gunAssaultPerCap');
    },

    buildMap: function () {
      this.usMap = d3.select("#us-map");
    },

    buildButtons: function () {
      _.each(_.keys(_.omit(this.keys, ["state", "abbr"])), _.bind(function (key) {
        $('#buttons-container').append("<button class=\"switcher\" data-key=\"" + key + "\">" + this.labels[this.keys[key]] + "</button>");
      }, this));

      $('#buttons-container button').click(function () {
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
        .attr("fill", this.redColor)
        .attr("width", 0);

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

      _.each(this.dataSource, function (item) {
        var state = item[this.keys.abbr];
        if (state) {
          var svg = d3.select('#' + state);
          state = state.toUpperCase();

          svg
          .transition()
          .duration(1000)
          .delay(Math.random() + 0.5)
          .attr('fill', this.redColor)
          .attr("opacity", function (data) {
            return (item[position] / max) + 0.3;
          });
        }
      }, this);

      this.textLabels.text(function (data, index) {
        return data[0] + " (" + data[position] + ")";
      });

      this.bars
        .transition().duration(1000)
        .delay(function (data, index) {
          return Math.abs(((index + 1) * 0.07));
        })
        .attr("width", function (data) {
          return (data[position] / max) * 100 + "%";
        })
        .attr("opacity", function (data) {
          return (data[position] / max) + 0.3;
        });
    }

  };
}());
