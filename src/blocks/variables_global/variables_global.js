'use strict';
/* global Blockly,  RoboBlocks */
/* jshint sub:true */
/**
 * variables_global code generation
 * @return {String} Code generated with block parameters
 */
Blockly.Arduino.variables_global = function() {
    // Variable setter.
    var varType;
    var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
    var varName = this.getFieldValue('VAR') || '';
    if (varValue.search('"') >= 0) {
        varType = 'String';
        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';';
        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';';
    } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue)) || (varValue.search('random') >= 0)) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
        varType = 'int';
        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';';
        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';';
    } else if (varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
        for (var i in Blockly.Arduino.definitions_) {
            if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int') {
                    if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *') {
                        varType = 'int *';
                    } else {
                        varType = 'int';
                    }
                } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                    varType = 'String';
                } else {
                    varType = '';
                }
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';';
            }
        }
    } else if (this.isVariable(varValue)) {
        varType = RoboBlocks.variables[varValue];
        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';';
    } else if (varValue[0] === '{') {
        varType = 'int *';
        varValue = varValue.replace('{', '');
        varValue = varValue.replace('}', '');
        varValue = varValue.split(',');
        Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + ';\n';
        Blockly.Arduino.setups_['define_var' + varName] = varName + '[0]=' + varValue[0] + ';\n  ' + varName + '[1]=' + varValue[1] + ';\n  ' + varName + '[2]=' + varValue[2] + ';';
    } else if (varValue.search('readJoystick') >= 0) {
        varType = 'int *';
        Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + ';\n';
        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
    } else {
        varType = 'unknown';
        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';';
        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';';
    }
    RoboBlocks.variables[varName] = varType;
    return '';
};
Blockly.Blocks.variables_global = {
    // Variable setter.
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
    helpUrl: RoboBlocks.GITHUB_SRC_URL + 'blocks/variables_global',
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
        this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
    },
    getVars: function() {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    isVariable: function(varValue) {
        for (var i in Blockly.Variables.allVariables()) {
            if (Blockly.Variables.allVariables()[i] === varValue) {
                return true;
            }
        }
        return false;
    },
    validName: function(name) {
        if (name && name.length > 0) {
            var i = 0;
            while (i < name.length) {
                if (!isNaN(parseFloat(name[i]))) {
                    name = name.substring(1, name.length);
                } else {
                    break;
                }
            }
            name = name.replace(/([ ])/g, '_');
            name = name.replace(/([áàâä])/g, 'a');
            name = name.replace(/([éèêë])/g, 'e');
            name = name.replace(/([íìîï])/g, 'i');
            name = name.replace(/([óòôö])/g, 'o');
            name = name.replace(/([úùûü])/g, 'u');
            name = name.replace(/([ñ])/g, 'n');
            name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
            i = 0;
            while (i < name.length) {
                if (!isNaN(parseFloat(name[i]))) {
                    name = name.substring(1, name.length);
                } else {
                    break;
                }
            }
            for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                if (name === reserved_words[j]) {
                    this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                    name = '';
                    break;
                } else {
                    this.setWarningText(null);
                }
            }
        }
        return name;
    },
    onchange: function() {
        if (this.last_variable !== this.getFieldValue('VAR')) {
            var name = this.getFieldValue('VAR');
            name = this.validName(name);
            try {
                this.setFieldValue(name, 'VAR');
            } catch (e) {}
            this.last_variable = name;
        }
    }
};