(function () {
  "use strict";
  window.GV = window.GV || {};
  window.GV.chart = {
    variable: "",

    initialize: function () {
      $.ajax({
        type: "get",
        success: $.proxy(this, 'buildChart'),
        url: "data/stats.min.json"
      });
    },

    buildChart: function (data) {
      console.log(data);
    }

  };
}());
