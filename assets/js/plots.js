
const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json('./assets/resources/samples.json').then(({metadata,samples})=>{
        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];
        let panel = d3.select('.panel-body');

        // DEMOGRAPHIC PANEL
        panel.html('');

        Object.entries(meta).forEach(([key,val]) => {
            panel.append('h4').text(key+': '+val)
        });

        // BAR CHART
        let {otu_ids, sample_values, otu_labels } = sample;

        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation: 'h',
              title: 'Test test 1 2 3'
            }
          ];
          
          Plotly.newPlot('bar', data, {title: '<b>Top 10 Bacteria Cultures Found</b>'});

        //   Bubble Chart
          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text:otu_labels,
            marker: {
              size: sample_values,
              color:otu_ids,
              colorscale:"Earth"
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: '<b>Bacteria Culltures Per Sample</b>',
            showlegend: false
          };
          
          Plotly.newPlot('bubble', data,layout);
         
        //   Gauge Chart
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 10] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);
        
    console.log(meta)
    })
};

d3.json('./assets/Resources/samples.json').then(({names}) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });

    optionChanged()
})