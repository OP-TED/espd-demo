Vue.component("model",{
    data: function(){
        return {
            show: true,
            workspace: null
        }
    },

    mounted: function(){


const toolbox = {
    // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
    kind: 'flyoutToolbox',
    // The contents is the blocks and other items that exist in your toolbox.
    contents: [
      {
        kind: 'block',
        type: 'criterion'
      },
      {
        kind: 'block',
        type: 'subcriterion'
      },
      {
        kind: 'block',
        type: 'additional_description_line'
      }
    ]
  };
  
  
  // The toolbox gets passed to the configuration struct during injection.
   this.workspace = Blockly.inject('blocklyDiv', 
    {
      toolbox: toolbox,
      zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true},	
      collapse : true, 
      comments : true,
      maxBlocks : Infinity, 
  });


    },

    template: `
    <b-container fluid class="m-auto">
        <p>ESPD Model viewer</p>

        <div id="blocklyDiv" style="height: 480px; width: 1200px;"></div>
        <div> Show the HTML represenation of the blockly model </div>
    </b-container>
    `
});