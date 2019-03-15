anychart.onDocumentLoad(function() {
    var rawData = [
      ["A", 5, 4, 2, 6, 3, "Bad"],
      ["B", 7, 2, 1, 9, 5, "Good"],
      ["C", 8, 3, 2, 9, 4, "Normal"],
      ["D", 1, 4, 1, 4, 3, "Bad"]
    ];
  
    dataSet = anychart.data.set(rawData);
  
    var view1 = dataSet.mapAs({ x: 0, value: 1 });
    var view2 = dataSet.mapAs({ x: 0, value: 2 });
    var view3 = dataSet.mapAs({ x: 0, value: 3 });
    var view4 = dataSet.mapAs({ x: 0, value: 4 });
    var view5 = dataSet.mapAs({ x: 0, value: 5 });
  
    // create chart
    var chart1 = anychart.line();
    // create several line series
    chart1.line(view1).name("EUR");
    chart1.line(view2).name("USD");
    chart1.line(view3).name("YEN");
    chart1.line(view4).name("CNY");
  
    // create column chart
    // based on filtered view
    // that accepts values of less than 5 only
    var chart2 = anychart.column(
      view5.filter("value", function(v) {
        return v < 5;
      })
    );
  
    // set title and draw multi-line chart
    chart1.title("Line: Streaming from Data Set");
    chart1.legend(true);
    chart1.container("lineContainer").draw();
  
    // set title and draw column chart
    chart2.title("Column: Filtering Stream");
    chart2.container("columnContainer").draw();
  });
  
  // streaming function
  var streamId;
  function stream() {
    if (streamId === undefined) {
      streamId = setInterval(function() {
        addValue();
      }, 1000);
    } else {
      clearInterval(streamId);
      streamId = undefined;
    }
  }
  
  // function to add new value and remove first one
  function addValue() {
    // generate next letter/symbol as argument
    var x = String.fromCharCode(
      dataSet.row(dataSet.getRowsCount() - 1)[0].charCodeAt(0) + 1
    );
    // append row of random values to data set
    dataSet.append([
      x,
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10
    ]);
    // remove first row
    dataSet.remove(0);
  }