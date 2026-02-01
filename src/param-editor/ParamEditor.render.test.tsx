import { describe, expect, it } from 'vitest';
import { ParamEditor, type Model, type Param } from './ParamEditor';
import { render, screen } from '@testing-library/react';

describe('ParamEditor: render', () => {
  it('renders inputs for all params', () => {
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

    expect(screen.getByLabelText('Назначение')).toBeInTheDocument();
    expect(screen.getByLabelText('Длина')).toBeInTheDocument();
    expect(screen.getByLabelText('Цвет')).toBeInTheDocument();
  });
});
