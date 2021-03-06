'use strict';
/* global Blockly, options, JST, RoboBlocks */
/* jshint sub:true */

/**
 * bq_bat code generation
 * @return {String} Code generated with block parameters
 */
Blockly.Arduino.bq_bat = function() {
    var red_pin = Blockly.Arduino.valueToCode(this, 'RED PIN', Blockly.Arduino.ORDER_ATOMIC);
    var blue_pin = Blockly.Arduino.valueToCode(this, 'BLUE PIN',Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.setups_['setup_bq_bat_']=JST['bq_bat_setups']({
        'red_pin': red_pin,
        'blue_pin': blue_pin
    });

    Blockly.Arduino.definitions_['define_bq_bat_' + red_pin] = JST['bq_bat_definitions']({
        'red_pin': red_pin,
        'blue_pin': blue_pin
    });

    var code = JST['bq_bat']({
        'red_pin': red_pin
    });

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * bq_bat block definition
 * @type {Object}
 */
Blockly.Blocks.bq_bat = {
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_ZUM'),
    tags: ['bq', 'bat'],
    helpUrl: RoboBlocks.GITHUB_SRC_URL+'blocks/bq_bat',
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_ZUM);
        this.appendDummyInput('')
        .appendField(RoboBlocks.locales.getKey('LANG_BQ_BAT'))
        .appendField(new Blockly.FieldImage('img/blocks/bqmod09.png', 208 * options.zoom, 140 * options.zoom));
        this.appendValueInput('RED PIN')
            .appendField(RoboBlocks.locales.getKey('LANG_BQ_BAT_RED_PIN'))
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendValueInput('BLUE PIN')
            .appendField(RoboBlocks.locales.getKey('LANG_BQ_BAT_BLUE_PIN'))
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT);


        this.setInputsInline(false);
        this.setOutput(true, Number);
        this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BAT_TOOLTIP'));
    }
};
