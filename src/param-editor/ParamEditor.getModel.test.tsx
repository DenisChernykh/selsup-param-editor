import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import type { Model, Param } from './types';
import { render, screen } from '@testing-library/react';
import { ParamEditor } from './ParamEditor';

describe('ParamEditor: getModel()', () => {
  it('returns next Model after user edits values', async () => {
    const user = userEvent.setup();
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
      colors: [{ id: 10, name: 'red' }],
    };

    const editroRef = { current: null as ParamEditor | null };

    render(
      <ParamEditor
        ref={(instance) => {
          editroRef.current = instance;
        }}
        params={params}
        model={model}
      />,
    );

    const purposeInput = screen.getByLabelText('Назначение');
    await user.clear(purposeInput);
    await user.type(purposeInput, 'спортивное');

    const nextModel = editroRef.current!.getModel();

    expect(nextModel.colors).toEqual([{ id: 10, name: 'red' }]);

    expect(nextModel.paramValues).toEqual([
      { paramId: 1, value: 'спортивное' },
      { paramId: 2, value: 'макси' },
      { paramId: 3, value: '' },
    ]);
  });
});
