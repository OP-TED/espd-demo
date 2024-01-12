// Create the definition.
const definitions = Blockly.common.createBlockDefinitionsFromJsonArray(

  [{
    "type": "criterion",
    "message0": "CRITERION %1 TAG %2 ID_PATH %3 %4 UUID %5 %6 Code %7 %8 Name %9 %10 Description %11 %12 Components %13",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "TAG",
        "text": ""
      },
      {
        "type": "field_input",
        "name": "ID_PATH",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "UUID",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Code",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Name",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Description",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "criterion_components",
        "check": [
          "subcriterion",
          "additional_description_line",
          "legislation",
          "question_group",
          "requirement_group"
        ]
      }
    ],
    "inputsInline": false,
    "colour": 210,
    "tooltip": "Top level element corresponding to Criterion",
    "helpUrl": ""
  },
  {
    "type": "subcriterion",
    "message0": "SUBCRITERION %1 TAG %2 ID_PATH %3 %4 Name %5 %6 Description %7 %8 Cardinality %9 %10 UUID %11 %12 Code %13 %14 Comment %15 %16 Components %17",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "TAG",
        "text": ""
      },
      {
        "type": "field_input",
        "name": "ID_PATH",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Name",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Description",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Cardinality",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "UUID",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Code",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Comment",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "Components",
        "check": "question_group"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "additional_description_line",
    "message0": "ADDITIONAL DESCRIPTION LINE %1 TAG %2 ID_PATH %3 %4 Description %5 %6 Comment %7",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "TAG",
        "text": ""
      },
      {
        "type": "field_input",
        "name": "ID_PATH",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Description",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_input",
        "name": "Comment",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "",
    "helpUrl": ""
  }]

  );
  
  // Register the definition.
  Blockly.common.defineBlocks(definitions);