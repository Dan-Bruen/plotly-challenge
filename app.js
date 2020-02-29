function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
    var metadataURL = './samples.json';
      // Use d3 to select the panel with id of `#sample-metadata`
      d3.json(metadataURL).then(function(data){
        // this takes the metadata, which is a list of objects
          var metadata = data.metadata;
          // this only takes the objects and matches the ID
          var names = metadata.filter(OTUname => OTUname.id == sample)
          // this takes the singular ID out of the array
          names = names[0]
          // this selects the panel
        var sampleData = d3.select(`#sample-metadata`);
      // Use `.html("") to clear any existing metadata
        sampleData.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      // this writes to the panel we've selected
        Object.entries(names).forEach(function([key,value]) {
          var row = sampleData.append("h5");
          row.text(`${key}:${value}`)
        })
      });
  }
  // Trying my own horizontal bar chart example
  //Use sample_values as the values for the bar chart.
  // Use otu_ids as the labels for the bar chart.
  // Use otu_labels as the hovertext for the chart.
  function buildCharts(sample) {
    // Use 'd3.json' to fetch the sample data for the bar chart plots
    var plotData = './samples.json';
    // Build the bar chart using the sample data
    d3.json(plotData).then(function(data) {
      var x_axis = data.sample_values;
      var y_axis = data.otu_ids;
      var size = data.sample_values;
      var texts = data.otu_labels;
      
      var bar = {
        x: x_axis,
        y: y_axis,
        text: texts,
        orientation: 'h',
        type: 'bar'
      };
    
      var data = [bar];
      var layout = {
      title: "OTU ID Sample Sizes",
      xaxis: {title: "Number of OTU ID Instances"}

    };
    Plotly.newPlot("bar", data, layout);
  });


  function buildCharts(sample) {
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var plotData = './samples.json';
    // @TODO: Build a Bubble Chart using the sample data
    d3.json(plotData).then(function(data){
      var x_axis = data.otu_ids;
      var y_axis = data.sample_values;
      var size = data.sample_values;
      var color = data.otu_ids;
      var texts = data.otu_labels;
    
      var bubble = {
        x: x_axis,
        y: y_axis,
        text: texts,
        mode: `markers`,
        marker: {
          size: size,
          color: color
        }
      };
  
      var data = [bubble];
      var layout = {
        title: "Belly Button Bacteria",
        xaxis: {title: "OTU ID"}
      };
      Plotly.newPlot("bubble", data, layout);
  
      // @TODO: Build a Pie Chart
      d3.json(plotData).then(function(data){
        var values = data.sample_values.slice(0,10);
        var labels = data.otu_ids.slice(0,10);
        var display = data.otu_labels.slice(0,10);
  
        var pie_chart = [{
          values: values,
          lables: labels,
          hovertext: display,
          type: "pie"
        }];
        Plotly.newPlot('pie',pie_chart);
      });
    });
  };
  
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  
  function init() {
    console.log('hello');
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("./samples.json").then((data) => {
      var sampleNames = data.names;

      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  };
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();