
const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json('./assets/resources/samples.json').then(({metadata,samples})=>{
        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];


    console.log(sample)
    })
};

d3.json('./assets/Resources/samples.json').then(({names}) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });

    optionChanged()
})