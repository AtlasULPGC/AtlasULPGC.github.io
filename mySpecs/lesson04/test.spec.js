/* globals describe, it, expect, beforeEach*/

import {setRenderer} from '../../lessons/04/renderer'

describe('Configuration', () => {
    it('should true be true', () => {
        expect(true).toBe(true);
    });
});
describe('Renderer', () => {
    it('should be created', () => {
        var newDiv = document.createElement("div");
        newDiv.id = 'container';
        document.body.appendChild(newDiv);

        setRenderer();

        expect(document.getElementById('container')).toBe(newDiv);
    });
});