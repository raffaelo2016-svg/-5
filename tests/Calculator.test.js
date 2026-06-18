import { describe, expect, it } from 'vitest';
import { Calculator } from '../src/Calculator.js';

describe('Calculator', () => {
    it('starts with zero on the display', () => {
        const calculator = new Calculator();

        expect(calculator.getDisplayValue()).toBe('0');
    });

    it('appends numbers and replaces the initial zero', () => {
        const calculator = new Calculator();

        calculator.appendNumber('7');
        calculator.appendNumber('5');

        expect(calculator.getDisplayValue()).toBe('75');
    });

    it('starts a new number after calculation result is shown', () => {
        const calculator = new Calculator();

        calculator.appendNumber('2');
        calculator.appendOperator('+');
        calculator.appendNumber('3');
        calculator.calculate();
        calculator.appendNumber('9');

        expect(calculator.getDisplayValue()).toBe('9');
    });

    it('adds a decimal point only once in the current input', () => {
        const calculator = new Calculator();

        calculator.appendNumber('1');
        calculator.appendDecimal();
        calculator.appendDecimal();
        calculator.appendNumber('5');

        expect(calculator.getDisplayValue()).toBe('1.5');
    });

    it('resets the display before adding a decimal after calculation', () => {
        const calculator = new Calculator();

        calculator.appendNumber('2');
        calculator.appendOperator('+');
        calculator.appendNumber('3');
        calculator.calculate();
        calculator.appendDecimal();

        expect(calculator.getDisplayValue()).toBe('0.');
    });

    it('appends an operator to the expression', () => {
        const calculator = new Calculator();

        calculator.appendNumber('8');
        calculator.appendOperator('*');

        expect(calculator.getDisplayValue()).toBe('8*');
    });

    it('replaces the previous operator when operators are entered consecutively', () => {
        const calculator = new Calculator();

        calculator.appendNumber('8');
        calculator.appendOperator('+');
        calculator.appendOperator('-');

        expect(calculator.getDisplayValue()).toBe('8-');
    });

    it('calculates addition, subtraction, multiplication and division', () => {
        const calculator = new Calculator();

        calculator.appendNumber('8');
        calculator.appendOperator('+');
        calculator.appendNumber('4');
        calculator.appendOperator('-');
        calculator.appendNumber('3');
        calculator.appendOperator('*');
        calculator.appendNumber('2');
        calculator.appendOperator('/');
        calculator.appendNumber('3');

        expect(calculator.calculate()).toBe('10');
    });

    it('calculates decimal expressions', () => {
        const calculator = new Calculator();

        calculator.appendNumber('1');
        calculator.appendDecimal();
        calculator.appendNumber('5');
        calculator.appendOperator('+');
        calculator.appendNumber('2');
        calculator.appendDecimal();
        calculator.appendNumber('2');
        calculator.appendNumber('5');

        expect(calculator.calculate()).toBe('3.75');
    });

    it('returns an error for division by zero', () => {
        const calculator = new Calculator();

        calculator.appendNumber('9');
        calculator.appendOperator('/');
        calculator.appendNumber('0');

        expect(calculator.calculate()).toBe('Ошибка');
    });

    it('returns an error for invalid expressions', () => {
        const calculator = new Calculator();

        calculator.appendOperator('+');

        expect(calculator.calculate()).toBe('Ошибка');
    });

    it('clears the display and reset state', () => {
        const calculator = new Calculator();

        calculator.appendNumber('4');
        calculator.appendOperator('+');
        calculator.appendNumber('5');
        calculator.calculate();
        calculator.clearDisplay();

        expect(calculator.getDisplayValue()).toBe('0');
        calculator.appendNumber('7');
        expect(calculator.getDisplayValue()).toBe('7');
    });

    it('deletes the last character', () => {
        const calculator = new Calculator();

        calculator.appendNumber('1');
        calculator.appendNumber('2');
        calculator.deleteLast();

        expect(calculator.getDisplayValue()).toBe('1');
    });

    it('keeps zero when deleting the only character', () => {
        const calculator = new Calculator();

        calculator.deleteLast();

        expect(calculator.getDisplayValue()).toBe('0');
    });

    it('clears the result when deleting after calculation', () => {
        const calculator = new Calculator();

        calculator.appendNumber('6');
        calculator.appendOperator('*');
        calculator.appendNumber('7');
        calculator.calculate();
        calculator.deleteLast();

        expect(calculator.getDisplayValue()).toBe('0');
    });
});
