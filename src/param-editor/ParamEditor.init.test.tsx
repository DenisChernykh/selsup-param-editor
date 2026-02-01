import { describe, expect, it } from 'vitest';
import type { Model, Param } from './types';
import { ParamEditor } from './ParamEditor';
import { render, screen } from '@testing-library/react';

describe('ParamEditor: initialization', () => {
  it('initializes inputs from model.paramValues', () => {
    const params: Param[] = [
      { id: 1, name: 'Назначение', type: 'string' },
      { id: 2, name: 'Длина', type: 'string' },
      { id: 3, name: 'Цвет', type: 'string' },
    ];
    const model: Model = {
      paramValues: [
        { paramId: 1, value: 'повседневное' },
        { paramId: 2, value: 'макси' },
      ],
      colors: [],
    };
    render(<ParamEditor params={params} model={model} />);

    expect(screen.getByLabelText('Назначение')).toHaveValue('повседневное');
    expect(screen.getByLabelText('Длина')).toHaveValue('макси');
    expect(screen.getByLabelText('Цвет')).toHaveValue('');
  });
});
