var pdb = PouchDB('espd_demo')

  // Create the definition.
  const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([
    {
      // The type is like the "class name" for your block. It is used to construct
      // new instances. E.g. in the toolbox.
      type: 'my_custom_block',
      // The message defines the basic text of your block, and where inputs or
      // fields will be inserted.
      message0: 'move forward %1',
      args0: [
        // Each arg is associated with a %# in the message.
        // This one gets substituted for %1.
        {
          // The type specifies the kind of input or field to be inserted.
          type: 'field_number',
          // The name allows you to reference the field and get its value.
          name: 'FIELD_NAME',
        }
      ],
      // Adds an untyped previous connection to the top of the block.
      previousStatement: null,
      // Adds an untyped next connection to the bottom of the block.
      nextStatement: null,
    }
  ]);
  
  // Register the definition.
  Blockly.common.defineBlocks(definitions);

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
  const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});

