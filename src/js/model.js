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
        type: 'controls_if'
      },
      {
        kind: 'block',
        type: 'controls_whileUntil'
      },
      {
        kind:'block',
        type: 'my_custom_block'
      }
      // You can add more blocks to this array.
    ]
  };
  
  
  // The toolbox gets passed to the configuration struct during injection.
   this.workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});


    },

    template: `
    <b-container fluid class="m-auto">
        <p>ESPD Model viewer</p>

        <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
    </b-container>
    `
});